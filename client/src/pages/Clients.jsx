import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import {login} from "../http/userAPI";
import {all_clients} from "../http/companyAPI";
import data from "bootstrap/js/src/dom/data";
import TableMain from "../components/TableMain";
import {IoIosAdd} from "react-icons/io";
import MainButton from "../components/UI/MainButton/MainButton";
import ModalClient from "../components/UI/ModalClient/ModalClient";
import {Context} from "../index";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name"},{name: "Email", el: "email"}, {name: "Phone", el: "phone"}, {name: "Birthday", el: "birthday"}]);

    useEffect(()=>{
        reloading();
    },[]);

    const reloading = () => {
        all_clients(1).then(clients => setClients(clients));
    }




    return (
        <Container fluid className="mainContainer">
            <Row>
                <Col>
                    <h1 className="mainTitle mb-3">Your clients</h1>
                </Col>
                <Col style={{textAlign: "right"}}><ModalClient reloading={reloading}><MainButton><IoIosAdd size="1.2rem" />Add client</MainButton></ModalClient></Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card p-4" >
                        <Row>
                            <Col><SearchInput placeholder="Search..."/></Col>
                            <Col></Col>
                        </Row>
                        <br/>
                        <TableMain data_body={clients} data_head={head}/>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Clients;