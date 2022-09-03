import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import MainButton from "../components/UI/MainButton/MainButton";
import {IoIosAdd} from "react-icons/io";
import ModalClient from "../components/UI/ModalClient/ModalClient";
import TableMain from "../components/TableMain";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {get_stock, add_inventory} from "../http/stockAPI";

const Stock = () => {
    const {user} = useContext(Context);
    const [stock, setStock] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name", use: true, def: true},{name: "Vendor code", el: "vendor_code", use: true, def: true}, {name: "Inventory number", el: "inventory_number", use: true, def: true}, {name: "Rental point", el: "rentalPointId", use: true, def: false}, {name: "Category", el: "rentalCategoryId", use: true, def: false}, {name: "Status", el: "rentalStatusId", use: true, def: false}]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        reloading();
    },[]);

    const reloading = () => {
        get_stock(user.user.company.id).then(stock => setStock(stock));
        console.log(stock);
    }

    const changeElHead = (e, el) =>{
        let elem = head.filter(function(f) { if(f['el'] == el){f['use'] = e.target.checked} return true});
        setHead(elem);
    }

    const deleteClient = async(id_client) =>{
        if (window.confirm('Are you sure you want to delete the user?')){
            //let dClient = await del_clients(user.user.company.id, id_client);
            reloading();
        }
    }

    return (
        <Container fluid className="mainContainer">
            <Row>
                <Col>
                    <h1 className="mainTitle mb-3">Stock</h1>
                </Col>
                <Col style={{textAlign: "right"}}>
                    <MainButton onClick={() => navigate('/stock_edit')}><IoIosAdd size="1.2rem" />Add Inventory</MainButton>
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
                            <TableMain data_body={stock} data_search={search} data_head={head.filter(function(f) { return f['use'] })} delete_item={deleteClient} url_edit="stock_edit"/>
                        </div>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Stock;