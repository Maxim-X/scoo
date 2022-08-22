import React, {useContext, useState} from 'react';
import {Card, Container, Form, Button} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {login} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {DASHBOARD_ROUTE, LOGIN_ROUTE} from "../utils/consts";

const Login = observer(() => {
    const {user} = useContext(Context);
    const history = useNavigate();
    const [email, setEmail] =  useState('');
    const [password, setPassword] =  useState('');

    const auth = async (e) =>{
        e.preventDefault();
        try {
            let data;
            data = await login(email, password);
            user.setUser(data)
            user.setIsAuth(true);
            window.location.href = DASHBOARD_ROUTE;
        }catch (e){
            alert(e.response.data.message);
        }

    };
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: window.innerHeight}}>
            <Card style={{width: "600px"}} className="p-5">
                <h2 className="pb-3">Log in to your account</h2>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => {setEmail(e.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => {setPassword(e.target.value)}}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={auth}>
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Login;