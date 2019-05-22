module.exports = {
  publicPath: process.env.NODE_ENV === 'GH_PAGES'
    ? '/carrito-compras/'
    : '/'
}