import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import store from './redux/store.js'

const queryClient = new QueryClient();

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <Provider store={ store }>
    <QueryClientProvider client={ queryClient }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Provider>
)
