import { defineStore } from 'pinia'
import { loadCart, saveCart } from '@/utils/cartStorage'

const MAX_QUANTITY = 10

const normalizeQuantity = quantity => {
  const parsed = Number(quantity)
  if (!Number.isFinite(parsed)) return 1
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(parsed)))
}

const normalizeStoredItem = item => {
  const quantity = normalizeQuantity(item.quantity)
  const price = Number(item.price)

  if (!Number.isFinite(price) || price < 0) return null

  return {
    ...item,
    key: item.key || `${item.id}-${item.size}`,
    quantity,
    price
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: loadCart(normalizeStoredItem)
  }),

  getters: {
    count: state => state.cart.reduce((acc, p) => acc + Number(p.quantity), 0),

    total: state => state.cart.reduce((acc, p) => acc + p.price * p.quantity, 0)
  },

  actions: {
    saveCart() {
      saveCart(this.cart)
    },

    addCart(product) {
      if (!product?.id || !product?.size) return false

      const key = `${product.id}-${product.size}`
      const quantity = normalizeQuantity(product.quantity)
      const existing = this.cart.find(p => p.key === key)

      if (existing) {
        existing.quantity = Math.min(MAX_QUANTITY, existing.quantity + quantity)
      } else {
        this.cart.push({
          key,
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: product.size,
          quantity
        })
      }

      this.saveCart()
      return true
    },

    increaseQty(key) {
      const product = this.cart.find(p => p.key === key)
      if (product) {
        product.quantity = Math.min(MAX_QUANTITY, normalizeQuantity(product.quantity) + 1)
      }

      this.saveCart()
    },

    decreaseQty(key) {
      const product = this.cart.find(p => p.key === key)

      if (product) {
        product.quantity = normalizeQuantity(product.quantity) - 1

        if (product.quantity <= 0) {
          this.removeProduct(key)
        }
      }

      this.saveCart()
    },
    removeProduct(key) {
      this.cart = this.cart.filter(p => p.key !== key)
      this.saveCart()
    }
  }
})
