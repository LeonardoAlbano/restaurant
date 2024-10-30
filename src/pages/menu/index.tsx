/* eslint-disable jsx-a11y/alt-text */
import { useQuery } from '@tanstack/react-query'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { getMenu, MenuItem } from '@/api/get-menu'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'

import { OrderMenu } from './orders/order-menu'

export function Menu() {
  const { data: menuItems } = useQuery<MenuItem[]>({
    queryKey: ['menu'],
    queryFn: getMenu,
  })

  const [orderItems, setOrderItems] = useState<
    { name: string; price: number; quantity: number }[]
  >([])

  const addItemToOrder = (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (orderItem) => orderItem.name === item.name,
      )
      if (existingItem) {
        return prevItems.map((orderItem) =>
          orderItem.name === item.name
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem,
        )
      }
      return [...prevItems, { name: item.name, price: item.price, quantity: 1 }]
    })
  }

  const removeItemFromOrder = (item: MenuItem) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (orderItem) => orderItem.name === item.name,
      )
      if (!existingItem) return prevItems

      if (existingItem.quantity === 1) {
        return prevItems.filter((orderItem) => orderItem.name !== item.name)
      }

      return prevItems.map((orderItem) =>
        orderItem.name === item.name
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem,
      )
    })
  }

  // Calcular o total de itens no carrinho
  const totalItemsInCart = orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <>
      <Helmet title="Menu" />
      <div className="flex justify-center flex-col space-y-5">
        <div className="flex items-center py-5">
          <div className="md:text-4xl sm:text-3xl text-2xl font-medium">
            Venha conferir nosso cardápio!
          </div>
          <div className="ml-auto">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="relative flex items-center">
                  <ShoppingCart />
                  {totalItemsInCart > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-sm font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                      {totalItemsInCart}
                    </span>
                  )}
                  <span className="ml-2">Lista de pedido</span>
                </Button>
              </DialogTrigger>
              <OrderMenu orderItems={orderItems} />
            </Dialog>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="https://img.freepik.com/fotos-premium/chef-cozinhando-no-ambiente-movimentado-de-uma-cozinha-de-restaurante_960080-10757.jpg"
            alt="Chef cozinhando"
            className="w-full h-auto max-h-[400px] object-cover"
          />
        </div>

        <div className="grid gap-8 px-6 py-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {menuItems?.map((menu) => (
            <Card
              key={menu.id}
              className="border-2 border-orange-600 drop-shadow-md space-y-20"
            >
              <CardHeader className="space-y-5">
                <img
                  src="https://www.designi.com.br/images/preview/10083364.jpg"
                  className="rounded-lg"
                />
                <CardTitle className="text-2xl md:text-3xl text-orange-600 drop-shadow-sm">
                  {menu.name}
                </CardTitle>
                <CardDescription className="text-orange-900 font-medium bg-yellow-200 rounded-lg mr-auto px-3">
                  {menu.category.name || 'Sem categoria'}
                </CardDescription>
                <CardDescription className="text-md">
                  {menu.description || 'Sem descrição'}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-lg">
                  R${' '}
                  {menu.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <div className="flex items-center justify-center">
                  <Button
                    onClick={() => removeItemFromOrder(menu)}
                    className="px-2 w-7 h-7 rounded-full"
                  >
                    -
                  </Button>
                  <span className="mx-2">
                    {orderItems.find((item) => item.name === menu.name)
                      ?.quantity || 0}
                  </span>
                  <Button
                    onClick={() => addItemToOrder(menu)}
                    className="px-2 w-7 h-7 rounded-full"
                  >
                    +
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
