import { fetchData } from "../api/Base";

export const createChapter = async (token, data) => {
    try {
        const response = await fetchData("api/v1/chapter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
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
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
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
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getAllChapterByBook = async (token, bookId) => {
    try {
        const response = await fetchData(`api/v1/chapter/all/${bookId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};