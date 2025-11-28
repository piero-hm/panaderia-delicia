# Delicia Panadería 🥐✨
Link: https://panaderia-delicia-sigma.vercel.app

¡Bienvenido al repositorio de **Delicia Panadería**! Este proyecto simula una panadería y repostería online, diseñado para ofrecer una experiencia de usuario intuitiva y deliciosa. Explora una variedad de productos artesanales, gestiona tu carrito de compras y disfruta de una navegación personalizada.

## Características Destacadas 🍰

*   **Amplio Catálogo de Productos**: Descubre panes artesanales, pasteles exquisitos y postres irresistibles, cada uno con descripciones detalladas.
*   **Carrito de Compras Interactivo**: Añade y gestiona tus productos favoritos con facilidad antes de finalizar tu pedido.
*   **Experiencia de Usuario Personalizada**: Regístrate e inicia sesión para acceder a funcionalidades exclusivas y una navegación adaptada.
*   **Secciones Informativas**: Conoce nuestra historia y valores en "Nosotros", y contáctanos a través de la página de "Contacto", que incluye nuestra ubicación.
*   **Diseño Responsivo**: Disfruta de una experiencia visual óptima en cualquier dispositivo, desde móviles hasta ordenadores de escritorio.
*   **Integración con Base de Datos**: Gestión robusta de productos, usuarios y pedidos, respaldada por una base de datos moderna.

## Estructura del Proyecto 📁

Aquí te presentamos la organización de los archivos y directorios principales del proyecto:

```
.
├── app/
│   ├── actions/
│   ├── auth/
│   ├── carrito/
│   ├── contacto/
│   ├── context/
│   ├── nosotros/
│   ├── productos/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── layout/
│   ├── products/
│   ├── shared/
│   └── ui/
├── lib/
│   ├── data.ts
│   ├── queries.ts
│   └── supabaseClient.ts
├── public/
│   └── images/
├── types/
│   └── index.ts
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tsconfig.json
└── ...
```

## Tecnologías Utilizadas 🛠️

Este proyecto ha sido construido con un stack de tecnologías modernas y eficientes:

*   **Next.js (con React)**: Framework de React para construir aplicaciones web rápidas y escalables, con renderizado del lado del servidor y generación de sitios estáticos.
*   **TypeScript**: Añade tipado estático para un código más robusto, mantenible y con menos errores.
*   **Tailwind CSS**: Un framework CSS utility-first para un diseño rápido y altamente personalizable.
*   **Supabase**: Plataforma de código abierto que proporciona una base de datos PostgreSQL, autenticación y almacenamiento, facilitando el desarrollo backend.
*   **React Context API**: Para una gestión de estado global eficiente y limpia, ideal para el carrito de compras y la sesión de usuario.
*   **Swiper**: Biblioteca moderna para crear carruseles y sliders táctiles y responsivos.
*   **React Toastify**: Para notificaciones de usuario atractivas y personalizables.

## Guía de Inicio Rápido 🚀

Sigue estos pasos para tener Delicia Panadería funcionando en tu entorno local.

### Prerrequisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/es/) (versión 18 o superior) y tu gestor de paquetes preferido (npm, yarn, pnpm o bun).

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/piero-hm/delicia-panaderia.git 
    cd delicia-panaderia

    ```
2.  Instala las dependencias del proyecto:
    ```bash
    npm install
    # o
    yarn install
    # o
    pnpm install
    # o
    bun install
    ```

### Configuración de Variables de Entorno 🔑

Crea un archivo `.env.local` en la raíz de tu proyecto y añade las siguientes variables, reemplazando los valores con tus credenciales de Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### Ejecución en Modo Desarrollo

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre tu navegador y visita [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

## ¿Cómo Contribuir? 🙌

¡Tus contribuciones son bienvenidas! Si tienes ideas para mejorar el proyecto o encuentras algún error, por favor, sigue estos pasos:

1.  Haz un "fork" de este repositorio.
2.  Crea una nueva rama para tus cambios: `git checkout -b feature/nombre-de-tu-caracteristica`
3.  Realiza tus modificaciones y haz un commit descriptivo: `git commit -am 'feat: Añadir nueva característica X'`
4.  Sube tus cambios a tu repositorio "forkeado": `git push origin feature/nombre-de-tu-caracteristica`
5.  Abre un Pull Request detallando tus cambios.


