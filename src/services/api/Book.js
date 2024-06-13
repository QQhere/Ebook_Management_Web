import { fetchData } from "../api/Base";

export const createBook = async (token, data, userId) => {
  try {
    const response = await fetchData(`api/v1/book/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllBookByUser = async (token, userId) => {
  try {
    const response = await fetchData(`api/v1/book/all/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
