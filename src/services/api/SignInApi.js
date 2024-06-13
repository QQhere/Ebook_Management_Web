import { fetchData } from "./Base";

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
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (fullname, phoneNumber, password, retypePassword) => {
  try {
    const response = await fetchData("api/v1/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
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
}