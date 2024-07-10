# LazyMasonry

<!-- [![License](http://img.shields.io/:license-Apache%202-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.txt)
[![Slack](https://img.shields.io/badge/Slack-Join%20our%20community-brightgreen?style=flat&logo=slack)](https://join.slack.com/t/querybook/shared_invite/zt-se82lvld-yyzRIqvIASsyYozk7jMCYQ)
-->

Optimiza la carga de imágenes con técnicas avanzadas y gestión eficiente del estado, integrando bibliotecas populares y configuraciones personalizadas para el consumo de APIs.

# Características

- 📷 Carga diferida **lazy loading**: Mejora el rendimiento cargando solo imágenes en la vista.
- 🏗️ Diseño de **masonry layout**: Presenta múltiples imágenes de manera atractiva y organizada.
- 🖥️ Diseño **responsive**: El sitio web funciona correctamente en dispositivos de cualquier tamaño.
- 🔁 Desplazamiento infinito **infinite scrolling**: Permite cargar más contenido automáticamente.
- 🔄 Manejo del estado global: Usando Zustand, facilita la actualización y acceso a valores de búsqueda.
- 🖇️ Personalización de UI: Con Tailwind CSS, permite ajustes estilísticos específicos.
- 🛠️ Solicitudes HTTP a la **API** de Unsplash: Configura Axios para buscar imágenes.

# Inicio del Proyecto

## Requisito previo

- Tener configurado un entorno con `Node.js` para instalar las dependencias necesarias.

> [!TIP]
> Bun es una alternativa moderna y eficiente a npm y yarn para la gestión de paquetes en proyectos javascript.
>
> ```shell
>   curl -fsSL https://bun.sh/install | bash
> ```

## Instalación

- Abre tu terminal o línea de comandos.
- Navega hasta el directorio donde se encuentra el proyecto.
- Ejecuta el siguiente comando para instalar las dependencias.

```shell
  bun install
```

> Si estás utilizando herramientas de gestión de paquetes como `yarn` o `npm` sustituirlo por `bun`.

## Configuration

> [!IMPORTANT]
> Tener en cuenta que se utiliza la configuración específica de `Bun`.
> Si estás utilizando herramientas de gestión de paquetes como `yarn` o `npm`, deberás ajustar la configuración en tu archivo `package.json` para asegurarte de que el proyecto funcione correctamente.

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext js,jsx,ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
```

### Run

- En el directorio donde se encuentra el proyecto ejecuta el siguiente comando para levantarlo.

```shell
  bun dev
```

> Si estás utilizando herramientas de gestión de paquetes como `yarn` o `npm` sustituirlo por `bun`.

#### Principales dependencias utilizadas.

- [Bun](https://bun.sh/docs/cli/install).
- [React-Vite](https://es.vitejs.dev/guide/).
- [TypeScript](https://es.vitejs.dev/guide/).
- [TailwindCSS](https://tailwindcss.com/docs/installation).
- [Axios](https://www.npmjs.com/package/axios).
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction).
- [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query).
- [@types/react-lazy-load-image-component](https://www.npmjs.com/package/@types/react-lazy-load-image-component).
- [react-masonry-css](https://www.npmjs.com/package/react-masonry-css).
- [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component).
- [react-icons](https://react-icons.github.io/react-icons/).
