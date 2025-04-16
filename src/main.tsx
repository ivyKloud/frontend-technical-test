import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from './config/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { AuthenticationProvider, useAuthentication } from './contexts/AuthContext'
import { MemeProvider } from './contexts/MemeContext'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: { authState: { isAuthenticated: false } },
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

function InnerApp() {
  const { state } = useAuthentication()
  return <RouterProvider router={router} context={{ authState: state }} />
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthenticationProvider>
            <MemeProvider>
              <InnerApp />
            </MemeProvider>
          </AuthenticationProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
