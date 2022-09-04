import React, {useEffect, useState} from 'react';
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";
import MainButton from "../components/UI/MainButton/MainButton";
import {IoIosAdd} from "react-icons/io";
import TableMain from "../components/TableMain";
import {useNavigate} from "react-router-dom";
import {get_stock, del_inventory, get_rental_points, get_rental_category, get_rental_status} from "../http/stockAPI";

const Stock = () => {
    const [stock, setStock] = useState([]);
    const [head, setHead] = useState([{name: "Name", el: "name", use: true, def: true},{name: "Vendor code", el: "vendor_code", use: true, def: true}, {name: "Inventory number", el: "inventory_number", use: true, def: true}, {name: "Rental point", el: "rentalPointId", use: true, def: false}, {name: "Category", el: "rentalCategoryId", use: true, def: false}, {name: "Status", el: "rentalStatusId", use: true, def: false}]);
    const [itemSearch, setItemSearch] = useState(['name', 'vendor_code', 'inventory_number']);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [stockGood, setStockGood] = useState([]);

    const [listPoints, setListPoints] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listStatus, setListStatus] = useState([]);

    useEffect(()=>{
        reloading();
    },[]);

    useEffect(() => {
        if (listStatus.length  && listPoints.length && listCategory.length && stock){
            let replace_value = Object.assign([], stock);
            replace_value.forEach(function (entry){
                let category_replace = listCategory.find(o => o.id == entry['rentalCategoryId']);
                let status_replace = listStatus.find(o => o.id == entry['rentalStatusId']);
                let points_replace = listPoints.find(o => o.id == entry['rentalPointId']);
                if (category_replace && status_replace && points_replace){
                    entry['rentalCategoryId'] = category_replace.name
                    entry['rentalStatusId'] = status_replace.name;
                    entry['rentalPointId'] = points_replace.name;
                }
            });
            setStockGood(replace_value);
        }
    }, [listStatus, listPoints, listCategory])

    const reloading = () => {
       get_stock().then(stock => {setStock(stock); replacing_value()})
    }
    const replacing_value = () =>{
        get_rental_points().then(points => setListPoints(points))
        get_rental_category().then(category => setListCategory(category));
        get_rental_status().then(status => setListStatus(status));
    }

    const changeElHead = (e, el) =>{
        let elem = head.filter(function(f) { if(f['el'] == el){f['use'] = e.target.checked} return true});
        setHead(elem);
    }

    const deleteClient = async(id_stock) =>{
        if (window.confirm('Are you sure you want to delete inventory?')){
            let dInvent = await del_inventory(id_stock);
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
                            <TableMain data_body={stockGood} data_search={search} data_head={head.filter(function(f) { return f['use'] })} delete_item={deleteClient} url_edit="stock_edit" itemSearch={itemSearch}/>
                        </div>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
};

export default Stock;