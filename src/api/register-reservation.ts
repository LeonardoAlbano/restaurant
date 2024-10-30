import { api } from '@/lib/axios'

export interface RegisterReservationBody {
  customerName: string
  numPeople: number
  reservationDate: string
  reservationTime: string
}

export async function registerReservation({
  customerName,
  numPeople,
  reservationDate,
  reservationTime,
}: RegisterReservationBody) {
  await api.post('/reservations', {
    customerName,
    numPeople: Number(numPeople),
    reservationDate,
    reservationTime,
  })
}
