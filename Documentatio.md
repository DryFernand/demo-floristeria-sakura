# Documentación del Proyecto - Registro de Cambios

## [2026-08-21] - Inicialización y Configuración del Repositorio Plantilla (web-mvp-template)

### Añadido
- **Archivos Base del Proyecto**: Configuración inicial de Next.js App Router con TypeScript y Tailwind CSS.
- **Dependencias Adicionales**:
  - `motion`: Animaciones fluidas con Framer Motion para vistas y secciones.
  - `lucide-react`: Iconografía vectorizada moderna.
  - `clsx` y `tailwind-merge`: Utilidades para clases dinámicas.
- **Configuración Centralizada (`site.config.json`)**:
  - Parámetros del negocio: `businessName`, `tagline`, `industry`, `phone`, `whatsappMessage`, `currency` ("RD$").
  - Configuración de funciones activables: `features.showQuoter` y `features.showCatalog`.
  - Catálogos de servicios, productos, prueba social (testimonios y ratings) y ubicación geográfica.
- **Tipado TypeScript Estricto**: Definición de interfaces para `SiteConfig`, `ServiceItem`, `ProductItem`, `Testimonial` y `LocationConfig`.
- **Componentes Modulares Preconstruidos (con animaciones Framer Motion)**:
  - `Navbar.tsx`: Barra de navegación fija con efecto glassmorphism, indicador de teléfono y activador del catálogo.
  - `Hero.tsx`: Encabezado principal dinámico con badges animados, CTAs directos a WhatsApp y cotizador.
  - `ServicesGrid.tsx`: Cuadrícula responsiva de servicios con precios formateados en la moneda del negocio (`RD$`).
  - `InteractiveQuoter.tsx`: Cotizador en tiempo real con cálculo interactivo de subtotales, total y exportación a WhatsApp.
  - `CatalogDrawer.tsx`: Drawer deslizable para el catálogo de productos con buscador, filtro de categorías y carrito instantáneo.
  - `SocialProof.tsx`: Sección de valoraciones, contador de reseñas y testimonios.
  - `LocationMap.tsx`: Tarjeta con dirección, mapa interactivo incrustado y botones a Waze y Google Maps.
  - `WhatsAppButton.tsx`: Botón flotante animado con pop-up interactivo y pulse-glow.
  - `Footer.tsx`: Pie de página corporativo responsivo.
- **Verificación Técnica**:
  - `npx tsc --noEmit`: 0 errores de compilación o sintaxis.
  - `npm run build`: Compilación en producción aprobada exitosamente.
- **Configuración de Servidores MCP en Antigravity**:
  - Servidor `filesystem`: Acceso habilitado a `C:\Users\daryf\Documents\PORTAFOLIO`.
  - Servidor `terminal`: Ejecución de comandos del sistema.
  - Servidor `github`: Autenticación para gestión de repositorios remotos.
  - Servidor `fetch`: Peticiones HTTP a APIs externas (Vercel API y Evolution API).
  - Archivos generados: `mcp_config.json` (raíz), `.agents/mcp_config.json` y `C:\Users\daryf\.gemini\antigravity-ide\mcp_config.json`.
- **Regla del Prompt Maestro del Pipeline (Paso 3)**:
  - Definición de funciones multi-agente en `.agents/rules/pipeline_prospector.md` y `pipeline_prospector.md`.
  - Agente Scout: Extracción de datos en Santo Domingo.
  - Agente Developer: Inyección en `site.config.json`.
  - Agente QA & Evaluator: Compilación limpia (`npx tsc` / `npm build`) y formato `RD$`.
  - Agente DevOps: Creación de repo `demo-[slug]` y Vercel Deployment API.
  - Agente de Aprobación: Notificación vía Evolution API a número personal para Human-in-the-Loop.



