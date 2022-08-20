import React, {useContext} from 'react';
import {Col, Container, Navbar, Row} from "react-bootstrap";
import {AiFillExperiment} from "react-icons/ai";
import {Outlet, useNavigate} from "react-router-dom";
import {Context} from "../index";

import {LOGIN_ROUTE} from "../utils/consts";
import {AiFillGitlab} from "react-icons/ai";
import TopMenu from "./UI/TopMenu/TopMenu";

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
        <Container fluid className="p-0">
            <Row className="m-0">
                <Col style={{width: "260px", maxWidth: "260px"}} className="p-0 vh-100">
                    <div className="left_main_menu">
                        <Navbar className="main-logo">
                            <Container>
                                <Navbar.Brand href="#home">
                                    <AiFillGitlab color="#4c70f0" size="2.5rem"/>
                                    <span>JustScoo</span>
                                </Navbar.Brand>
                            </Container>
                        </Navbar>
                        <ul className="nav flex-column left-menu">
                            <div className="head-menu">MENU</div>
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
                            <li className="nav-item left-menu-li">
                                <button onClick={() => logOut()}>Выйти</button>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col className="p-0">
                    <TopMenu />
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default Header;