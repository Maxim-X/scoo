import {$authHost, $host} from "./index";
import jwt_decode  from "jwt-decode";


export const registration = async (email, password) => {
    const response = await $host.post('api/user/registration', {email, password});
    return response;
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.token);
    return jwt_decode(data.token);
}

export const getRole = async (idRole) => {
    const {data} = await $authHost.get('api/role/one', {params: {idRole}});
    // localStorage.setItem('token', data.token);
    console.log(data);
    return data;
}