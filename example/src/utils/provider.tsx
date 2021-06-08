import * as React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60, // 1 hour,
      retry: 3, // Do 3 retries until failed
    },
  },
})

const Provider: React.FC = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>

export default Provider
