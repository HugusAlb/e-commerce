import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'
import Snackbar from './components/Snackbar/Snackbar'
import './App.css'

function App() {
  const { products, loading, error, clearError } = useProducts(10)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', ...new Set(products.map(p => p.category))]

  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="app">
      <Header
        search={search}
        onSearch={setSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <main className="main">
        {loading && (
          <div className="feedback-container">
            <div className="spinner" />
            <p className="feedback-text">Carregando produtos...</p>
          </div>
        )}
        {!loading && <ProductList products={filtered} />}
      </main>

      {error && <Snackbar message={error} onClose={clearError} />}
      <footer className="footer">
        <p>© 2026 ShopReact — Atividade Avaliativa Programação Web II</p>
      </footer>
    </div>
  )
}

export default App
