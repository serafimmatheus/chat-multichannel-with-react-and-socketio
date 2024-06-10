import { Link } from 'react-router-dom'
import { useChannel } from '../hooks/use-channel'

export function ChannelListPage() {
  const { channels } = useChannel()

  console.log('channels', channels)
  return (
    <div>
      <h1>Channel List</h1>

      <ul>
        {channels.map((channel) => (
          <li key={channel.id}>
            <Link to={`/chat/${channel.id}`}>{channel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
