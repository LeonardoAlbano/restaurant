import { api } from '@/lib/axios'

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: {
    id: string
    name: 'entradas' | 'pratosPrincipais' | 'sobremesas' | 'bebidas'
  }
}

export async function getMenu() {
  const response = await api.get('/menu')

  return response.data
}
