import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import classes from "./TopMenu.module.css"
import {RiUserFollowFill} from "react-icons/ri";

const TopMenu = () => {
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
                                <strong>Максим</strong>
                                <p>Администратор</p>
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