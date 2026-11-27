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

  it('rejects a product without a size', () => {
    const store = useCartStore()

    const wasAdded = store.addCart({ ...product, size: '' })

    expect(wasAdded).toBe(false)
    expect(store.cart).toHaveLength(0)
  })

  it('normalizes quantities outside the allowed range', () => {
    const store = useCartStore()

    store.addCart({ ...product, quantity: 99 })

    expect(store.cart[0].quantity).toBe(10)
  })

  it('does not exceed ten units in an existing line', () => {
    const store = useCartStore()

    store.addCart({ ...product, quantity: 8 })
    store.addCart({ ...product, quantity: 8 })

    expect(store.cart[0].quantity).toBe(10)
  })

  it('ignores corrupt localStorage data', () => {
    localStorage.setItem('cart', '{invalid json')
    setActivePinia(createPinia())

    const store = useCartStore()

    expect(store.cart).toEqual([])
  })
})
