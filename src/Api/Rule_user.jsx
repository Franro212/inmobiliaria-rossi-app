import API from "./Rule_Api";

const handleApiError = (error) => {
  console.log(error);
  throw error.response?.data?.error || "Error procesando la solicitud";
};

const makeApiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await API[method](url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const loginUser = async (user) => {
  const url = "/api/user/login";
  const response = await makeApiRequest("post", url, user);
  sessionStorage.setItem("token", response.token);
  return response;
};

export const registerUser = async (user) => {
  const url = "/api/user";
  return await makeApiRequest("post", url, user);
};

export const getUserInfo = async () => {
  const url = "/api/user";
  return await makeApiRequest("get", url);
};

export const modifyUser = async (id_usuario, userData) => {
  const url = `/api/user/${id_usuario}`;
  return await makeApiRequest("put", url, userData);
};

export const deleteUser = async (id_usuario) => {
  const url = `/api/user/${id_usuario}`;
  return await makeApiRequest("delete", url);
};
