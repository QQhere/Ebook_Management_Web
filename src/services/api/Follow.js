import { fetchData } from "../api/Base";

export const createFollow = async (token, data) => {
  try {
    const response = await fetchData("api/v1/follow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        following: data.following,
        user_id: data.userId,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllFollow = async (token, userId) => {
  try {
    const response = await fetchData(`api/v1/follow/all/userId/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteFollow = async (token, followId) => {
  try {
    const response = await fetchData(`api/v1/follow/${followId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getFollowById = async (token, followId) => {
  try {
    const response = await fetchData(`api/v1/follow/${followId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllFollowByTwoUser = async (following, userId) => {
  try {
    const response = await fetchData(
      `api/v1/follow/${following}/${userId}`,
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
