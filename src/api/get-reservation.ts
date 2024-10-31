import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
  orderId?: string | null
  customerName?: string | null
}

interface GetReservationReponse {
  reservations: {
    id: string
    customerName: string
    numPeople: number
    reservationDate: string
    reservationTime: string
    createdAt: Date
  }[]
}

export async function getReservation({
  orderId,
  customerName,
}: GetOrdersQuery) {
  const response = await api.get<GetReservationReponse>('/reservations', {
    params: {
      orderId,
      customerName,
    },
  })

  return response.data
}
