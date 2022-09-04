import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";
import {
    get_stock,
    add_inventory,
    get_all_images_inventory,
    upload_images_inventory,
    get_inventory, get_rental_points, get_rental_category, get_rental_status, edit_inventory
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
        get_all_images_inventory(user.user.company.id, id).then(images => setAllFiles(images));
    }

    const get_inventory_info = React.useMemo(async() => {

        get_rental_points(user.user.company.id).then(points => setListPoints(points));
        get_rental_category(user.user.company.id).then(category => setListCategories(category));
        get_rental_status(user.user.company.id).then(statuses => setListStatuses(statuses));
        setSuccessAdd("");
        setFailAdd("");
        if (id == undefined){
            setName("");
            setVendorCode("");
            setInventoryNumber("");
            setRentalPointId("");
            setRentalCategoryId("");
            setRentalStatusId("");
        }else {
            try {
                if (!parseInt(id)){ window.location.replace("/stock"); }

                let stock = await get_inventory(user.user.company.id, id);
                setName(stock.name);
                setVendorCode(stock.vendor_code);
                setInventoryNumber(stock.inventory_number);
                setRentalPointId(stock.rentalPointId);
                setRentalCategoryId(stock.rentalCategoryId);
                setRentalStatusId(stock.rentalStatusId);
            } catch (e) {
                //window.location.replace("/stock");
            }
        }
    },[id]);

    const add_stock = async (a) =>{
        setSuccessAdd("");
        setFailAdd("");
        try {
            const inventory ={
                name,
                vendor_code: vendorCode,
                inventory_number: inventoryNumber,
                rentalPointId: rentalPointId,
                rentalCategoryId: rentalCategoryId,
                rentalStatusId: rentalStatusId,
            };
            let data;
            if (id){
                data = await edit_inventory(inventory, user.user.company.id, id);
            }else {
                data = await add_inventory(inventory, user.user.company.id);
            }
            setSuccessAdd(data.message);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const uploadImageStock = (files) =>{
        const FormData1 = new FormData();
        FormData1.append('images', files[0]);
        FormData1.append('id_company', user.user.company.id);
        FormData1.append('id_stock', id);
        const upload = upload_images_inventory(FormData1);
        return upload;
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
                                        <Form.Select aria-label="Rental point" onChange={e => setRentalPointId(e.target.value)}>
                                            {listPoints.map((point) =>
                                                point['id'] == rentalPointId ? <option value={point['id']} selected>{point['name']}</option>
                                                :<option value={point['id']}>{point['name']}</option>
                                            )}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Select aria-label="Rental category" onChange={e => setRentalCategoryId(e.target.value)}>
                                        {listCategories.map((category) =>
                                            category['id'] == rentalCategoryId ?
                                                <option value={category['id']} selected>{category['name']}</option>
                                                :<option value={category['id']}>{category['name']}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select aria-label="Rental Status" onChange={e => setRentalStatusId(e.target.value)}>
                                        {listStatuses.map((status) =>
                                            status['id'] == rentalStatusId ?
                                                <option value={status['id']} selected>{status['name']}</option>
                                                :<option value={status['id']}>{status['name']}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Card>

                    <Card className="card p-4 ">
                        <DropZona user={user} id={id} uploadImageFunc={uploadImageStock} update_files_info={update_files_info} allFiles={allFiles} saveUploadImages={saveUploadImages} setSaveUploadImages={setSaveUploadImages}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default StockEdit;