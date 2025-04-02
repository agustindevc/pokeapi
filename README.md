# Pokemon App

## Descripción
Pokemon App es una página web con una interfaz estilo Master-Details que muestra una lista de Pokémons en tarjetas. La aplicación cuenta con paginación, mostrando 15 cartas por página. Cada carta incluye una imagen del Pokémon y un botón "Ver detalles" que despliega un popup con información adicional del Pokémon.

La aplicación también cuenta con un buscador, permitiendo ingresar el nombre de un Pokémon y dirigir a la página donde se encuentra, resaltándolo en amarillo.

## Instalación y Ejecución
Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/pokemon-app.git
   cd pokemon-app
   ```
2. Instala las dependencias con npm:
   ```sh
   npm install
   ```
3. Inicia la aplicación en modo desarrollo:
   ```sh
   npm run dev
   ```
4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Dependencias Principales
- [React](https://react.dev/): Biblioteca de JavaScript para construir interfaces de usuario.
- [Chakra UI](https://chakra-ui.com/): Biblioteca de componentes para React.
- [React Router](https://reactrouter.com/) (si se usa para navegación entre páginas).
- [Vite]: Herramienta de construcción rápida para aplicaciones React.

## Características
- Utiliza la [PokeAPI](https://pokeapi.co/) para obtener la información de los Pokémons.
- Paginación de 15 Pokémons por página.
- Popup con detalles del Pokémon.
- Búsqueda por nombre con resalte en la lista.

## Contribución
Si deseas contribuir a este proyecto:
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m "Descripción del cambio"`).
4. Envía un pull request.