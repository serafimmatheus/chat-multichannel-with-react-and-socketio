import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { ChannelProvider } from './context/channel-context'

ReactDOM.render(
  <React.StrictMode>
    <ChannelProvider>
      <App />
    </ChannelProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
