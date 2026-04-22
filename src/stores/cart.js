import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || []
  }),

  getters: {
    count: state => state.cart.reduce((acc, p) => acc + Number(p.quantity), 0),

    total: state => state.cart.reduce((acc, p) => acc + p.price * p.quantity, 0)
  },

  actions: {
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    addCart(product) {
      const key = `${product.id}-${product.size}`

      const existing = this.cart.find(p => p.key === key)

      if (existing) {
        existing.quantity++
      } else {
        this.cart.push({
          key, // 🔥 clave única
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          size: product.size,
          quantity: product.quantity
        })
      }

      this.saveCart()
    },

    increaseQty(key) {
      const product = this.cart.find(p => p.key === key)
      if (product) product.quantity++

      this.saveCart()
    },

    decreaseQty(key) {
      const product = this.cart.find(p => p.key === key)

      if (product) {
        product.quantity--

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
