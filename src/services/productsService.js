const API_URL = 'https://fakestoreapi.com/products'

export async function fetchProducts(limit) {
  const url = limit ? `${API_URL}?limit=${limit}` : API_URL
  const res = await fetch(url)
  if (!res.ok) throw new Error('Falha ao conectar com a API')
  return res.json()
}
