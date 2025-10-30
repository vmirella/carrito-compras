import axios from "axios";

const api = axios.create({
  baseURL: "https://josetello.com/cart/",
  timeout: 8000
});

export const getProducts = async params => {
  try {
    const { data } = await api.get("products.php", { params });

    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

export const getCategories = async params => {
  try {
    const { data } = await api.get("categories.php", { params });

    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};

export const getSlider = async params => {
  try {
    const { data } = await api.get("slider.php", { params });

    return data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error;
  }
};
