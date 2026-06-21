import ProductCard from '../ProductCard/ProductCard'
import './ProductList.css'

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p>Nenhum produto encontrado.</p>
      </div>
    )
  }

  return (
    <section className="product-list">
      <p className="result-count">{products.length} produto(s) encontrado(s)</p>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ProductList
