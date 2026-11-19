# Pokémon Master-Details

A responsive Pokémon browser built with **React** and the public [PokéAPI](https://pokeapi.co/). Browse all 1,025 Pokémon as cards, search by name and open a popup with each Pokémon's details.

**Live demo:** https://agustindevc.github.io/pokeapi/

## Features
- Card grid with pagination (15 Pokémon per page, 63 pages).
- Details popup per Pokémon: species, types, abilities, height, weight and base stats.
- Search by name (prefix match) over the cached list, with a button to clear the search.
- Loading and error handling for failed requests.
- Responsive layout.

## Tech stack
- **React 19** + **Vite**
- **Chakra UI** for components and theming
- **TanStack React Query** for data fetching and caching
- **GitHub Actions** deploying to **GitHub Pages**

## How it works
- `src/services/pokemonService.jsx` wraps the API calls (`fetch`, async/await, error handling) and formats the responses.
- Custom hooks in `src/components/hooks/` expose the data through React Query, so the Pokémon list is fetched once and cached.
- The search filters the cached list, avoiding extra requests.

## Run it locally
```bash
git clone https://github.com/agustindevc/pokeapi.git
cd pokeapi
npm install
echo "VITE_API_URL=https://pokeapi.co/api/v2/pokemon" > .env
npm run dev
```
Then open the local address shown in the terminal (by default http://localhost:5173/pokeapi/).

## Deployment
Every push to `main` triggers `.github/workflows/deploy.yml`, which builds the app and publishes it to GitHub Pages.

## What I learned
- Structuring a React app into components, hooks and a service layer.
- Caching server state with React Query instead of managing it by hand.
- Consuming a REST API with `fetch` and handling loading and error states.
- Setting up a CI/CD pipeline with GitHub Actions.

---

## Español
Aplicación web en React que consume la PokéAPI: tarjetas con paginación (15 por página), popup con los detalles de cada Pokémon y buscador por nombre con opción de limpiar la búsqueda. Hecha con React, Vite, Chakra UI y TanStack React Query, y desplegada automáticamente en GitHub Pages. Demo: https://agustindevc.github.io/pokeapi/
