import axios from 'axios'

const api = axios.create({
  baseURL: 'https://josetello.com/cart/',
  timeout: 8000
})

export const getProducts = async params => {
  const { data } = await api.get('products.php', { params })
  return data
}

export const getCategories = async params => {
  const { data } = await api.get('categories.php', { params })
  return data
}

export const getSlider = async params => {
  const { data } = await api.get('slider.php', { params })
  return data
}
