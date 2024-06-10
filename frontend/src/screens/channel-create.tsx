import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useChannel } from '../hooks/use-channel'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const schemaChannelCreate = z.object({
  nameChannel: z.string(),
})

type SchemaChannelCreate = z.infer<typeof schemaChannelCreate>

export function ChannelCreatePage() {
  const navigate = useNavigate()
  const { createChannel, userName } = useChannel()
  const { handleSubmit, register } = useForm<SchemaChannelCreate>({
    resolver: zodResolver(schemaChannelCreate),
  })

  const handleCreateChannel = (data: SchemaChannelCreate) => {
    console.log(data)
    createChannel(data.nameChannel)
  }

  useEffect(() => {
    if (!userName) {
      navigate('/')
      return
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateChannel)}>
        <label htmlFor='nameChannel'>Digite o nome do canal</label>
        <input
          id='nameChannel'
          type='text'
          placeholder='Nome do canal'
          {...register('nameChannel')}
        />
        <button type='submit'>Create Channel</button>
      </form>
    </div>
  )
}
