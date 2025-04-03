import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import PokemonList from './components/PokemonList'

// Crea una instancia de QueryClient
const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PokemonList />
      </QueryClientProvider>
    </>
  )
}

export default App
