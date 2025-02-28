import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { AppHttpRequests } from '@/app/AppHttpRequests.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppHttpRequests />
  </Provider>
)
