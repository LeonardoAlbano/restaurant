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
export async function getMenu(): Promise<MenuItem[]> {
  const response = await api.get<MenuItem[]>('/menu') // A API retorna um array direto
  return response.data
}
