import { describe, expect, it } from 'vitest'
import { filterAndSortProducts } from '../src/utils/catalogFilters'

const products = [
  { nombre: 'Polo azul', precio: 50 },
  { nombre: 'Pantalón negro', precio: 120 },
  { nombre: 'Zapatilla blanca', precio: 200 }
]

describe('catalog filters', () => {
  it('filters products by name', () => {
    const result = filterAndSortProducts(products, { search: 'azul' })

    expect(result).toEqual([{ nombre: 'Polo azul', precio: 50 }])
  })

  it('filters products by price range', () => {
    const result = filterAndSortProducts(products, { minPrice: 100, maxPrice: 150 })

    expect(result).toEqual([{ nombre: 'Pantalón negro', precio: 120 }])
  })

  it('sorts products by ascending price', () => {
    const result = filterAndSortProducts(products, { sort: 'price-asc' })

    expect(result.map(product => product.precio)).toEqual([50, 120, 200])
  })

  it('sorts products by descending price', () => {
    const result = filterAndSortProducts(products, { sort: 'price-desc' })

    expect(result.map(product => product.precio)).toEqual([200, 120, 50])
  })
})
