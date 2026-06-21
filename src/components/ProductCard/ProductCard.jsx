import { useState } from 'react'
import './ProductCard.css'

function ProductCard({ product }) {
  const [imgError, setImgError] = useState(false)

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price)

  return (
    <article className="product-card">
      <div className="card-image-wrapper">
        {imgError ? (
          <div className="img-fallback">Sem imagem</div>
        ) : (
          <img
            src={product.image}
            alt={product.title}
            className="card-image"
            onError={() => setImgError(true)}
          />
        )}
        <span className="card-category">{product.category}</span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <div className="card-footer">
          <span className="card-rating">
            ★ {product.rating?.rate ?? '—'} ({product.rating?.count ?? 0})
          </span>
          <span className="card-price">{formattedPrice}</span>
        </div>
        <button className="add-to-cart">Adicionar ao carrinho</button>
      </div>
    </article>
  )
}

export default ProductCard
