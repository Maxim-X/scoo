import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainButton from "../MainButton/MainButton";
import {Alert, Col, Form, Row} from "react-bootstrap";
import {Context} from "../../../index";
import {login} from "../../../http/userAPI";
import {add_clients, edit_clients, get_client} from "../../../http/companyAPI";

const ModalClient = ({reloading,clientEdit, ...props}) => {
    const {user} = useContext(Context);
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [series, setSeries] = useState("");
    const [numberPass, setNumberPass] = useState("");
    const [birthday, setBirthday] = useState("");

    const [successAdd, setSuccessAdd] = useState("");
    const [failAdd, setFailAdd] = useState("");

    const get_client_info = React.useMemo(async() => {
        setSuccessAdd("");
        setFailAdd("");
        if (clientEdit == 0){
            setName("");
            setPhone("");
            setEmail("");
            setSeries("");
            setNumberPass("");
            setBirthday("");
        }else {
            try {
                let client = await get_client(clientEdit, user.user.company.id);
                console.log(client);
                setName(client.name);
                setPhone(client.phone);
                setEmail(client.email);
                setSeries(client.passport_series);
                setNumberPass(client.passport_number);
                setBirthday(client.birthday);
            } catch (e) {

            }
        }
    },[clientEdit]);


    const add_client = async (a) =>{
        setSuccessAdd("");
        setFailAdd("");
        try {
            const client ={
                name: name,
                phone: phone,
                email: email,
                series: series,
                numberPass: numberPass,
                birthday: birthday,
            };
            let data;
            if (clientEdit){
                data = await edit_clients(client, user.user.company.id, clientEdit);
            }else {
                data = await add_clients(client, user.user.company.id);
            }

            setSuccessAdd(data.message);
            reloading();
        }catch (e){
            setFailAdd(e.response.data.message);
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            {/*{ React.cloneElement( children, { onClick: handleShow } ) }*/}
            <Modal {...props}> {/* show={show}  onHide={handleClose}*/}
            <Modal.Header closeButton>
                <Modal.Title>{clientEdit ? 'Edit client':'Add client'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {successAdd && <Alert variant="primary">{successAdd}</Alert>}
                {failAdd && <Alert variant="danger">{failAdd}</Alert>}
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Name and surname</Form.Label>
                        <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Enter name and surname" required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="Enter phone number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Row>
                        <Col><Form.Group className="mb-3">
                            <Form.Label>Series of the passport</Form.Label>
                            <Form.Control value={series} onChange={e => setSeries(e.target.value)} type="text" placeholder="Enter series" />
                        </Form.Group></Col>
                        <Col><Form.Group className="mb-3">
                            <Form.Label>Passport number</Form.Label>
                            <Form.Control value={numberPass} onChange={e => setNumberPass(e.target.value)}  type="text" placeholder="Enter passport number" />
                        </Form.Group></Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control value={birthday} onChange={e => setBirthday(e.target.value)} type="date" placeholder="Enter date of birth" />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <MainButton variant="primary" onClick={add_client}>
                    {clientEdit ? 'Edit client':'Add client'}
                </MainButton>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default ModalClient;