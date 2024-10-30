import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavlinkProps = LinkProps

export function NavLink(props: NavlinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      {...props}
      data-current={pathname === props.to}
      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-orange-500 data-[current=true]:text-orange-600"
    />
  )
}
