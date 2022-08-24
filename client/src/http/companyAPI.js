import {$authHost, $host} from "./index";

export const all_clients = async (id_company) => {
    const {data} = await $authHost.get('api/client/all', {params: {id_company: id_company}});
    return data;
}

export const add_clients = async (client, id_company) => {
    const {data} = await $authHost.post('api/client/add', {client, id_company});
    return data;
}

export const edit_clients = async (client, id_company, id_client) => {
    const {data} = await $authHost.post('api/client/edit', {client, id_company, id_client});
    return data;
}

export const del_clients = async (id_company, id_client) => {
    const {data} = await $authHost.delete('api/client/delete', {params: {id_company, id_client}});
    return data;
}

export const get_client = async (id_client, id_company) => {
    const {data} = await $authHost.get('api/client/one', {params:{id_client, id_company}});
    return data;
}
