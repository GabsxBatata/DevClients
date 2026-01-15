import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { ArrowLeft, Trash } from 'phosphor-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Details() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  async function handleCustomerById(docId: string) {
    const res = await window.api.getCustomerById(docId)

    return res
  }

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: [`customer_${id}`],
    queryFn: () => (id ? handleCustomerById(id) : undefined)
  })

  const { isPending, mutateAsync: deleteCustomer } = useMutation({
    mutationFn: async (docId: string) => {
      const response = await window.api.deleteCustomerById(docId)
      if (!response?.ok) {
        throw new Error('Erro ao deletar cliente')
      }
      navigate('/')
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast.success('Cliente deletado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao deletar cliente, tente novamente mais tarde')
    }
  })

  return (
    <main className="flex-1 flex flex-col py-12 px-10 gap-8 overflow-auto">
      <Link to={'/'} className="flex items-center gap-2 mb-2">
        <ArrowLeft className="w-6 h-6 text-white" />
        <span>Voltar</span>
      </Link>

      <h1 className=" text-white font-semibold text-xl lg:text-3xl">Detalhes do cliente</h1>

      <section className="flex flex-col gap-6 w-full">
        {!isFetching && data && (
          <article className="w-full relative flex flex-col gap-1 ">
            <section className="bg-gray-800 rounded px-4 py-3">
              <p className="mb-2 font-semibold text-lg">{data.name}</p>
              <p>
                <span className="font-semibold">Email:</span> {data.email}
              </p>
              {data.address && (
                <p>
                  <span className="font-semibold">Endereço:</span> {data.address}
                </p>
              )}
              {data.phone && (
                <p>
                  <span className="font-semibold">Telefone:</span> {data.phone}
                </p>
              )}

              <div className="absolute -top-5 -right-3 z-10">
                <button
                  disabled={isPending}
                  className="bg-red-500 hover:bg-red-600 p-2 rounded-full disabled:cursor-not-allowed disabled:bg-red-400"
                  onClick={() => deleteCustomer(data._id)}
                >
                  <Trash className="text-white h-6 w-6" />
                </button>
              </div>
            </section>
            <section className="bg-gray-800 rounded px-4 py-3">
              <p>
                <span className="font-semibold">Cargo:</span> {data.role}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {data.status ? 'Ativo' : 'Inativo'}
              </p>
            </section>
          </article>
        )}
      </section>
    </main>
  )
}

export { Details }
