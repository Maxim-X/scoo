import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {
    get_stock,
    add_inventory,
    get_all_images_inventory,
    upload_images_inventory,
    get_inventory, get_rental_points, get_rental_category, get_rental_status, edit_inventory, del_images_inventory
} from "../http/stockAPI";
import {Alert, Card, Col, Container, Form, Row} from "react-bootstrap";
import RedButton from "../components/UI/RedButton/RedButton";
import MainButton from "../components/UI/MainButton/MainButton";
import MiniRedButton from "../components/UI/MiniRedButton/MiniRedButton";
import {RiDeleteBack2Fill} from "react-icons/ri";
import DropZona from "../components/UI/DropZona/DropZona";
import {upload_images_client} from "../http/companyAPI";

const StockEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const back = () =>{navigate(`/stock`);}

    const {user} = useContext(Context);

    const [name, setName] = useState("");
    const [vendorCode, setVendorCode] = useState("");
    const [inventoryNumber, setInventoryNumber] = useState("");
    const [rentalPointId, setRentalPointId] = useState("");
    const [rentalCategoryId, setRentalCategoryId] = useState("");
    const [rentalStatusId, setRentalStatusId] = useState("");
    const [note, setNote] = useState("");
    const [inspectionDate, setInspectionDate] = useState("");
    const [oilChangeDate, setOilChangeDate] = useState("");

    const [saveUploadImages, setSaveUploadImages] = useState([]);

    const [listPoints, setListPoints] = useState([]);
    const [listCategories, setListCategories] = useState([]);
    const [listStatuses, setListStatuses] = useState([]);

    const [successAdd, setSuccessAdd] = useState("");
    const [failAdd, setFailAdd] = useState("");

    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        update_files_info();
    }, []);

    const  update_files_info = () =>{
        get_all_images_inventory(id).then(images => setAllFiles(images));
    }

    const reset_alert = () => {
        setSuccessAdd("");
        setFailAdd("");
    }

    React.useMemo(async() => {
        get_rental_points().then(points => setListPoints(points));
        get_rental_category().then(category => setListCategories(category));
        get_rental_status().then(statuses => setListStatuses(statuses));

        reset_alert();
        if (id == undefined){
            setName("");
            setVendorCode("");
            setInventoryNumber("");
            setRentalPointId("");
            setRentalCategoryId("");
            setRentalStatusId("");
            setNote("");
            setInspectionDate("");
            setOilChangeDate("");
        }else {
            try {
                if (!parseInt(id)){ window.location.replace("/stock"); }

                let stock = await get_inventory(id);
                setName(stock.name == null ? "" : stock.name);
                setVendorCode(stock.vendor_code == null ? "" : stock.vendor_code);
                setInventoryNumber(stock.inventory_number == null ? "" : stock.inventory_number);
                setRentalPointId(stock.rentalPointId == null ? "" : stock.rentalPointId);
                setRentalCategoryId(stock.rentalCategoryId == null ? "" : stock.rentalCategoryId);
                setRentalStatusId(stock.rentalStatusId == null ? "" : stock.rentalStatusId);
                setNote(stock.note == null ? "" : stock.note);
                setInspectionDate(stock.inspection_date == null ? "" : stock.inspection_date);
                setOilChangeDate(stock.oil_change == null ? "" : stock.oil_change);
            } catch (e) {
                window.location.replace("/stock");
            }
        }
    },[id]);

    const add_stock = async (a) =>{
        reset_alert();
        try {
            const inventory ={
                name,
                vendor_code: vendorCode,
                inventory_number: inventoryNumber,
                rentalPointId,
                rentalCategoryId,
                rentalStatusId,
                note,
                inspectionDate,
                oilChangeDate
            };
            let data;
            if (id){
                data = await edit_inventory(inventory, id);
            }else {
                data = await add_inventory(inventory);
                if (data != undefined && saveUploadImages.length != 0){
                    for (let i = 0; i < saveUploadImages.length; i++){
                        try {
                            const upload = uploadImageStock(saveUploadImages[i], data.inventory_id);
                        }catch (e){}
                    }
                }
            }
            setSuccessAdd(data.message);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const uploadImageStock = (files, id_stock) =>{
        for (let i = 0; i < files.length; i++) {
            const FormData1 = new FormData();
            FormData1.append('images', files[0]);
            FormData1.append('id_stock', id_stock);
            const upload = upload_images_inventory(FormData1);
            if (upload) {
                update_files_info();
            }
        }
        return true;
    }

    const deleteImageStock = async (image_name) =>{
        const del = await del_images_inventory(image_name);
        if (del){
            update_files_info();
        }
        return del;
    }
    return (
        <Container fluid className="mainContainer">
            <Row>
                <Col>
                    <h1 className="mainTitle mb-3">{id ? 'Edit inventory':'Add inventory'}</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <RedButton style={{"marginRight": "15px"}} variant="primary" onClick={back}>
                        Back
                    </RedButton>
                    <MainButton variant="primary" onClick={add_stock}>
                        {id ? 'Edit inventory':'Add inventory'}
                    </MainButton>
                </Col>
            </Row>
            <Row>
                <Col>
                    {successAdd && <Alert variant="primary">{successAdd}</Alert>}
                    {failAdd && <Alert variant="danger">{failAdd}</Alert>}
                    <Card className="card p-4 mb-3">

                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter name" required/>
                            </Form.Group>

                            <Row>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Vendor code</Form.Label>
                                    <Form.Control value={vendorCode} onChange={e => setVendorCode(e.target.value)}  type="text" placeholder="Enter vendor code" />
                                </Form.Group></Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Inventory number</Form.Label>
                                    <Form.Control value={inventoryNumber} onChange={e => setInventoryNumber(e.target.value)} type="text" placeholder="Enter inventory number" />
                                </Form.Group></Col>
                            </Row>
                            <Row>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Rental point</Form.Label>
                                        <Form.Select aria-label="Rental point" value={rentalPointId} onChange={e => setRentalPointId(e.target.value)}>
                                            <option value="0">Choose a rental location</option>
                                            {listPoints.map((point) =>
                                                point['id'] == rentalPointId ?
                                                <option key={point['id']} value={point['id']}>{point['name']}</option>
                                                :
                                                <option key={point['id']} value={point['id']}>{point['name']}</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select aria-label="Rental category" value={rentalCategoryId} onChange={e => setRentalCategoryId(e.target.value)}>
                                        <option value="0">Choose a rental category</option>
                                        {listCategories.map((category) =>
                                            category['id'] == rentalCategoryId ?
                                                <option key={category['id']} value={category['id']}>{category['name']}</option>
                                                :
                                                <option key={category['id']} value={category['id']}>{category['name']}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select aria-label="Rental Status" value={rentalStatusId} onChange={e => setRentalStatusId(e.target.value)}>
                                        <option value="0">Select the rental status</option>
                                        {listStatuses.map((status) =>
                                            status['id'] == rentalStatusId ?
                                                <option key={status['id']} value={status['id']}>{status['name']}</option>
                                                :
                                                <option key={status['id']} value={status['id']}>{status['name']}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                    <Card className="card p-4 mb-3">
                        <Form>
                            <Row>
                                <Col><Form.Group>
                                    <Form.Label>Date of next inspection</Form.Label>
                                    <Form.Control value={inspectionDate} onChange={e => setInspectionDate(e.target.value)} type="date" placeholder="Enter date of next inspection" />
                                </Form.Group></Col>
                                <Col><Form.Group>
                                    <Form.Label>Date of next oil change</Form.Label>
                                    <Form.Control value={oilChangeDate} onChange={e => setOilChangeDate(e.target.value)} type="date" placeholder="Enter date of next oil change" />
                                </Form.Group></Col>
                                <Col><Form.Group>
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control as="textarea" value={note} onChange={e => setNote(e.target.value)} rows={3} />
                                </Form.Group></Col>
                            </Row>
                        </Form>
                     </Card>

                    <Card className="card p-4 ">
                        <DropZona user={user} id={id} uploadImageFunc={uploadImageStock} deleteItem={deleteImageStock} update_files_info={update_files_info} allFiles={allFiles} saveUploadImages={saveUploadImages} setSaveUploadImages={setSaveUploadImages}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StockEdit;