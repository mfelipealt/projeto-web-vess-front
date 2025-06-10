import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import './index.scss'
import { HomePage } from './pages/HomePage'
import { ChakraProvider } from '@chakra-ui/react' 
import { defaultSystem } from "@chakra-ui/react"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
    <HomePage />
    </ChakraProvider>

  </React.StrictMode>,
)