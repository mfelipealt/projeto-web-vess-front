import { ChakraProvider } from '@chakra-ui/react'
import './index.scss'
import { defaultSystem } from "@chakra-ui/react"
import { BaseRoutes } from './routes/BaseRoutes'
import { UserConfigProvider } from './contexts/UserConfigContext'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <>
      <UserConfigProvider>
        <ChakraProvider value={defaultSystem}>
          <BaseRoutes />
          <Toaster />
        </ChakraProvider>
      </UserConfigProvider>
    </>
  )
}

export default App