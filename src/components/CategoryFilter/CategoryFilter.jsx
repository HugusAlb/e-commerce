import './CategoryFilter.css'

function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select
      className="category-select"
      value={selected}
      onChange={e => onChange(e.target.value)}
    >
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat === 'all' ? 'Todas as categorias' : cat}
        </option>
      ))}
    </select>
  )
}

export default CategoryFilter
