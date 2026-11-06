# Jurassic Archive

Catálogo de las especies de dinosaurios de la saga **Jurassic Park / Jurassic World**, construido con React. Los datos e ilustraciones se sirven desde **Google Sheets** mediante **Google Apps Script**.

🔗 **Demo:** [leofadev.github.io/JurassicApp](https://leofadev.github.io/JurassicApp/)

## Funciones

- **Catálogo por especie:** agrupa las 93 apariciones de la hoja en 40 especies
- **Búsqueda** por nombre o especie
- **Filtros** por película y por tipo (terrestre, volador, acuático) y **orden** por nombre, número de apariciones o primera aparición
- **Ficha de detalle** con galería de ilustraciones por película y línea de tiempo de la saga (1993–2022)
- **Favoritos** guardados en el navegador
- Los filtros se guardan en la URL, así una búsqueda se puede compartir
- **Animaciones** con [anime.js](https://animejs.com/): huellas de carga, tarjetas que "emergen del ámbar" y transiciones de la ficha
- Diseño responsive y accesible (diálogo nativo, foco visible, respeta *reducir movimiento*)

## Tecnologías

React 18 · Vite · anime.js 4 · CSS propio · Google Sheets + Apps Script

## Estructura

```
src/
├── api/          # Lectura de la hoja publicada con Apps Script
├── components/   # Header, Filters, DinoGrid/Card, DinoModal, Loader...
├── hooks/        # useDinosaurs, useFavorites, useUrlFilters, useDebounce
└── lib/          # Películas de la saga, agrupación y filtrado de especies
```

## Ejecutar en local

```bash
npm install
npm run dev
```

Cada push a `main` se publica automáticamente en GitHub Pages.
