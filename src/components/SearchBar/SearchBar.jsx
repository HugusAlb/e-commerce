import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/useDebounce'
import './SearchBar.css'

function SearchBar({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value)
  const debouncedValue = useDebounce(localValue, 400)

  useEffect(() => {
    onChange(debouncedValue)
  }, [debouncedValue, onChange])

  return (
    <input
      className="search-input"
      type="text"
      placeholder="Buscar produto..."
      value={localValue}
      onChange={e => setLocalValue(e.target.value)}
    />
  )
}

export default SearchBar
