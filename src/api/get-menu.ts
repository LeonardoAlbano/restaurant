import { api } from '@/lib/axios'

// Interface dos itens do menu
export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: {
    id: string
    name: string
  }
}

// Função para buscar os itens do menu
export async function getMenu() {
  const response = await api.get('/menu')

  return response.data
}
