import React, {useContext, useState} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import classes from "./TopMenu.module.css"
import {RiUserFollowFill} from "react-icons/ri";
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";

const TopMenu = () => {
    const user_data = useContext(Context);
    const user = user_data.user.user;
    return (
        <Navbar className={classes.topMenuD}>
            <Container fluid>
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <div className={classes.UserName}>
                            <div className={classes.text}>
                                <strong>{user.name}</strong>
                                <p>{user.role.name}</p>
                            </div>
                            <div className={classes.icon}><RiUserFollowFill /></div>
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default TopMenu;