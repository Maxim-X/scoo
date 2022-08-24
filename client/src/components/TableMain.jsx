import React from 'react';
import {Table} from "react-bootstrap";
import MainButton from "./UI/MainButton/MainButton";
import {IoIosAdd} from "react-icons/io";
import ModalClient from "./UI/ModalClient/ModalClient";

const TableMain = ({data_head, data_body, setClientEdit, setModalShow}) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {data_head.map((d) =>
                        <th key={d['name']}>{d['name']}</th>
                    )}
                </tr>
            </thead>
            <tbody>
            {data_body.map((data) =>
                <tr key={data.id}>
                    {data_head.map((d) =>
                        <td key={data[d['el']]}>{data[d['el']]}</td>
                    )}
                <td key={"td-func-"+data['id']}><MainButton key={"func-"+data['id']} onClick={e=>{setClientEdit(data['id']); setModalShow(true)}}><IoIosAdd size="1.2rem" />EDIT</MainButton></td>
                </tr>
            )}
            </tbody>
        </Table>
    );
};

export default TableMain;