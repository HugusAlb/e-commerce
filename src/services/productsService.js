const API_URL = 'https://fakestoreapi.com/products'

export async function fetchProducts() {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Falha ao conectar com a API')
  return res.json()
}
