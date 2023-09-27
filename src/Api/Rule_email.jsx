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
export const sendEmail = async (email) => {
    const url = "/api/email";
    return await makeApiRequest("post", url, email);
  };