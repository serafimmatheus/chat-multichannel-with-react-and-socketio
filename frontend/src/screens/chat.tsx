import { Link, useNavigate, useParams } from 'react-router-dom'
import { useChannel } from '../hooks/use-channel'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schemaMessage = z.object({
  message: z.string(),
})

type SchemaMessage = z.infer<typeof schemaMessage>

export function ChatPage() {
  const { channelId } = useParams<{ channelId: string }>()
  const navigate = useNavigate()
  const { channel, joinChannel, createMessage, userName } = useChannel()
  const { register, handleSubmit, reset } = useForm<SchemaMessage>({
    resolver: zodResolver(schemaMessage),
  })
  const divRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current?.scrollHeight
    }
  }

  const handleMessage = (data: SchemaMessage) => {
    createMessage(data.message)
    reset()
  }

  useEffect(() => {
    scrollToBottom()
  }, [channel?.messages])

  useEffect(() => {
    if (!channelId) {
      navigate('/channels')
      return
    }

    if (!userName) {
      navigate('/')
      return
    }

    joinChannel(channelId)
  }, [])
  return (
    <div>
      <div>
        <h1>Chat: {channel?.name}</h1>

        <Link to={'/channels'}>Voltar</Link>
      </div>

      <div
        ref={divRef}
        style={{
          maxHeight: '300px',
          minHeight: '300px',
          overflowY: 'auto',
        }}
      >
        {channel?.messages.map((message) => (
          <div key={message.userName}>
            <span>
              {message.userName}: {message.message}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(handleMessage)}>
        <input type='text' placeholder='Mensagem' {...register('message')} />
        <button type='submit'>Enviar</button>
      </form>
    </div>
  )
}
