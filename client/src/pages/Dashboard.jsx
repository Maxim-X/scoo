import React, {useContext} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {AiFillExperiment} from "react-icons/ai";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const Dashboard = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    console.log(user.user.name);

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false);
        localStorage.removeItem('token');
        window.location.href = LOGIN_ROUTE;
    }
    return (
        <div>111</div>
        // <Container fluid>
        //     <Row>
        //         <Col md={3}>
        //             <div className="left_main_menu">
        //                 <ul className="nav flex-column left-menu">
        //                     <li className="nav-item left-menu-li">
        //                         <button onClick={() => logOut()}>Выйти</button>
        //                     </li>
        //                     <ul>
        //                         <li className="nav-item left-menu-li">
        //                             <a className="nav-link active" href="#">
        //                                 <span><AiFillExperiment size="1.4rem" /></span>
        //                                 <span>Пункт меню</span>
        //                             </a>
        //                         </li>
        //                         <li className="nav-item left-menu-li">
        //                             <a className="nav-link active" href="#">
        //                                 <span><AiFillExperiment size="1.4rem" /></span>
        //                                 <span>Пункт меню</span>
        //                             </a>
        //                         </li>
        //                     </ul>
        //                     <li className="nav-item left-menu-li">
        //                         <a className="nav-link active" href="#">
        //                             <span><AiFillExperiment size="1.4rem" /></span>
        //                             <span>Пункт меню</span>
        //                         </a>
        //                     </li>
        //                     <li className="nav-item left-menu-li">
        //                         <a className="nav-link active" href="#">
        //                             <span><AiFillExperiment size="1.4rem" /></span>
        //                             <span>Пункт меню</span>
        //                         </a>
        //                     </li>
        //                     <li className="nav-item left-menu-li">
        //                         <a className="nav-link active" href="#">
        //                             <span><AiFillExperiment size="1.4rem" /></span>
        //                             <span>Пункт меню</span>
        //                         </a>
        //                     </li>
        //                 </ul>
        //             </div>
        //         </Col>
        //     </Row>
        // </Container>
    );
};

export default Dashboard;