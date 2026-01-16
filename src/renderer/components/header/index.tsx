import { Trigger } from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import { CaretRight } from 'phosphor-react'
import { useState } from 'react'

interface IHeaderProps {
  isSidebarOpen: boolean
}

function Header({ isSidebarOpen }: IHeaderProps) {
  const isMacOS = process.platform === 'darwin'
  return (
    <div
      id="header"
      className={clsx(
        'flex items-center gap-4 leading-tight relative border-b border-slate-600 transition-all duration-200 py-[1.125rem] px-6 region-drag',
        {
          'pl-24': !isSidebarOpen && isMacOS,
          'w-screen': !isSidebarOpen,
          'w[calc(100vw-220px)]': isSidebarOpen
        }
      )}
    >
      <Trigger
        className={clsx(
          'h-7 w-7 text-gray-800 bg-gray-100 p-1 rounded-full hover:scale-105 duration-200 relative z[99] top-0 left-0'
        )}
      >
        <CaretRight
          className={clsx('w-5 h-5 hover:scale-105 duration-200 ', {
            'rotate-180': isSidebarOpen
          })}
        />
      </Trigger>

      <>
        <h1 className="text-white font-bold">Dev Clients</h1>
      </>
    </div>
  )
}

export { Header }
