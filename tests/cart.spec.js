import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '../src/stores/cart'

const product = {
  id: 1,
  name: 'Polo deportivo',
  image: 'polo.jpg',
  price: 50,
  size: 'M',
  quantity: 1
}

describe('cart store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('adds a product and calculates quantity and total', () => {
    const store = useCartStore()

    store.addCart(product)

    expect(store.cart).toHaveLength(1)
    expect(store.count).toBe(1)
    expect(store.total).toBe(50)
  })

  it('increments an existing product by its key', () => {
    const store = useCartStore()

    store.addCart(product)
    store.increaseQty('1-M')

    expect(store.count).toBe(2)
    expect(store.total).toBe(100)
  })

  it('removes a product when quantity reaches zero', () => {
    const store = useCartStore()

    store.addCart(product)
    store.decreaseQty('1-M')

    expect(store.cart).toHaveLength(0)
  })

  it('removes a product explicitly', () => {
    const store = useCartStore()

    store.addCart(product)
    store.removeProduct('1-M')

    expect(store.cart).toHaveLength(0)
  })
})
