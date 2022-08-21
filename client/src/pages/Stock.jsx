import React from 'react';
import {Card, Col, Container, Row, Table} from "react-bootstrap";
import SearchInput from "../components/UI/SearchInput/SearchInput";

const Stock = () => {
    return (
        <Container fluid className="mainContainer">
            <h1 className="mainTitle mb-3">Your motorcycles</h1>
            <Row>
                <Col>
                    <Card className="card p-4" >
                        <SearchInput placeholder="Search..."/>
                        <br/>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            </tbody>
                        </Table>
                    </Card>

                </Col>
            </Row>
        </Container>
    );
};

export default Stock;