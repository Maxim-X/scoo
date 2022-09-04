import {$authHost, $host} from "./index";

export const get_stock = async () => {
    const {data} = await $authHost.get('api/stock/all', {});
    return data;
}

export const get_inventory = async (id_inventory) => {
    const {data} = await $authHost.get('api/stock/one', {params: {id_inventory}});
    return data;
}

export const add_inventory = async (inventory) => {
    const {data} = await $authHost.post('api/stock/add', {inventory});
    return data;
}
export const edit_inventory = async (inventory, id_inventory) => {
    const {data} = await $authHost.post('api/stock/edit', {inventory, id_inventory});
    return data;
}
export const del_inventory = async (id_stock) => {
    const {data} = await $authHost.delete('api/stock/delete', {params:{id_stock}});
    return data;
}

export const upload_images_inventory = async (FormData) => {
    console.log(FormData);
    const {data} = await $authHost.post('api/stock/upload_images', FormData);
    return data;
}

export const get_all_images_inventory = async (id_stock) => {
    const {data} = await $authHost.get('api/stock/get_all_images', {params:{id_stock}});
    return data;
}

export const del_images_inventory = async (images_name) => {
    const {data} = await $authHost.post('api/stock/delete_images', {images_name});
    return data;
}

export const get_rental_points = async () => {
    const {data} = await $authHost.get('api/stock/get_rental_points', {});
    return data;
}
export const get_rental_category = async () => {
    const {data} = await $authHost.get('api/stock/get_rental_category', {});
    return data;
}
export const get_rental_status = async () => {
    const {data} = await $authHost.get('api/stock/get_rental_status', {});
    return data;
}