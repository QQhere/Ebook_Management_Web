import { fetchData } from "../api/Base";

export const createCategory = async (token, data) => {
  try {
    const response = await fetchData("api/v1/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const putCategory = async (token, data) => {
  try {
    const response = await fetchData("api/v1/category", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        descryption: data.descryption,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (token, categoryId) => {
  try {
    const response = await fetchData(`api/v1/category/${categoryId}`, {
      method: "DELETE",
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

export const getCategoryById = async (categoryId) => {
  try {
    const response = await fetchData(
      `api/v1/category?category_id=${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const response = await fetchData("api/v1/category/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
