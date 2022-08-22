import {$authHost, $host} from "./index";

export const all_clients = async (id_company) => {
    const {data} = await $authHost.get('api/client/all', {params: {id_company: id_company}});
    return data;
}

export const add_clients = async (client) => {
    const {data} = await $authHost.get('api/client/add', {params: {client: client}});
    console.log(data);
    return data;
}
