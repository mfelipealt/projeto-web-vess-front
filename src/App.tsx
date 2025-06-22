import { ChakraProvider } from '@chakra-ui/react'
import './index.scss'
import { defaultSystem } from "@chakra-ui/react"
import { BaseRoutes } from './routes/BaseRoutes'
import { UserConfigProvider } from './contexts/UserConfigContext'


function App() {
  return (
    <>
      <UserConfigProvider>
        <ChakraProvider value={defaultSystem}>
          <BaseRoutes />
        </ChakraProvider>
      </UserConfigProvider>
    </>
  )
}

export default App