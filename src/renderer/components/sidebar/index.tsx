import { Trigger, Content } from '@radix-ui/react-collapsible'
import { ArrowBendDoubleUpLeft } from 'phosphor-react'
import clsx from 'clsx'
import { LinkContent } from '../link'

function Sidebar() {
  const isMacOS = process.platform === 'darwin'
  return (
    <Content className="bg-gray-950 flex-shrink-0 border-r border-slate-600 h-screen relative group overflow-hidden data-[state=open]:animate-slideIn data-[state=closed]:animate-slideOut">
      <div
        className={clsx('region-drag h-14 z-0 mt-10', {
          block: isMacOS,
          hidden: !isMacOS
        })}
      />

      <div
        className={clsx(
          'flex-1 flex flex-col h-full gap-8 w-[220px] transition-opacity group-data-[state=open]:opacity-100 group-data-[state=closed]:opacity-0 duration-200',
          {
            'pt-6': !isMacOS
          }
        )}
      >
        <nav className="flex mx-2 flex-col gap-8 text-slate-100">
          <div className="flex flex-col gap-2">
            <div className="text-white font-semibold uppercase mb-2 ml-2">MENU</div>
          </div>
          <section className="flex flex-col gap-px">
            <LinkContent to="/" title="Clientes" />
            <LinkContent to="/create" title="Cadastrar cliente" />
            <LinkContent to="/about" title="Sobre" />
          </section>
        </nav>
      </div>
    </Content>
  )
}

export { Sidebar }
