import React from 'react'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface OrderMenuProps {
  orderItems: { name: string; price: number; quantity: number }[] // Define a interface para os itens do pedido
}

export function OrderMenu({ orderItems }: OrderMenuProps) {
  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  ) // Calcula o total do pedido

  return (
    <DialogContent className="space-y-5">
      <DialogHeader>
        <DialogTitle className="text-3xl">Pedido</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-4 gap-y-4 divide-y divide-muted-foreground">
          <div className="py-2 font-bold">Produto</div>
          <div className="py-2 text-right font-bold">Qtd.</div>
          <div className="py-2 text-right font-bold">Preço</div>
          <div className="py-2 text-right font-bold">Subtotal</div>

          {orderItems.map((item, index) => (
            <React.Fragment key={index}>
              <div className="py-2">{item.name}</div>
              <div className="py-2 text-right">{item.quantity}</div>
              <div className="py-2 text-right">
                R${' '}
                {item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
              <div className="py-2 text-right">
                R${' '}
                {(item.price * item.quantity).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
            </React.Fragment>
          ))}

          {/* Rodapé */}
          <div className="py-2 col-span-3 font-bold">Total do pedido</div>
          <div className="py-2 text-right font-medium">
            R${' '}
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
      </div>
    </DialogContent>
  )
}
