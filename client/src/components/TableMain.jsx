import React from 'react';
import {Table} from "react-bootstrap";

const TableMain = ({data_head, data_body}) => {

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    {data_head.map((d) =>
                        <th>{d['name']}</th>
                    )}
                </tr>
            </thead>
            <tbody>
            {data_body.map((data) =>
                <tr>
                {data_head.map((d) =>
                    <td>{data[d['el']]}</td>
                )}
                </tr>

            )}
            </tbody>
        </Table>
    );
};

export default TableMain;