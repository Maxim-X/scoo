import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import {login} from "../http/userAPI";
import {all_clients} from "../http/companyAPI";
import data from "bootstrap/js/src/dom/data";
import TableMain from "../components/TableMain";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name"},{name: "Email", el: "email"}, {name: "Phone", el: "phone"}, {name: "Birthday", el: "birthday"}]);
    // setClients(all_clients(1));
    useEffect(()=>{
        all_clients(1).then(clients => setClients(clients));
        console.log(clients);
    },[]);


    return (
        <Container fluid className="mainContainer">
            <h1 className="mainTitle mb-3">Your clients</h1>
            <Row>
                <Col>
                    <Card className="card p-4" >
                        <SearchInput placeholder="Search..."/>
                        <br/>
                        <TableMain data_body={clients} data_head={head}/>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Clients;