import SearchBar from '../SearchBar/SearchBar'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import './Header.css'

function Header({ search, onSearch, categories, selectedCategory, onCategoryChange }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">🛍</span>
          <span className="logo-text">ShopReact</span>
        </div>
        <div className="controls">
          <SearchBar value={search} onChange={onSearch} />
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onChange={onCategoryChange}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
