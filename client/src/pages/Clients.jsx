import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import {all_clients, del_clients, get_phone_client, upload_images_client} from "../http/companyAPI";
import TableMain from "../components/TableMain";
import {IoIosAdd} from "react-icons/io";
import MainButton from "../components/UI/MainButton/MainButton";
import ModalClient from "../components/UI/ModalClient/ModalClient";
import {useNavigate} from "react-router-dom";

const Clients = () => {
    const [clients, setClients] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name", use: true, def: true},{name: "Email", el: "email", use: true, def: true}, {name: "Phone", el: "phone", use: true, def: true}, {name: "Birthday", el: "birthday", use: true, def: false}, {name: "Driver license", el: "driver_license_number", use: false, def: false},{name: "Address", el: "address", use: false, def: false}, {name: "Passport number", el: "passport_number", use: false, def: false}]);
    const [itemSearch, setItemSearch] = useState(['name', 'email', 'phone']);
    const [modalShow, setModalShow] = React.useState(false);
    const [clientEdit, setClientEdit] = useState(0);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        reloading();
    },[]);
    const reloading = () => {
        all_clients().then(clients => setClients(clients));
    }

    const changeElHead = (e, el) =>{
        let elem = head.filter(function(f) { if(f['el'] == el){f['use'] = e.target.checked} return true});
        setHead(elem);
    }

     const deleteClient = async(id_client) =>{
        if (window.confirm('Are you sure you want to delete the user?')){
            let dClient = await del_clients(id_client);
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
                    <MainButton onClick={() => navigate('/clients_edit')}><IoIosAdd size="1.2rem" />Add client</MainButton>
                    <ModalClient clientEdit={clientEdit} reloading={reloading} show={modalShow} onHide={() => setModalShow(false)}></ModalClient>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="card p-4" >
                        <Row>
                            <Col md="4"><SearchInput value={search} onChange={e => {setSearch(e.target.value)}} placeholder="Search..."/></Col>
                            <Col style={{textAlign: "right"}}>
                                {head.map((d) =>
                                    <Form.Check type="switch" key={d.el} id={d.el} label={d.name} disabled={d.def} onChange={e => changeElHead(e, d.el)} checked={d.use} inline="true"/>
                                )}
                            </Col>
                        </Row>
                        <br/>
                        <div className="blockScrollTable">
                            <TableMain data_body={clients} data_search={search} data_head={head.filter(function(f) { return f['use'] })} setModalShow={setModalShow} setClientEdit={setClientEdit} url_edit="clients_edit" delete_item={deleteClient} itemSearch={itemSearch}/>
                        </div>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Clients;