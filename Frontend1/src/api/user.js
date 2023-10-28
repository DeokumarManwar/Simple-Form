import axios from "axios";

const baseURL = "http://localhost:4000/";

export const createUser = async (userName, password, email) => {
  try {
    const res = await axios.post(`${baseURL}api/users/register`, {
      userName: userName,
      password: password,
      email: email,
    });
    return res;
  } catch (e) {
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const res = await axios.post(`${baseURL}api/users/login`, {
      userName: username,
      password: password,
    });
    console.log(res);
    return res;
  } catch (e) {
    return null;
  }
};
