# PokéFinder App 🔴⚪

Aplicación móvil creada para la startup ficticia **PokeFinder App**, cuyo objetivo es permitir a los usuarios buscar información de Pokémon en tiempo real, consumiendo la [PokeAPI](https://pokeapi.co/) de forma dinámica y presentando los resultados de manera clara, organizada y responsive.

---

## Instalación y configuración

### Requisitos previos
- Node.js v18 o superior
- npm o yarn
- Expo Go instalado en tu celular (Android o iOS), o un emulador Android/iOS

### Pasos para instalar

1. Clona o descarga el proyecto:
```bash
git clone <url-del-repositorio>
cd PokeFinderApp
```

2. Instala las dependencias del proyecto:
```bash
npm install
```

3. Inicia el proyecto:
```bash
npx expo start
```

4. Escanea el código QR con la app **Expo Go** desde tu celular, presiona `w` para abrirlo en el navegador, o `a` para abrirlo en un emulador Android conectado.

> No se requiere ninguna API Key: la PokeAPI es pública y gratuita.

---

## Estructura del proyecto

```
PokeFinderApp/
├── App.js                     # Punto de entrada y configuración de navegación
├── app.json                   # Configuración de Expo
├── package.json                # Dependencias del proyecto
├── assets/                     # Imágenes utilizadas en la app
│
├── Screens/
│   ├── SearchScreen.js         # Pantalla principal con buscador y resultados
│   └── DetailScreen.js         # Pantalla de detalle de cada Pokémon
│
├── components/
│   ├── SearchBar.js            # Campo de búsqueda con botón limpiar
│   ├── PokemonCard.js          # Tarjeta individual de resultado
│   └── ResultsList.js          # Lista completa de resultados con FlatList
│
├── services/
│   └── pokeApi.js              # Todas las llamadas a la PokeAPI
│
└── styles/
    └── themes.js                # Colores, tipografía y estilos globales
```

---

## Librerías utilizadas

| Librería | Para qué se usa |
|---|---|
| react-native | Framework base de la app móvil |
| expo | Herramienta para correr y compilar la app |
| @react-navigation/native | Contenedor principal de navegación |
| @react-navigation/native-stack | Navegación tipo stack entre pantallas, con presentación modal |
| react-native-screens | Optimización de pantallas nativas |
| react-native-safe-area-context | Manejo del área segura del dispositivo (notch, barra de estado) |
| @expo-google-fonts/press-start-2p | Tipografía pixel art para el diseño Pokédex |
| @expo/vector-icons | Íconos de la interfaz (lupa, limpiar, volver) |

---

## API utilizada

**PokeAPI** — Pokémon API pública
Base URL: `https://pokeapi.co/api/v2`

| Endpoint | Descripción |
|---|---|
| `/pokemon/{nombre-o-id}` | Obtiene los datos completos de un Pokémon específico |
| `/pokemon?limit=1025` | Lista completa de nombres, usada para la búsqueda por coincidencia parcial |
| `/pokemon-species/{id}` | Descripciones del Pokémon en distintos idiomas |
| `/type/{tipo}` | Relaciones de daño entre tipos, usado para calcular debilidades |

No requiere autenticación ni API Key.

---

## Conceptos técnicos implementados

### useState
Maneja todos los estados locales de la app: texto de búsqueda, lista de resultados, estado de carga y mensajes de error.

```js
const [text, onChangeText] = useState('');
const [pokemon, setPokemon] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

### useEffect + Debounce
Detecta cambios en el texto escrito y espera 500ms antes de lanzar la búsqueda, cancelando el temporizador anterior si el usuario sigue escribiendo.

```js
useEffect(() => {
  // ...validaciones de longitud mínima y rango de ID...
  const timer = setTimeout(() => {
    getData();
  }, 500);
  return () => clearTimeout(timer); // cancela si el usuario sigue escribiendo
}, [text]);
```

### fetch + async/await + manejo de errores diferenciado
Todas las llamadas a la API usan `fetch` con `async/await` dentro de bloques `try/catch`, diferenciando entre Pokémon no encontrado (404), error del servidor, y falta de conexión a internet.

```js
try {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreOId}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("No se encontraron Pokémon");
    throw new Error("Error del servidor, inténtelo más tarde");
  }
  const data = await res.json();
  return [data];
} catch (error) {
  if (error.message.includes("fetch")) {
    throw new Error("Sin conexión a internet. Verifica tu red");
  }
  throw error;
}
```

### Búsqueda por nombre parcial con Promise.all
Cuando el usuario escribe un nombre, se filtra la lista completa de Pokémon y se piden los detalles de los primeros 10 resultados en paralelo.

```js
const filtrados = lista.results.filter(
  p => p.name.includes(nombreOId.trim().toLowerCase())
);
const detalles = await Promise.all(
  filtrados.slice(0, 10).map(async (p) => {
    const res = await fetch(p.url);
    return res.json();
  })
);
```

### Navegación con Native Stack Navigator
Gestiona la navegación entre pantallas, presentando el detalle como una ventana modal, y el paso de datos mediante `route.params`.

```js
navigation.navigate('Detail', { pokemon: pokemon }); // envía datos
const { pokemon } = route.params;                     // recibe datos
```

---

## Requerimientos funcionales implementados

- [x] Campo de texto para búsqueda
- [x] Búsqueda con mínimo 3 caracteres (o ID numérico válido)
- [x] Consulta dinámica a la PokeAPI
- [x] Resultados en lista con nombre, imagen, tipo y número (FlatList)
- [x] Indicador de carga
- [x] Mensaje "No se encontraron Pokémon"
- [x] Manejo diferenciado de errores de red y de la API
- [x] Botón para limpiar la búsqueda
- [x] Actualización automática de resultados mientras se escribe
- [x] Navegación a pantalla de detalle

## Requerimientos no funcionales implementados

- [x] Debounce para evitar peticiones innecesarias
- [x] Interfaz intuitiva y responsive
- [x] Código modular y organizado por responsabilidad
- [x] Manejo adecuado de fallos de conexión
- [x] Componentes reutilizables (SearchBar, PokemonCard, ResultsList)
- [x] Funciona correctamente en Expo

## Extras implementados

- [x] Diseño completo con StyleSheet, inspirado en una Pokédex
- [x] Tipografía pixel art (Press Start 2P)
- [x] Búsqueda por coincidencia parcial de nombre (no solo exacta)
- [x] Habilidades y estadísticas base con barras de progreso
- [x] Debilidades calculadas dinámicamente según el tipo
- [x] Colores de la pantalla de detalle adaptados al tipo del Pokémon
- [x] Descripción del Pokémon en español

---

## Desarrollado con

- React Native + Expo
- PokeAPI
- React Navigation

## Autor

Juan José Medina Orozco
