import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 1827fy2827d6h</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-y-4 divide-y divide-muted-foreground">
          <div className="py-2 text-muted-foreground">Status</div>
          <div className="py-2 flex justify-end">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="font-medium text-muted-foreground">
                Pendente
              </span>
            </div>
          </div>

          {/* Linha 2 */}
          <div className="py-2 text-muted-foreground">Cliente</div>
          <div className="py-2 flex justify-end">Diego Schell Fernandes</div>

          {/* Linha 3 */}
          <div className="py-2 text-muted-foreground">Telefone</div>
          <div className="py-2 flex justify-end">(47) 99999-9999</div>

          {/* Linha 4 */}
          <div className="py-2 text-muted-foreground">E-mail</div>
          <div className="py-2 flex justify-end">diego@rocketseat.com.br</div>

          {/* Linha 5 */}
          <div className="py-2 text-muted-foreground">Realizado há</div>
          <div className="py-2 flex justify-end">há 3 minutos</div>
        </div>

        {/* Segunda seção - Produtos */}
        <div className="grid grid-cols-4 gap-y-4 divide-y divide-muted-foreground border-t pt-1">
          {/* Cabeçalho */}
          <div className="py-2 font-bold">Produto</div>
          <div className="py-2 text-right font-bold">Qtd.</div>
          <div className="py-2 text-right font-bold">Preço</div>
          <div className="py-2 text-right font-bold">Subtotal</div>

          {/* Linha 1 */}
          <div className="py-2">Pizza Pepperoni Família</div>
          <div className="py-2 text-right">2</div>
          <div className="py-2 text-right">R$ 69,90</div>
          <div className="py-2 text-right">R$ 139,80</div>

          {/* Linha 2 */}
          <div className="py-2">Pizza Mussarela Família</div>
          <div className="py-2 text-right">2</div>
          <div className="py-2 text-right">R$ 59,90</div>
          <div className="py-2 text-right">R$ 119,80</div>

          {/* Rodapé */}
          <div className="py-2 col-span-3 font-bold">Total do pedido</div>
          <div className="py-2 text-right font-medium">R$ 259,60</div>
        </div>
      </div>
    </DialogContent>
  )
}
