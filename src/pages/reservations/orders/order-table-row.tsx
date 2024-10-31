import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileSliders } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

export interface OrderTableRowProps {
  order: {
    id: string
    customerName: string
    numPeople: number
    reservationDate: string
    reservationTime: string
    createdAt: Date
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const formattedDate = format(new Date(order.reservationDate), 'dd/MM/yyyy', {
    locale: ptBR,
  })
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <FileSliders className="h-3 w-3" />
              <span className="sr-only">Detalher do pedido</span>
            </Button>
          </DialogTrigger>
        </Dialog>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="font-medium text-muted-foreground">{order.id}</span>{' '}
        </div>
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium text-muted-foreground">
        {formattedDate}
      </TableCell>
      <TableCell className="font-medium">{order.reservationTime}</TableCell>
    </TableRow>
  )
}
