import { fetchData } from "../api/Base";

export const createChapter = async (token, data) => {
    try {
        const response = await fetchData("api/v1/chapter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                original_number: data.original_number,
                thumbnail: data.thumbnail,
                book_id: data.book_id,

            }),
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getChapterById = async (token, chapterId) => {
    try {
        const response = await fetchData(`api/v1/chapter/${chapterId}`, {
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

export const updateChapter = async (token, chapterId, data) => {
    try {
        const response = await fetchData(`api/v1/chapter/${chapterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: data.name,
                original_number: data.original_number,
                thumbnail: data.thumbnail,
                book_id: data.book_id,

            }),
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};

export const deleteChapter = async (token, chapterId) => {
    try {
        const response = await fetchData(`api/v1/chapter/${chapterId}`, {
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

export const getAllChapterByBook = async (token, bookId) => {
    try {
        const response = await fetchData("api/v1/chapter/all", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "book_id": bookId.toString(),
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
};