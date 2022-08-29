import React, {useContext, useEffect, useMemo, useState} from 'react';
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import {login} from "../http/userAPI";
import {all_clients, del_clients} from "../http/companyAPI";
import data from "bootstrap/js/src/dom/data";
import TableMain from "../components/TableMain";
import {IoIosAdd} from "react-icons/io";
import MainButton from "../components/UI/MainButton/MainButton";
import ModalClient from "../components/UI/ModalClient/ModalClient";
import {Context} from "../index";

const Clients = () => {
    const {user} = useContext(Context);
    const [clients, setClients] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name"},{name: "Email", el: "email"}, {name: "Phone", el: "phone"}, {name: "Birthday", el: "birthday"}]);
    const [modalShow, setModalShow] = React.useState(false);
    const [clientEdit, setClientEdit] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(()=>{
        reloading();
    },[]);

    const reloading = () => {
        all_clients(user.user.company.id).then(clients => setClients(clients));
    }

    const clickAddClient = () =>{
        setClientEdit(0);
        setModalShow(true);
    }
     const deleteClient = async(id_client) =>{
        if (window.confirm('Are you sure you want to delete the user?')){
            let dClient = await del_clients(user.user.company.id, id_client);
            reloading();
        }
    }





    return (
        <Container fluid className="mainContainer">
            <Row>
                <Col>
                    <h1 className="mainTitle mb-3">Your clients</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <MainButton onClick={() => {clickAddClient()}}><IoIosAdd size="1.2rem" />Add client</MainButton>
                    <ModalClient clientEdit={clientEdit} reloading={reloading} show={modalShow} onHide={() => setModalShow(false)}></ModalClient>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card p-4" >
                        <Row>
                            <Col><SearchInput value={search} onChange={e => {setSearch(e.target.value)}} placeholder="Search..."/></Col>
                            <Col></Col>
                        </Row>
                        <br/>
                        <TableMain data_body={clients} data_search={search} data_head={head} setModalShow={setModalShow} setClientEdit={setClientEdit} deleteClient={deleteClient}/>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Clients;