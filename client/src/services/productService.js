import api from "./api";

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);

    return response.data;
};