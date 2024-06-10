import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './screens/login'
import { ChatPage } from './screens/chat'
import { ChannelCreatePage } from './screens/channel-create'
import { ChannelListPage } from './screens/channel-list'

export const routes = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/chat/:channelId',
        element: <ChatPage />,
      },
      {
        path: '/channels',
        element: (
          <>
            <ChannelCreatePage />
            <ChannelListPage />
          </>
        ),
      },
    ],
  },
])
