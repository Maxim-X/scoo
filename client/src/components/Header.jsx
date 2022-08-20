import React, {useContext} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {AiFillExperiment} from "react-icons/ai";
import {Outlet, useNavigate} from "react-router-dom";
import {Context} from "../index";

import {LOGIN_ROUTE} from "../utils/consts";

const Header = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false);
        localStorage.removeItem('token');
        window.location.href = LOGIN_ROUTE;
    }
    return (
        <Container fluid>
            <Row>
                <Col md={3}>
                    <div className="left_main_menu">
                        <ul className="nav flex-column left-menu">
                            <li className="nav-item left-menu-li">
                                <button onClick={() => logOut()}>Выйти</button>
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
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default Header;