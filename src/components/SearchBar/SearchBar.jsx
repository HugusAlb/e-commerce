import './SearchBar.css'

function SearchBar({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Buscar produto..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

export default SearchBar
