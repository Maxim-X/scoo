import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Form, Row, Table} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import MainButton from "../components/UI/MainButton/MainButton";
import {IoIosAdd} from "react-icons/io";
import ModalClient from "../components/UI/ModalClient/ModalClient";
import TableMain from "../components/TableMain";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {get_stock, add_inventory, get_rental_points, get_rental_category, get_rental_status} from "../http/stockAPI";
import {forEach} from "react-bootstrap/ElementChildren";

const Stock = () => {
    const {user} = useContext(Context);
    const [stock, setStock] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name", use: true, def: true},{name: "Vendor code", el: "vendor_code", use: true, def: true}, {name: "Inventory number", el: "inventory_number", use: true, def: true}, {name: "Rental point", el: "rentalPointId", use: true, def: false}, {name: "Category", el: "rentalCategoryId", use: true, def: false}, {name: "Status", el: "rentalStatusId", use: true, def: false}]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const [listPoints, setListPoints] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listStatus, setListStatus] = useState([]);

    useEffect(()=>{
        reloading();
    },[]);

    useEffect(() => {
        let replace_value = [];

        for (let index = 0; index < stock.length; ++index) {
            let dd = stock[index];
            dd.rentalPointId = -1;
            replace_value.push(dd);
        }
        console.log(replace_value);
        setStock(replace_value);


    }, [listStatus, listPoints, listCategory])

    const reloading = () => {
        let stock_get = get_stock(user.user.company.id).then(stock => {setStock(stock); replacing_value()})
    }
    const replacing_value = () =>{
        let points_get = get_rental_points(user.user.company.id).then(points => setListPoints(points))
        let category_get = get_rental_category(user.user.company.id).then(category => setListCategory(category));
        let status_get = get_rental_status(user.user.company.id).then(status => setListStatus(status));
    }
    // const replacingValues()

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