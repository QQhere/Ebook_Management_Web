import { fetchData } from "../api/Base";

export const createHistoryReading = async (token, data) => {
  try {
    const response = await fetchData("api/v1/reading-history", {
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

export const getAllHistoryReadingByUser = async (token, userId) => {
  try {
    const response = await fetchData(`api/v1/reading-history/all/${userId}`, {
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

export const updateHistoryReading = async (token, id, chapterId) => {
  try {
    const response = await fetchData(`api/v1/reading-history/${id}/${chapterId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
