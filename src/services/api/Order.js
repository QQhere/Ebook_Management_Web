import { fetchData } from "../api/Base";

export const createOrder = async (token, data) => {
    try {
        const response = await fetchData("api/v1/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                status: data.status,
                payment_method: data.payment_method,
                user_id: data.user_id,
                book_ids: data.book_ids,
            }),
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateOrder = async (token, orderId, data) => {
    try {
        const response = await fetchData(`api/v1/order/${orderId}/pendings`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getOrderById = async (token, orderId) => {
    try {
        const response = await fetchData(`api/v1/order/${orderId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllOrderByUser = async (token, userId, page) => {
    try {
        const response = await fetchData(`api/v1/order/all/${userId}?page=${page}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};