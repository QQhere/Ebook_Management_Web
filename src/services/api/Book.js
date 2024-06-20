import { fetchData } from "../api/Base";

export const createBook = async (token, data, userId) => {
  try {
    const response = await fetchData(`api/v1/book/${userId}`, {
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

export const updateBook = async (token, data, bookId) => {
  try {
    const response = await fetchData(`api/v1/book/${bookId}`, {
      method: "PUT",
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
}

export const deleteBook = async (token, bookId) => {
  try {
    const response = await fetchData(`api/v1/book/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const getBookById = async (bookId) => {
  try {
    const response = await fetchData(`api/v1/book/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const getAllBookByUser = async (token, userId) => {
  try {
    const response = await fetchData(`api/v1/book/all/${userId}`, {
      method: "GET",
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

export const getAllBookByType = async (type, page, limit) => {
  try {
    const response = await fetchData(`api/v1/book/all/${type}/${page}/${limit}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const searchBook = async (searchDTO, page, limit) => {
  try {
    const response = await fetchData(`api/v1/book/search/${page}/${limit}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchDTO),
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const getAllBookByAccount = async (accountId) => {
  try {
    const response = await fetchData(`api/v1/book/account/${accountId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
}

export const updateNumberRead = async (bookId) => {
  try {
    const response = await fetchData(`api/v1/book/number-read/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    });
    
    return response;
  } catch (error) {
    throw error;
  }
}