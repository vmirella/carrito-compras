export const filterAndSortProducts = (
  products,
  { search = '', minPrice = null, maxPrice = null, sort = 'default' } = {}
) => {
  const normalizedSearch = search.trim().toLocaleLowerCase('es')

  const filtered = (products || []).filter(product => {
    const name = String(product.nombre || '').toLocaleLowerCase('es')
    const price = Number(product.precio)

    if (normalizedSearch && !name.includes(normalizedSearch)) return false
    if (minPrice !== null && price < Number(minPrice)) return false
    if (maxPrice !== null && price > Number(maxPrice)) return false

    return true
  })

  if (sort === 'price-asc') {
    return [...filtered].sort((a, b) => Number(a.precio) - Number(b.precio))
  }

  if (sort === 'price-desc') {
    return [...filtered].sort((a, b) => Number(b.precio) - Number(a.precio))
  }

  if (sort === 'name-asc') {
    return [...filtered].sort((a, b) =>
      String(a.nombre).localeCompare(String(b.nombre), 'es', { sensitivity: 'base' })
    )
  }

  return filtered
}
