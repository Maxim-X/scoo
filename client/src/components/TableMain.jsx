import React from 'react';
import {Table} from "react-bootstrap";
import MainButton from "./UI/MainButton/MainButton";
import {AiFillEdit, AiFillDelete} from "react-icons/ai";
import ModalClient from "./UI/ModalClient/ModalClient";
import RedButton from "./UI/RedButton/RedButton";

const TableMain = ({data_head, data_body, setClientEdit, setModalShow, deleteClient}) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {data_head.map((d) =>
                        <th key={d['name']}>{d['name']}</th>
                    )}
                    <th>FUNC</th>
                </tr>
            </thead>
            <tbody>
            {data_body.map((data) =>
                <tr key={data.id}>
                    {data_head.map((d) =>
                        <td key={data[d['el']]}>{data[d['el']]}</td>
                    )}
                <td key={"td-func-"+data['id']} width="min-content">
                    <MainButton key={"func-"+data['id']} style={{marginRight:"10px"}} onClick={e=>{setClientEdit(data['id']); setModalShow(true)}}><AiFillEdit size="1.2rem" style={{marginRight:"0px"}}/></MainButton>
                    <RedButton key={"func-del-"+data['id']} onClick={e=>{deleteClient(data['id'])}}><AiFillDelete size="1.2rem" style={{marginRight:"0px"}}/></RedButton>
                </td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default TableMain;