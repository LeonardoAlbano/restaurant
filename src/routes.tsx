import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layout/app'
import { Menu } from './pages/menu'
import { Reservations } from './pages/reservations'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/', element: <Menu /> }],
  },

  {
    path: '/',
    element: <AppLayout />,
    children: [{ path: '/reservations', element: <Reservations /> }],
  },
])
