import React, {useContext, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MainButton from "../MainButton/MainButton";
import {Col, Form, Row} from "react-bootstrap";
import {Context} from "../../../index";

const ModalClient = ({children, ...props}) => {
    const {user} = useContext(Context);
    console.log(user.user.company);
    const [show, setShow] = useState(false);

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [series, setSeries] = useState();
    const [numberPass, setNumberPass] = useState();
    const [birthday, setBirthday] = useState();


    const add_client = async () =>{
        
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            { React.cloneElement( children, { onClick: handleShow } ) }
        <Modal show={show}  onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add client</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                <MainButton variant="primary" onClick={handleClose}>
                    Add client
                </MainButton>
            </Modal.Footer>
        </Modal>
        </>
    );
};

export default ModalClient;