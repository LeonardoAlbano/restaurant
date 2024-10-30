import { api } from '@/lib/axios'

export interface GetOrdersQuery {
  pageIndex?: number | null
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
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getReservation({ pageIndex }: GetOrdersQuery) {
  const response = await api.get<GetReservationReponse>('/reservations', {
    params: {
      pageIndex,
    },
  })

  return response.data
}
