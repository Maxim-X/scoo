import React, {useContext, useEffect, useState} from 'react';
import {useParams, useNavigate, Redirect} from "react-router-dom";
import {Alert, Card, Col, Container, Form, Row} from "react-bootstrap";
import MainButton from "../components/UI/MainButton/MainButton";
import {Context} from "../index";
import {
    add_clients, add_email_client,
    add_phone_client, del_email_client, del_images,
    del_phone_client,
    edit_clients, get_all_images,
    get_client, get_emails_client,
    get_phone_client, upload_images_client
} from "../http/companyAPI";
import RedButton from "../components/UI/RedButton/RedButton";
import {RiDeleteBack2Fill} from "react-icons/ri";
import MiniRedButton from "../components/UI/MiniRedButton/MiniRedButton";
import DropZona from "../components/UI/DropZona/DropZona";
import {del_images_inventory} from "../http/stockAPI";

const ClientsEdit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const back = () =>{navigate(`/clients`);}

    const {user} = useContext(Context);
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
    const [numberPass, setNumberPass] = useState("");
    const [birthday, setBirthday] = useState("");
    const [address, setAddress] = useState("");

    const [phonesClient, setPhonesClient] = useState([]);
    const [emailClient, setEmailClient] = useState([]);

    const [saveUploadImages, setSaveUploadImages] = useState([]);

    const [anotherDocumentName, setAnotherDocumentName] = useState('');
    const [anotherDocumentNumber, setAnotherDocumentNumber] = useState('');

    const [successAdd, setSuccessAdd] = useState("");
    const [failAdd, setFailAdd] = useState("");

    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {
        update_files_info();
    }, []);

    const  update_files_info = async () =>{
        if (id){
            await get_all_images(id).then(images => setAllFiles(images));
        }
    }

    const reset_alert = () => {
        setSuccessAdd("");
        setFailAdd("");
    }

    React.useMemo(async() => {
        reset_alert();
        if (id == undefined){
            setName("");
            setPhone("");
            setEmail("");
            setDriverLicenseNumber("");
            setNumberPass("");
            setBirthday("");
            setAnotherDocumentName("");
            setAnotherDocumentNumber("");
            setPhonesClient([]);
            setEmailClient([]);
            setAddress("");
        }else {
            try {
                if (!parseInt(id)){
                    window.location.replace("/clients");
                }
                let client = await get_client(id);
                setName(client.name == null ? "" : client.name);
                setDriverLicenseNumber(client.driver_license_number == null ? "" : client.driver_license_number);
                setNumberPass(client.passport_number == null ? "" : client.passport_number);
                setBirthday(client.birthday == null ? "" : client.birthday);
                setAnotherDocumentName(client.another_document_name == null ? "" : client.another_document_name);
                setAnotherDocumentNumber(client.another_document_number == null ? "" : client.another_document_number);
                setAddress(client.address == null ? "" : client.address);

                let phoneNumber = await get_phone_client(id);
                let allPhone = [];
                phoneNumber.map((Number) =>{
                    allPhone.push(Number.number);
                });
                setPhonesClient(allPhone);

                let emails = await get_emails_client(id);
                let allEmails = [];
                emails.map((em) =>{
                    allEmails.push(em.email);
                });
                setEmailClient(allEmails);

            } catch (e) {
                window.location.replace("/clients");
            }
        }
    },[id]);

    const add_client = async () =>{
        reset_alert();
        try {
            const client ={
                name: name,
                email: email,
                driver_license_number: driverLicenseNumber,
                numberPass,
                birthday,
                another_document_name: anotherDocumentName,
                another_document_number: anotherDocumentNumber,
                phonesClient,
                emailClient,
                address,
            };
            let data;
            if (id){
                data = await edit_clients(client, id);
            }else {
                    data = await add_clients(client);
                    if (data != undefined && saveUploadImages.length != 0){
                        for (let i = 0; i < saveUploadImages.length; i++){
                            try {
                                const upload = uploadImageClient(saveUploadImages[i], data.client_id);
                            }catch (e){}
                        }
                    }

                }

            setSuccessAdd(data.message);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const add_phone = async () =>{
        reset_alert();
        if (phone.trim() != "") {
            try {
                if (id) {
                    const add_phone = await add_phone_client(phone, id);
                }
                setPhonesClient([...phonesClient, phone]);
                setPhone("");
            } catch (e) {
                setFailAdd(e.response.data.message);
            }
        }
    }

    const del_phone = async (phoneNum) =>{
        try {
            if (id){
                const del_phone = await del_phone_client(phoneNum, id);
            }

            setPhonesClient([...phonesClient.filter(function(f) { return f !== phoneNum })]);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }
    const add_email = async (email) =>{
        reset_alert();
        if (email.trim() != "") {
            try {
                if (id) {
                    const add_email = await add_email_client(email, id);
                }
                setEmailClient([...emailClient, email]);
                setEmail("");
            } catch (e) {
                setFailAdd(e.response.data.message);
            }
        }
    }

    const del_email = async (email) =>{
        try {
            if (id){
                const del_email = await del_email_client(email, id);
            }

            setEmailClient([...emailClient.filter(function(f) { return f !== email })]);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const uploadImageClient = (files, id_client) =>{
        for (let i = 0; i < files.length; i++){
            const FormData1 = new FormData();
            FormData1.append('images', files[i]);
            FormData1.append('id_client', id_client);
            const upload = upload_images_client(FormData1);
            if (upload){
                update_files_info();
            }
        }

        return true;
    }

    const deleteImageClient = async (image_name) =>{
        const del = await del_images(image_name);
        if (del){
            update_files_info();
        }
        return del;
    }


    return (
        <Container fluid className="mainContainer">
            <Row>
                <Col>
                    <h1 className="mainTitle mb-3">{id ? 'Edit client':'Add client'}</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <RedButton style={{"marginRight": "15px"}} variant="primary" onClick={back}>
                        Back
                    </RedButton>
                    <MainButton variant="primary" onClick={add_client}>
                        {id ? 'Edit client':'Add client'}
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
                                <Form.Label>Name and surname</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter name and surname" required/>
                            </Form.Group>

                            <Row>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Passport number</Form.Label>
                                    <Form.Control value={numberPass} onChange={e => setNumberPass(e.target.value)}  type="text" placeholder="Enter passport number" />
                                </Form.Group></Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Driver license</Form.Label>
                                    <Form.Control value={driverLicenseNumber} onChange={e => setDriverLicenseNumber(e.target.value)} type="text" placeholder="Enter driver license" />
                                </Form.Group></Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Another document</Form.Label>
                                    <Row>
                                        <Col><Form.Control value={anotherDocumentName} onChange={e => setAnotherDocumentName(e.target.value)}  type="text" placeholder="Document title" /></Col>
                                        <Col><Form.Control value={anotherDocumentNumber} onChange={e => setAnotherDocumentNumber(e.target.value)}  type="text" placeholder="Document number" /></Col>
                                    </Row>
                                </Form.Group></Col>
                            </Row>
                            <Row>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control value={birthday} onChange={e => setBirthday(e.target.value)} type="date" placeholder="Enter date of birth" />
                                </Form.Group></Col>
                                <Col><Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control value={address} onChange={e => setAddress(e.target.value)} type="address" placeholder="Enter address" />
                                </Form.Group></Col>
                            </Row>
                        </Form>
                    </Card>
                    <Card className="card p-4 mb-3" >
                        <Form.Group className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Row>
                                <Col><Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" /></Col>
                                <Col><MainButton variant="primary" onClick={e => add_email(email)}>Add email</MainButton></Col>
                            </Row>
                        </Form.Group>
                        <Card className="card p-3 mb-3 d-flex gap-4 flex-row">
                            {emailClient.map((email)=>
                                <span key={email}>{email} <MiniRedButton onClick={e => del_email(email)}><RiDeleteBack2Fill/></MiniRedButton></span>
                            )}
                        </Card>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Row>
                                <Col><Form.Control value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" /></Col>
                                <Col><MainButton variant="primary" onClick={e => add_phone(phone)}>Add phone</MainButton></Col>
                            </Row>
                        </Form.Group>
                        <Card className="card p-3 mb-3 d-flex gap-4 flex-row">
                            {phonesClient.map((phone)=>
                                <span key={phone}>{phone} <MiniRedButton onClick={e => del_phone(phone)}><RiDeleteBack2Fill/></MiniRedButton></span>
                            )}
                        </Card>
                    </Card>

                    <Card className="card p-4 ">

                    <DropZona user={user} id={id} deleteItem={deleteImageClient} uploadImageFunc={uploadImageClient} update_files_info={update_files_info} allFiles={allFiles} saveUploadImages={saveUploadImages} setSaveUploadImages={setSaveUploadImages}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ClientsEdit;