import { Controller, useForm } from 'react-hook-form'
import { NewCustomer } from '~/src/shared/types/ipc'
import { Input } from '../components/input'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const defaultValues: NewCustomer = {
  name: '',
  email: '',
  role: '',
  status: true,
  address: '',
  phone: ''
}

function Create() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: NewCustomer) => {
      const response = await window.api.addCustomer(data)
      if (!response?.ok) {
        throw new Error('Erro ao criar cliente')
      }
      navigate('/')
      return response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      reset()
      toast.success('Cliente cadastrado com sucesso!')
    },
    onError: () => {
      toast.error('Erro ao criar cliente, tente novamente mais tarde')
    }
  })
  const { control, handleSubmit, reset } = useForm<NewCustomer>({ defaultValues })

  async function handleAddCustomer(data: NewCustomer) {
    try {
      await createCustomer(data)
    } catch (error) {}
  }

  return (
    <div className="flex-1 flex flex-col py-12 px-10 gap-8 overflow-auto">
      <section className="flex flex-1 flex-col items-center">
        <h1 className=" text-white font-semibold text-xl lg:text-3xl">Cadastrar novo cliente</h1>
        <form
          className="flex flex-col w-full max-w-96 mt-4 gap-4"
          onSubmit={handleSubmit(handleAddCustomer)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Campo necessário' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Nome"
                required
                placeholder="Digite seu nome completo..."
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: 'Campo necessário' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="E-mail"
                required
                placeholder="Digite e-mail completo..."
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Endereço"
                placeholder="Digite o endereço completo..."
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Telefone"
                placeholder="Digite seu telefone completo..."
                error={error?.message}
                {...field}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: 'Campo necessário' }}
            render={({ field, fieldState: { error } }) => (
              <Input
                label="Cargo"
                required
                placeholder="Digite seu cargo..."
                error={error?.message}
                {...field}
              />
            )}
          />

          <button
            disabled={isPending}
            type="submit"
            className={`bg-blue-500 rounded flex items-center justify-center w-full h-12 mt-4 ${
              isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isPending ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
      </section>
    </div>
  )
}

export { Create }
