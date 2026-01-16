import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

interface ILinkContentProps {
  to: string
  title: string
}

function LinkContent({ title, to }: ILinkContentProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        return clsx('flex items-center text-sm gap-2 py-2 px-2 rounded group', {
          'bg-gray-50 font-semibold': isActive,
          'text-black': isActive,
          'text-gray-300': !isActive
        })
      }}
    >
      <h5 className="truncate flex-1 select-none">{title}</h5>
    </NavLink>
  )
}

export { LinkContent }
