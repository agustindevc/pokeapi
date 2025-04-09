import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import PokemonList from './components/PokemonList'
import Logo from './components/Logo';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Logo />
      <PokemonList />
    </QueryClientProvider>
  )
}

export default App
