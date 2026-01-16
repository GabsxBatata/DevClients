import { useQuery } from '@tanstack/react-query'

function About() {
  async function getAllCustomers() {
    const response = await window.api.getVersionApp()
    return response
  }

  const { data } = useQuery({ queryKey: ['version-app'], queryFn: getAllCustomers })

  return (
    <div className="flex flex-col py-12 px-10 gap-8 overflow-auto">
      <h1 className=" text-white font-semibold text-xl lg:text-3xl">Página sobre</h1>

      <p>
        Projeto criado no curso <b>@sujeitoprogramador</b>
      </p>

      <p>Versão atual do projeto {data}</p>
    </div>
  )
}

export { About }
