import axios from 'axios'

export const API_BASE_URL = 'https://josetello.com/cart'

const api = axios.create({
  baseURL: `${API_BASE_URL}/`,
  timeout: 8000
})

api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'No fue posible cargar la información'
    return Promise.reject(new Error(message))
  }
)

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

export const getAssetUrl = path => {
  if (!path) return ''
  return `${API_BASE_URL}/${path}`
}
