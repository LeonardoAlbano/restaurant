import { useMutation, useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { getReservation } from '@/api/get-reservation'
import { registerReservation } from '@/api/register-reservation'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { OrderTableFilter } from './orders/order-table-filters'
import { OrderTableRow } from './orders/order-table-row'

const orderForm = z.object({
  customerName: z.string(),
  numPeople: z.number(),
  reservationDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Data inválida',
  }),
  reservationTime: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Hora inválida',
  }),
})

type OrderForm = z.infer<typeof orderForm>

export function Reservations() {
  const [searchParams] = useSearchParams()

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get('page') ?? '1')

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OrderForm>()

  const { mutateAsync: registerReservationFn } = useMutation({
    mutationFn: registerReservation,
  })

  async function handleOrder(data: OrderForm) {
    console.log(data)
    try {
      await registerReservationFn({
        customerName: data.customerName,
        numPeople: data.numPeople,
        reservationDate: data.reservationDate,
        reservationTime: data.reservationTime,
      })

      toast.success('Reserva Realizada!')
    } catch {
      toast.error('Erro ao registrar a reserva.')
    }
  }

  const { data: result } = useQuery({
    queryKey: ['orders'],
    queryFn: () =>
      getReservation({
        pageIndex,
      }),
  })

  return (
    <>
      <Helmet title="Reservations" />

      <div className="flex flex-col gap-8">
        <div className="flex">
          <h1 className="text-3xl font-bold tracking-tight">
            Reservas e pedidos
          </h1>
          <div className=" ml-auto ">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  <Plus className="h-8 w-8" /> Reserva mesa
                  <span className="sr-only">Detalher do pedido</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle className="text-2xl py-2">
                  Cadastro de mesas e pedidos
                </DialogTitle>
                <DialogDescription> escolhe sua reserva! </DialogDescription>
                <form
                  onSubmit={handleSubmit(handleOrder)}
                  className="space-y-7"
                >
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="ml-0.5">
                      Nome do cliente
                    </Label>
                    <Input
                      id="customerName"
                      type="text"
                      {...register('customerName')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numPeople" className="ml-0.51">
                      Número de pessoas
                    </Label>
                    <Input
                      id="numPeople"
                      type="number"
                      {...register('numPeople')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reservationDate" className="ml-0.51">
                      Data da Reserva
                    </Label>
                    <Input
                      id="reservationDate"
                      type="date"
                      {...register('reservationDate')}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reservationTime" className="ml-0.51">
                      Hora da Reserva
                    </Label>
                    <Input
                      id="reservationTime"
                      type="time"
                      {...register('reservationTime')}
                    />
                  </div>

                  <Button
                    disabled={isSubmitting}
                    className="w-full"
                    type="submit"
                  >
                    Reserva
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="space-y-6">
          <OrderTableFilter />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]"></TableHead>
                  <TableHead className="w-[240px]">ID do pedido</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="w-[164px]"> Data reserva</TableHead>
                  <TableHead className="w-[132px]">Horario</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result?.reservations?.map((reservation) => {
                  return (
                    <OrderTableRow key={reservation.id} order={reservation} />
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}
