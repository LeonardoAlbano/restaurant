import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'

import { getMenu } from '@/api/get-menu'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function Menu() {
  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery<MenuItem[]>({
    queryKey: ['menu'],
    queryFn: getMenu,
  })

  if (isLoading) {
    return <p>Carregando itens do menu...</p>
  }

  if (isError) {
    return <p>Erro ao carregar o menu. Tente novamente mais tarde.</p>
  }

  return (
    <>
      <Helmet title="Menu" />
      <div className="flex justify-center flex-col space-y-5">
        <div className="items-center justify-center border border-red-400">
          Img
        </div>

        <div
          className="grid gap-6 px-4 py-2 border border-red-400 
                        sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {menuItems.map((menu) => (
            <Card key={menu.id}>
              <CardHeader>
                <CardTitle>{menu.name}</CardTitle>
                <CardDescription>
                  {menu.description || 'Sem descrição'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p>R$ {menu.price.toFixed(2)}</p>
                <Button>Comprar</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
