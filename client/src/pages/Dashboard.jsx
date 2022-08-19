import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {AiFillExperiment} from "react-icons/ai";

const Dashboard = () => {
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <div className="left_main_menu">
                        <ul className="nav flex-column left-menu">
                            <li className="nav-item left-menu-li">
                                <a className="nav-link active" href="#">
                                    <span><AiFillExperiment size="1.4rem" /></span>
                                    <span>Пункт меню</span>
                                </a>
                            </li>
                            <ul>
                                <li className="nav-item left-menu-li">
                                    <a className="nav-link active" href="#">
                                        <span><AiFillExperiment size="1.4rem" /></span>
                                        <span>Пункт меню</span>
                                    </a>
                                </li>
                                <li className="nav-item left-menu-li">
                                    <a className="nav-link active" href="#">
                                        <span><AiFillExperiment size="1.4rem" /></span>
                                        <span>Пункт меню</span>
                                    </a>
                                </li>
                            </ul>
                            <li className="nav-item left-menu-li">
                                <a className="nav-link active" href="#">
                                    <span><AiFillExperiment size="1.4rem" /></span>
                                    <span>Пункт меню</span>
                                </a>
                            </li>
                            <li className="nav-item left-menu-li">
                                <a className="nav-link active" href="#">
                                    <span><AiFillExperiment size="1.4rem" /></span>
                                    <span>Пункт меню</span>
                                </a>
                            </li>
                            <li className="nav-item left-menu-li">
                                <a className="nav-link active" href="#">
                                    <span><AiFillExperiment size="1.4rem" /></span>
                                    <span>Пункт меню</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;