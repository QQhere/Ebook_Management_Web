import { fetchData } from "../api/Base";

export const logIn = async (phoneNumber, password) => {
  try {
    const response = await fetchData("api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: phoneNumber,
        password: password,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (
  fullname,
  phoneNumber,
  password,
  retypePassword
) => {
  try {
    const response = await fetchData("api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname: fullname,
        phone_number: phoneNumber,
        password: password,
        retype_password: retypePassword,
      }),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async (token) => {
  try {
    const response = await fetchData("api/v1/user/details", {
      method: "POST",
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

export const updateUserDetails = async (token, data, userId) => {
  try {
    const response = await fetchData(`api/v1/user/details/${userId}`, {
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
};

export const searchUser = async (keyword, page, size) => {
  try {
    const response = await fetchData(`api/v1/user/search/${keyword}/${page}/${size}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    return response;
  } catch (error) {
    throw error;
  }
}