import {$authHost, $host} from "./index";

export const all_clients = async (id_company) => {
    const {data} = await $authHost.get('api/client/all', {params: {id_company: id_company}});
    // localStorage.setItem('token', data.token);
    console.log(data);
    return data;
}