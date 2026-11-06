# Países

Buscador de países por **nombre**, **capital** o **región**, con población, superficie, densidad, idiomas, moneda y países limítrofes.

**Demo:** https://leandrocarlino.github.io/paisesApp/

Reescrito en **Angular 22** con standalone components y signals. Los datos viajan en un JSON local, así que **no depende de ninguna API externa ni de una API key**.

## Por qué

La versión original (Angular 13, 2022) consultaba `restcountries.com/v3.1`, que **fue apagada**: la API responde `"This API version has been deprecated"` y la v5 exige registrarse y una API key que, en una app de navegador, queda expuesta. Hoy la app original no muestra ningún país.

## Qué cambió

| | Antes | Ahora |
|---|---|---|
| Framework | Angular 13 (sin soporte) | **Angular 22** (standalone + signals) |
| Datos | API v3.1 caída | **JSON local de 70 KB** + banderas de flagcdn |
| Arquitectura | 3 páginas casi idénticas + `suggestion()` vacío | una página de búsqueda con `data.modo` y un detalle |
| Estado | `subscribe` anidados sin desuscribir | `httpResource` + `computed` |
| Búsqueda | solo con `Enter` | inmediata, **sin acentos** y también en inglés |
| Rendimiento | todo en un bundle | **lazy loading** por ruta (3 y 2 KB) |
| Tests | specs por defecto sin valor | **11 tests** de filtrado y shell |

## Características

- **Búsqueda tolerante**: `aleman` encuentra Alemania y `germany` también.
- **Filtro por región** con contador en vivo y `aria-pressed`.
- **Ficha de país**: nombre oficial, capital, población (Banco Mundial, último año), superficie, densidad calculada, idiomas y monedas traducidos con `Intl.DisplayNames`, dominio y países limítrofes navegables.
- **Accesibilidad**: skip link, `aria-current`, `aria-pressed`, `role="status"`, foco visible, contraste y `<table>` con `caption` y `scope`.
- **Responsive**: en móvil la tabla se convierte en tarjetas.
- **Modo oscuro** automático.
- **SEO**: título por ruta con el router de Angular.

## Datos

- Países, capitales, regiones, idiomas, monedas, área y límites: [mledoze/countries](https://github.com/mledoze/countries) (ODbL), el mismo origen que usaba restcountries.
- Población: [Banco Mundial](https://data.worldbank.org/), indicador `SP.POP.TOTL`, último año disponible (2024).
- Banderas: [flagcdn.com](https://flagcdn.com) (sin key).

El JSON recortado vive en `public/data/paises.json`: **250 países y territorios, 70 KB**.

## Estructura

```
src/app/
├── app.ts · app.html · app.css        # shell: cabecera, router-outlet, pie
├── app.config.ts                      # router con input binding + HttpClient
├── app.routes.ts                      # 4 rutas con lazy loading
├── core/
│   ├── pais.ts                        # modelo, regiones y helpers puros
│   ├── pais.spec.ts                   # 9 tests de filtrado
│   └── paises.service.ts              # httpResource + señales
└── pages/
    ├── buscar/                        # nombre · capital · región
    └── detalle/                       # ficha del país
```

## Correrlo

```bash
npm install
npm start        # http://localhost:4200
npm test         # 11 tests con Vitest
npm run build
```

## Deploy

El workflow `.github/workflows/deploy.yml` compila con `--base-href /paisesApp/` y publica en GitHub Pages en cada push a `main`.
