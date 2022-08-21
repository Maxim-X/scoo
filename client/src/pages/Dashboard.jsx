import React, {useContext} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {AiFillExperiment} from "react-icons/ai";
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";

const Dashboard = () => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false);
        localStorage.removeItem('token');
        window.location.href = LOGIN_ROUTE;
    }
    return (
        <Container fluid className="mainContainer">
            <h1 className="mainTitle">Dashboard</h1>
        </Container>
    );
};

export default Dashboard;