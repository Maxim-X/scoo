import {$authHost, $host} from "./index";

export const get_stock = async (id_company) => {
    const {data} = await $authHost.get('api/stock/all', {params: {id_company: id_company}});
    return data;
}

export const get_inventory = async (id_company, id_inventory) => {
    const {data} = await $authHost.get('api/stock/one', {params: {id_company, id_inventory}});
    return data;
}

export const add_inventory = async (inventory, id_company) => {
    const {data} = await $authHost.post('api/stock/add', {inventory, id_company});
    return data;
}
export const edit_inventory = async (inventory, id_company, id_inventory) => {
    const {data} = await $authHost.post('api/stock/edit', {inventory, id_company, id_inventory});
    return data;
}

export const upload_images_inventory = async (FormData) => {
    const {data} = await $authHost.post('api/stock/upload_images', FormData);
    return data;
}

export const get_all_images_inventory = async (id_company, id_client) => {
    const {data} = await $authHost.get('api/stock/get_all_images', {params:{id_company, id_client}});
    return data;
}

export const del_images_inventory = async (id_company, images_name) => {
    const {data} = await $authHost.post('api/stock/delete_images', {id_company, images_name});
    return data;
}

export const get_rental_points = async (id_company) => {
    const {data} = await $authHost.get('api/stock/get_rental_points', {params:{id_company}});
    return data;
}
export const get_rental_category = async (id_company) => {
    const {data} = await $authHost.get('api/stock/get_rental_category', {params:{id_company}});
    return data;
}
export const get_rental_status = async (id_company) => {
    const {data} = await $authHost.get('api/stock/get_rental_status', {params:{id_company}});
    return data;
}