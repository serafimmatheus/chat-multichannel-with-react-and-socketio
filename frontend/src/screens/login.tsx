import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useChannel } from '../hooks/use-channel'
import { useNavigate } from 'react-router-dom'

const schemaLogin = z.object({
  name: z.string(),
})

type SchemaLogin = z.infer<typeof schemaLogin>

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useChannel()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaLogin>({
    resolver: zodResolver(schemaLogin),
  })

  const handleLogin = (data: SchemaLogin) => {
    console.log(data)
    login(data.name)
    navigate('/channels')
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <label htmlFor='name'>Nome</label>
        <input
          type='text'
          id='name'
          placeholder='Seu nome'
          {...register('name')}
        />
        {errors.name && <p>{errors.name.message}</p>}

        <button type='submit'>Entrar</button>
      </form>
    </div>
  )
}
