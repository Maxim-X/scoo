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

export const add_phone_client = async (phone, id_company, id_client) => {
    const {data} = await $authHost.post('api/client/add_phone', {number:phone, id_company, id_client});
    return data;
}

export const del_phone_client = async (phone, id_company, id_client) => {
    const {data} = await $authHost.post('api/client/del_phone', {number:phone, id_company, id_client});
    return data;
}

export const get_phone_client = async (id_company, id_client) => {
    const {data} = await $authHost.get('api/client/all_phones', {params:{id_company, id_client}});
    return data;
}
export const add_email_client = async (email, id_company, id_client) => {
    const {data} = await $authHost.post('api/client/add_email', {email:email, id_company, id_client});
    return data;
}

export const del_email_client = async (email, id_company, id_client) => {
    const {data} = await $authHost.post('api/client/del_email', {email:email, id_company, id_client});
    return data;
}

export const get_emails_client = async (id_company, id_client) => {
    const {data} = await $authHost.get('api/client/all_emails', {params:{id_company, id_client}});
    return data;
}

export const upload_images_client = async (FormData) => {
    const {data} = await $authHost.post('api/client/upload_images', FormData);
    return data;
}


export const get_all_images = async (id_company, id_client) => {
    const {data} = await $authHost.get('api/client/get_all_images', {params:{id_company, id_client}});
    return data;
}

export const del_images = async (id_company, images_name) => {
    const {data} = await $authHost.post('api/client/delete_images', {id_company, images_name});
    return data;
}
