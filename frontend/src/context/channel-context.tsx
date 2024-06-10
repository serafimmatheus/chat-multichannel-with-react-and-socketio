import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export interface IMessage {
  userName: string
  message: string
}

export interface IChannel {
  id: string
  name: string
  messages: IMessage[]
}

interface ChannelContextType {
  channels: IChannel[]
  channel: IChannel | undefined
  userName: string

  createMessage: (message: string) => void
  createChannel: (name: string) => void
  login: (userName: string) => void
  joinChannel: (channelId: string) => void
}

export const ChannelContext = createContext<ChannelContextType>(
  {} as ChannelContextType
)

export const ChannelProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState('')
  const [channels, setChannels] = useState<IChannel[]>([])
  const [channel, setChannel] = useState<IChannel>()
  const socket = useRef<Socket>()

  const login = (userName: string) => {
    socket.current?.emit('user:login', userName)
    setUserName(userName)
  }

  const createChannel = (name: string) => {
    socket.current?.emit('channel:create', name)
  }

  const joinChannel = (channelId: string) => {
    socket.current?.emit('channel:join', channelId)
  }

  const createMessage = (message: string) => {
    socket.current?.emit('message:create', {
      message,
      channelId: channel?.id,
      userName,
    })
  }

  useEffect(() => {
    socket.current = io('http://localhost:3333')

    socket.current.on('channels:get', (channels: IChannel[]) => {
      setChannels(channels)
    })

    socket.current.on('channel:get', (channel: IChannel) => {
      setChannel(channel)
    })
  }, [])

  return (
    <ChannelContext.Provider
      value={{
        userName,
        channel,
        channels,
        login,
        createChannel,
        createMessage,
        joinChannel,
      }}
    >
      {children}
    </ChannelContext.Provider>
  )
}
