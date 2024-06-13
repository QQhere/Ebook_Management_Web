import { fetchData } from "../api/Base";


export const createRating = async (token, data) => {
    try {
        const response = await fetchData("api/v1/rating", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                score: data.score,
                book_id: data.book_id,
                user_id: data.user_id,
            }),
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const updateRating = async (token, ratingId, data) => {
    try {
        const response = await fetchData(`api/v1/rating/${ratingId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                score: data.score,
            }),
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteRating = async (token, ratingId) => {
    try {
        const response = await fetchData(`api/v1/rating/${ratingId}`, {
            method: "DELETE",
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

export const getAllRatingByBookId = async (bookId) => {
    try {
        const response = await fetchData(`api/v1/rating/all/${bookId}`, {
            method: "GET",
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};