import API from "./Rule_Api";

const handleApiError = (error) => {
  console.log(error);
  throw error.response.data.message || "Error procesando la solicitud";
};

const makeApiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await API[method](url, data, config);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getListaInmuebles = async () => {
  const url = "/api/inmuebles";

  return await makeApiRequest("get", url);
};

export const getInmueblePorId = async (id_inmueble) => {
  const url = `/api/inmuebles/${id_inmueble}`;
  return await makeApiRequest("get", url);
};

export const agregarInmueble = async (formData, config) => {
  const url = "/api/inmuebles";
  return await makeApiRequest("post", url, formData, config);
};

export const modificarInmueble = async (inmueble, id_inmueble) => {
  const url = `/api/inmuebles/${id_inmueble}`;
  return await makeApiRequest("put", url, inmueble);
};

export const eliminarInmueble = async (id_inmueble) => {
  const url = `/api/inmuebles/${id_inmueble}`;
  return await makeApiRequest("delete", url);
};
