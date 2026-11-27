export const CART_STORAGE_KEY = 'cart'

export const loadCart = (normalizeItem = item => item) => {
  try {
    const storedCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY))

    if (!Array.isArray(storedCart)) return []

    return storedCart
      .filter(item => item?.id && item?.size)
      .map(normalizeItem)
      .filter(Boolean)
  } catch {
    localStorage.removeItem(CART_STORAGE_KEY)
    return []
  }
}

export const saveCart = cart => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
}

export const clearCartStorage = () => {
  localStorage.removeItem(CART_STORAGE_KEY)
}
