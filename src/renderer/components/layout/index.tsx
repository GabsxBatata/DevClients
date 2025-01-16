import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '../header'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Sidebar } from '../sidebar'
import { useState, useEffect } from 'react'

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    function handleNewClient() {
      navigate('/create')
    }

    const unsub = window.api.onNewClient(handleNewClient)

    return () => {
      unsub()
    }
  }, [])

  return (
    <Collapsible.Root
      defaultOpen={true}
      className="h-screen w-screen bg-gray-950 text-slate-100 flex"
      onOpenChange={setIsSidebarOpen}
    >
      <Sidebar />
      <div className="flex-1 flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />
        <Outlet />
      </div>
    </Collapsible.Root>
  )
}

export { Layout }
