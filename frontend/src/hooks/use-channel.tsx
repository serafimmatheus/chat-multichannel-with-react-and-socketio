import { useContext } from 'react'
import { ChannelContext } from '../context/channel-context'

export function useChannel() {
  return useContext(ChannelContext)
}
