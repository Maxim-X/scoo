import React, {useContext, useState} from 'react';
import {useParams, useNavigate, Redirect} from "react-router-dom";
import {Alert, Card, Col, Container, Form, Row} from "react-bootstrap";
import MainButton from "../components/UI/MainButton/MainButton";
import {IoIosAdd} from "react-icons/io";
import ModalClient from "../components/UI/ModalClient/ModalClient";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import TableMain from "../components/TableMain";
import {Context} from "../index";
import {
    add_clients, add_email_client,
    add_phone_client, del_email_client,
    del_phone_client,
    edit_clients,
    get_client, get_emails_client,
    get_phone_client
} from "../http/companyAPI";
import RedButton from "../components/UI/RedButton/RedButton";

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

    const [phonesClient, setPhonesClient] = useState([]);
    const [emailClient, setEmailClient] = useState([]);

    const [anotherDocumentName, setAnotherDocumentName] = useState('');
    const [anotherDocumentNumber, setAnotherDocumentNumber] = useState('');

    const [successAdd, setSuccessAdd] = useState("");
    const [failAdd, setFailAdd] = useState("");

    const get_client_info = React.useMemo(async() => {

        setSuccessAdd("");
        setFailAdd("");
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
        }else {
            try {
                if (!parseInt(id)){
                    window.location.replace("/clients");
                }
                let client = await get_client(id, user.user.company.id);
                setName(client.name);
                setDriverLicenseNumber(client.driver_license_number);
                setNumberPass(client.passport_number);
                setBirthday(client.birthday);
                setAnotherDocumentName(client.another_document_name);
                setAnotherDocumentNumber(client.another_document_number);

                let phoneNumber = await get_phone_client(user.user.company.id, id);
                let allPhone = [];
                phoneNumber.map((Number) =>{
                    allPhone.push(Number.number);
                });
                setPhonesClient(allPhone);

                let emails = await get_emails_client(user.user.company.id, id);
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

    const add_client = async (a) =>{
        setSuccessAdd("");
        setFailAdd("");
        try {
            const client ={
                name: name,
                email: email,
                driver_license_number: driverLicenseNumber,
                numberPass: numberPass,
                birthday: birthday,
                another_document_name: anotherDocumentName,
                another_document_number: anotherDocumentNumber,
                phonesClient: phonesClient,
            };
            let data;
            if (id){
                data = await edit_clients(client, user.user.company.id, id);
            }else {
                data = await add_clients(client, user.user.company.id);
            }

            setSuccessAdd(data.message);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const add_phone = async () =>{
        setFailAdd("");
        try {
            if (id) {
                const add_phone = await add_phone_client(phone, user.user.company.id, id);
            }
            setPhonesClient([...phonesClient, phone]);
            setPhone("");
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const del_phone = async (phoneNum) =>{
        try {
            if (id){
                const del_phone = await del_phone_client(phoneNum, user.user.company.id, id);
            }

            setPhonesClient([...phonesClient.filter(function(f) { return f !== phoneNum })]);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }
    const add_email = async (email) =>{
        setFailAdd("");
        try {
            if (id) {
                const add_email = await add_email_client(email, user.user.company.id, id);
            }
            setEmailClient([...emailClient, email]);
            setEmail("");
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const del_email = async (email) =>{
        try {
            if (id){
                const del_email = await del_email_client(email, user.user.company.id, id);
            }

            setEmailClient([...emailClient.filter(function(f) { return f !== email })]);
        }catch (e){
            setFailAdd(e.response.data.message);
        }
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
                    <Card className="card p-4" >
                        {successAdd && <Alert variant="primary">{successAdd}</Alert>}
                        {failAdd && <Alert variant="danger">{failAdd}</Alert>}
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name and surname</Form.Label>
                                <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter name and surname" required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Row>
                                    <Col><Form.Control value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" /></Col>
                                    <Col md="auto"><MainButton variant="primary" onClick={e => add_phone(phone)}>Add phone</MainButton></Col>
                                </Row>
                            </Form.Group>
                            <div>
                                {phonesClient.map((phone)=>
                                    <div>{phone}<RedButton onClick={e => del_phone(phone)}>X</RedButton></div>
                                )}
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>E-mail</Form.Label>
                                <Row>
                                    <Col><Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" /></Col>
                                    <Col><MainButton variant="primary" onClick={e => add_email(email)}>Add email</MainButton></Col>
                                </Row>
                            </Form.Group>
                            <div>
                                {emailClient.map((email)=>
                                    <div>{email}<RedButton onClick={e => del_email(email)}>X</RedButton></div>
                                )}
                            </div>
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
                            <Form.Group className="mb-3">
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control value={birthday} onChange={e => setBirthday(e.target.value)} type="date" placeholder="Enter date of birth" />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ClientsEdit;