# 🚀 Prompt para Lovable - Disker Web Platform

## 📋 Descripción del Proyecto

Crea una **plataforma web moderna** llamada **Disker** que conecte **creadores de contenido** (influencers) con **marcas reales** para colaboraciones publicitarias. Es un marketplace donde los talents pueden encontrar y aplicar a campañas de empresas como Nike, Nivea, Adidas, etc.

**Tagline**: *"La plataforma para creadores con marcas reales"*

---

## 🎨 Paleta de Colores Exacta

### Colores Primarios (Grises)
```css
--primary-950: #191919  /* Negro principal - headers, texto importante */
--primary-900: #3D3D3D  /* Gris muy oscuro - texto secundario */
--primary-800: #454545  /* Gris oscuro - borders */
--primary-700: #4F4F4F  /* Gris medio-oscuro */
--primary-600: #5D5D5D  /* Gris medio - texto descriptivo */
--primary-500: #6D6D6D  /* Gris */
--primary-400: #888888  /* Gris claro - placeholders */
--primary-300: #B0B0B0  /* Gris muy claro */
--primary-200: #D1D1D1  /* Gris casi blanco - borders sutiles */
--primary-100: #E7E7E7  /* Gris blanquecino - backgrounds */
--primary-50:  #F6F6F6  /* Casi blanco - backgrounds principales */
```

### Colores Secundarios (Violetas)
```css
--violet-950: #3A0269  /* Violeta muy oscuro */
--violet-900: #5178C   /* Violeta oscuro */
--violet-800: #691AAF  /* Violeta medio-oscuro */
--violet-700: #7B1AD6  /* Violeta medio */
--violet-600: #8F2AF3  /* Violeta - botones principales */
--violet-500: #B063FF  /* Violeta claro - hover states */
--violet-400: #BE7EFF  /* Violeta muy claro */
--violet-300: #D7B6FF  /* Violeta pastel */
--violet-200: #E8D3FF  /* Violeta muy pastel */
--violet-100: #F3E7FF  /* Violeta casi blanco - badges */
--violet-50:  #FAF5FF  /* Violeta blanquecino */
```

### Colores de Estado
- **Error**: `#DC2626` (Rojo)
- **Éxito**: `#16A34A` (Verde)
- **Advertencia**: `#D97706` (Naranja)
- **Info**: `#2563EB` (Azul)

---

## 🏗️ Estructura de Páginas Requeridas

### 🔐 Autenticación
1. **Landing Page** - Hero section con "Crear cuenta gratis" y login social
2. **Registro** - Formulario con email, Google, Instagram, Apple
3. **Login** - Formulario de inicio de sesión
4. **Verificación Email** - Pantalla de confirmación
5. **Onboarding** - 4 pasos: Nombres, Contraseña, Datos Personales

### 🏠 Dashboard Principal
6. **Home/Explorar** - Feed de campañas disponibles con filtros
7. **Detalle de Campaña** - Información completa, aplicar, chat

### 👤 Perfil y Configuración
8. **Mi Perfil** - Estadísticas, redes sociales, datos personales
9. **Mis Campañas** - Campañas aplicadas, en progreso, completadas
10. **Mensajes** - Sistema de chat con marcas
11. **Configuración** - Editar perfil, métodos de pago, notificaciones

---

## 🎯 Funcionalidades Específicas

### 📊 Tarjetas de Campaña
Cada campaña debe mostrar:
- **Logo de la marca** (Nike, Nivea, Adidas, etc.)
- **Título de la campaña** 
- **Descripción breve**
- **Compensación** (ej: "$350 USD")
- **Fecha de inicio** (ej: "20/05")
- **Tipo** (Campaña musical, de evento, etc.)
- **Ubicación** (Argentina, Perú, Brasil)
- **Redes sociales** (Instagram, TikTok, YouTube icons)
- **Badge de estado** ("Cierra esta semana" en fondo violeta claro)
- **Botón "Ver más"**

### 🔍 Sistema de Filtros
- Por tipo de campaña
- Por redes sociales
- Por compensación
- Por ubicación
- Por fecha de cierre

### 💬 Chat/Mensajería
- Lista de conversaciones
- Chat en tiempo real
- Envío de archivos
- Estados de mensaje (enviado, leído)

### 📊 Dashboard de Estadísticas
- Audiencia total
- Engagement rate
- Campañas completadas
- Ingresos totales
- Gráficos de crecimiento

---

## 🎨 Estilo Visual y UX

### 🎯 Principios de Diseño
- **Minimalista**: Mucho espacio en blanco, diseño limpio
- **Moderno**: Bordes redondeados, sombras sutiles
- **Profesional**: Tipografía clara y jerarquía visual
- **Responsive**: Mobile-first, adaptable a desktop

### 📱 Componentes Clave
- **Botón Principal**: Fondo #191919, texto blanco, hover con violeta
- **Botón Secundario**: Border gris, fondo transparente
- **Inputs**: Labels flotantes, bordes sutiles, focus en violeta
- **Cards**: Sombra sutil, border radius 12px, padding generoso
- **Navigation**: Sidebar en desktop, bottom nav en mobile

### 🖼️ Elementos Visuales
- **Iconos**: Usar Lucide React o Heroicons
- **Tipografía**: Inter o similar (clean, modern)
- **Logos de marcas**: Nike, Adidas, Nivea, etc. (usar placeholders)
- **Avatares**: Círculos con iniciales o fotos de perfil

---

## 📱 Responsive Design

### 💻 Desktop (1200px+)
- Sidebar de navegación izquierda
- Grid de 3 columnas para campañas
- Chat en panel lateral
- Header con búsqueda y perfil

### 📱 Tablet (768px - 1199px)
- Grid de 2 columnas para campañas
- Navigation drawer colapsable
- Chat en modal/overlay

### 📱 Mobile (< 768px)
- Lista vertical de campañas
- Bottom navigation bar
- Chat en pantalla completa
- Hamburger menu

---

## 🚀 Funcionalidades Interactivas

### ⚡ Estados y Animaciones
- **Loading states** en botones y formularios
- **Hover effects** en cards y botones
- **Smooth transitions** entre páginas
- **Skeleton loaders** mientras cargan las campañas
- **Toast notifications** para acciones exitosas/errores

### 🔔 Notificaciones
- Badge con número en icono de mensajes
- Toast para nuevas campañas
- Alertas para deadlines próximos

### 📊 Data Management
- **Estado local** para formularios
- **Cache** para campañas y perfil
- **Optimistic updates** en interacciones
- **Error boundaries** para manejo de errores

---

## 🎭 Contenido de Ejemplo

### 🏢 Marcas de Ejemplo
- **Nike** - "Run With Me" - Campaña musical - $300 USD
- **Nivea** - "Rutina Glow" - Campaña de evento - $350 USD  
- **Adidas** - "Movete con estilo" - Campaña musical - $500 USD
- **Coca-Cola** - "Refresh Your Summer" - Campaña de producto - $400 USD

### 👤 Datos de Usuario Ejemplo
- **Nombre**: María González
- **Seguidores**: 45.2K (Instagram), 12.8K (TikTok)
- **Engagement**: 4.2%
- **Campañas completadas**: 8
- **Ingresos totales**: $2,400 USD

---

## 🔧 Tecnologías Sugeridas

### ⚡ Stack Recomendado
- **Framework**: React con TypeScript
- **Styling**: Tailwind CSS
- **Estado**: Zustand o React Query
- **Routing**: React Router
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Animations**: Framer Motion (opcional)

### 📡 APIs Mock
- Crear endpoints simulados para:
  - Autenticación (login/register)
  - Lista de campañas
  - Perfil de usuario
  - Mensajes/chat
  - Estadísticas

---

## 🎯 Objetivos de UX

### ✨ Experiencia del Usuario
1. **Onboarding fluido**: Registro en menos de 2 minutos
2. **Descubrimiento fácil**: Encontrar campañas relevantes rápidamente
3. **Aplicación simple**: Aplicar a campañas con 1 click
4. **Comunicación clara**: Chat intuitivo con marcas
5. **Progreso visible**: Dashboard con métricas claras

### 🎪 Casos de Uso Principales
1. **Explorar campañas** → Filtrar → Ver detalle → Aplicar
2. **Gestionar perfil** → Conectar redes → Ver estadísticas
3. **Comunicarse** → Chat con marcas → Enviar contenido
4. **Hacer seguimiento** → Ver campañas aplicadas → Estado de pagos

---

## 🚀 Entregables Esperados

### 📦 Funcionalidades Mínimas (MVP)
- ✅ Landing page atractiva
- ✅ Sistema de registro/login
- ✅ Feed de campañas con filtros
- ✅ Detalle de campaña
- ✅ Perfil básico de usuario
- ✅ Sistema de aplicación a campañas

### 🎯 Funcionalidades Avanzadas
- ✅ Chat/mensajería
- ✅ Dashboard de estadísticas
- ✅ Gestión de métodos de pago
- ✅ Notificaciones en tiempo real
- ✅ Sistema de reviews/ratings

---

**🎨 Nota de Diseño**: Mantén el diseño limpio y profesional, similar a plataformas como Upwork o Fiverr, pero enfocado en creadores de contenido. La paleta de grises debe dominar con toques de violeta para acciones importantes.

---

# 📋 Prompts por Sección

## 🚀 Prompt 1: Landing Page

### 📋 Descripción
Crea la **landing page principal** de Disker, una plataforma que conecta creadores de contenido con marcas reales para colaboraciones publicitarias.

### 🎨 Paleta de Colores
```css
/* Grises principales */
--primary-950: #191919  /* Negro principal */
--primary-600: #5D5D5D  /* Gris medio */
--primary-100: #E7E7E7  /* Gris blanquecino */
--primary-50: #F6F6F6   /* Casi blanco */

/* Violetas de acento */
--violet-600: #8F2AF3   /* Violeta principal */
--violet-100: #F3E7FF   /* Violeta muy claro */
```

### 🏗️ Estructura de la Landing Page

#### 📱 Header
- **Logo**: "Disker" en tipografía bold, color `#191919`
- **Navegación**: "Explorar", "Para Marcas", "Iniciar Sesión"
- **CTA Principal**: Botón "Crear cuenta gratis" (fondo `#191919`, texto blanco)

#### 🎯 Hero Section
- **Título principal**: "La plataforma para creadores con marcas reales"
- **Subtítulo**: "Conecta con Nike, Adidas, Nivea y más. Monetiza tu contenido con campañas reales."
- **Botones**:
  - "Crear cuenta gratis" (fondo `#191919`)
  - "Continuar con Google" (fondo blanco, border gris)
- **Imagen hero**: Mockup de la app móvil o ilustración de creadores

#### 💼 Sección "Marcas Destacadas"
- **Título**: "Colabora con las mejores marcas"
- **Logos**: Nike, Adidas, Nivea, Coca-Cola (usar placeholders)
- **Grid**: 4 columnas en desktop, 2 en mobile

#### ✨ Sección "Cómo Funciona"
**3 pasos con iconos:**
1. **📝 Regístrate** - "Crea tu perfil en minutos"
2. **🎯 Explora** - "Encuentra campañas perfectas para ti"
3. **💰 Gana** - "Recibe pagos por tu contenido"

#### 📊 Sección "Para Creadores"
- **Título**: "Hecho para creadores como tú"
- **Features con iconos**:
  - 💰 "Pagos garantizados hasta $500 USD por campaña"
  - 🎯 "Campañas personalizadas para tu audiencia"
  - 📈 "Analytics detallados de tu performance"
  - 🤝 "Comunicación directa con las marcas"

#### 🎪 Footer
- **Links**: Términos, Privacidad, Contacto
- **Redes sociales**: Instagram, TikTok, YouTube
- **Copyright**: "© 2024 Disker. Todos los derechos reservados."

### 🎨 Estilo Visual
- **Tipografía**: Inter o similar, clean y moderna
- **Espaciado**: Generoso, mucho white space
- **Bordes**: Radius 12px en botones y cards
- **Sombras**: Sutiles, `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`

### 📱 Responsive
- **Desktop**: Hero con imagen a la derecha
- **Mobile**: Stack vertical, botones full-width
- **Breakpoints**: 768px para tablet, 1024px para desktop

**🎯 Objetivo**: Página que convierta visitantes en registros, enfocada en creadores de contenido que buscan monetizar su audiencia.

---

## 🔐 Prompt 2: Sistema de Autenticación

### 📋 Descripción
Crea el **sistema completo de registro y login** para Disker, incluyendo onboarding de 4 pasos.

### 🏗️ Páginas de Autenticación

#### 📝 Página de Registro
- **Título**: "Únete a Disker"
- **Subtítulo**: "Comienza a monetizar tu contenido hoy"
- **Formulario**:
  - Input email con validación
  - Checkbox "Acepto términos y condiciones"
  - Botón "Crear cuenta gratis" (fondo `#191919`)
- **Opciones sociales**:
  - "Continuar con Google" (icono + texto)
  - "Continuar con Instagram" (icono + texto)
  - "Continuar con Apple" (icono + texto)
- **Link**: "¿Ya tienes cuenta? Inicia sesión"

#### 🔑 Página de Login
- **Título**: "Bienvenido de vuelta"
- **Formulario**:
  - Input email
  - Input contraseña
  - Link "¿Olvidaste tu contraseña?"
  - Botón "Iniciar sesión" (fondo `#191919`)
- **Opciones sociales**: Mismas que registro
- **Link**: "¿No tienes cuenta? Regístrate gratis"

#### ✉️ Verificación de Email
- **Título**: "Revisa tu email"
- **Mensaje**: "Te enviamos un código a tu correo. Haz click en el enlace para continuar."
- **Input**: Código de verificación (6 dígitos)
- **Botón**: "Verificar email"
- **Link**: "¿No recibiste el email? Reenviar"

### 🚀 Onboarding (4 pasos)

#### Paso 1: Nombres
- **Progreso**: "1/4" en esquina superior
- **Título**: "¿Cómo te llamás?"
- **Subtítulo**: "Este será tu nombre visible para las marcas"
- **Inputs**:
  - Nombre (floating label)
  - Apellido (floating label)
- **Botón**: "Continuar"

#### Paso 2: Contraseña
- **Progreso**: "2/4"
- **Título**: "Crea tu contraseña"
- **Subtítulo**: "Debe tener al menos 8 caracteres"
- **Inputs**:
  - Contraseña (con toggle show/hide)
  - Confirmar contraseña
- **Validación**: Mostrar requisitos en tiempo real
- **Botón**: "Continuar"

#### Paso 3: Datos Personales
- **Progreso**: "3/4"
- **Título**: "Contanos sobre vos"
- **Inputs**:
  - País (select dropdown)
  - Ciudad (select dropdown)
  - Fecha de nacimiento (date picker)
  - Género (radio buttons: Masculino, Femenino, Otro, Prefiero no decir)
- **Botón**: "Continuar"

#### Paso 4: Redes Sociales
- **Progreso**: "4/4"
- **Título**: "Conecta tus redes sociales"
- **Subtítulo**: "Esto nos ayuda a encontrar las mejores campañas para vos"
- **Opciones**:
  - Instagram (botón "Conectar")
  - TikTok (botón "Conectar")
  - YouTube (botón "Conectar")
- **Botón**: "Finalizar registro"

### 🎨 Estilo Visual
- **Layout**: Centrado, max-width 400px
- **Inputs**: Floating labels, border radius 8px
- **Botones**: Full width, height 48px
- **Colores**: 
  - Inputs focus: border `#8F2AF3`
  - Errores: texto `#DC2626`
  - Éxito: texto `#16A34A`

### 📱 Estados y Validaciones
- **Loading states**: Spinner en botones durante submit
- **Validaciones**:
  - Email válido
  - Contraseña mínimo 8 caracteres
  - Campos requeridos
- **Errores**: Mostrar debajo de cada input
- **Toast notifications**: Para éxito/error de acciones

**🎯 Objetivo**: Onboarding fluido que capture toda la información necesaria sin fricciones.

---

## 🏠 Prompt 3: Dashboard Principal (Home)

### 📋 Descripción
Crea el **dashboard principal** donde los creadores exploran y filtran campañas disponibles.

### 🏗️ Estructura del Dashboard

#### 📱 Header Principal
- **Logo**: "Disker" (esquina superior izquierda)
- **Barra de búsqueda**: "Buscar campañas..." (centro)
- **Perfil**: Avatar + nombre usuario (esquina superior derecha)
- **Notificaciones**: Icono con badge de número

#### 🎯 Hero Section
- **Título**: "Encuentra tu próxima campaña"
- **Subtítulo**: "Descubre oportunidades con las mejores marcas"
- **Filtros rápidos**: Botones "Todas", "Nuevas", "Cierra pronto", "Mejor pagadas"

#### 🔍 Barra de Filtros
- **Filtro por tipo**: Dropdown "Tipo de campaña"
- **Filtro por redes**: Checkboxes Instagram, TikTok, YouTube
- **Filtro por pago**: Slider "$0 - $500+"
- **Filtro por ubicación**: Dropdown países
- **Botón**: "Aplicar filtros" (fondo `#8F2AF3`)

### 📊 Tarjetas de Campaña

#### 🎪 Estructura de cada Card
```
┌─────────────────────────────────────┐
│ [Logo Marca]     [Badge: "Cierra pronto"] │
│ Título de la Campaña                 │
│ Descripción breve...                 │
│                                     │
│ 📅 17/05  🎵 Musical  🌎 Argentina   │
│ 💰 $350 USD                         │
│                                     │
│ [📱][📱][📱] Ver más →              │
└─────────────────────────────────────┘
```

#### 🎨 Contenido de Ejemplo
**Campaña 1 - Nike**
- **Logo**: Nike swoosh
- **Título**: "Run With Me"
- **Descripción**: "Mostrá cómo usás tus zapatillas Nike en tu día a día."
- **Fecha**: "17/05"
- **Tipo**: "Campaña musical"
- **Ubicación**: "Argentina, Colombia y Chile"
- **Pago**: "$300 USD"
- **Badge**: "Cierra esta semana" (fondo `#F3E7FF`)
- **Redes**: Instagram, TikTok

**Campaña 2 - Nivea**
- **Título**: "Rutina Glow"
- **Descripción**: "Contá tu experiencia con nuestra línea de skincare natural."
- **Pago**: "$350 USD"
- **Tipo**: "Campaña de evento"
- **Redes**: Instagram, TikTok, YouTube

**Campaña 3 - Adidas**
- **Título**: "Movete con estilo by Stay Fresh"
- **Descripción**: "Presentá tu outfit urbano favorito con la nueva colección SS24."
- **Pago**: "$500 USD"
- **Tipo**: "Campaña musical"
- **Ubicación**: "Presencial"
- **Redes**: YouTube

### 📱 Navegación Inferior (Mobile)
- **🏠 Explorar** (activo - color `#8F2AF3`)
- **💬 Mensajes** (con badge si hay nuevos)
- **📊 Mis Campañas**
- **👤 Perfil**

### 🎨 Estados Interactivos
- **Hover en cards**: Elevación sutil, sombra más pronunciada
- **Loading**: Skeleton loaders mientras cargan campañas
- **Empty state**: "No hay campañas que coincidan con tus filtros"
- **Paginación**: "Cargar más campañas" al final

### 📱 Responsive Design

#### 💻 Desktop (1200px+)
- **Layout**: Sidebar izquierda con filtros, grid 3 columnas de campañas
- **Header**: Horizontal con todos los elementos visibles

#### 📱 Mobile (< 768px)
- **Layout**: Stack vertical, 1 columna de campañas
- **Filtros**: Modal/drawer que se abre desde botón "Filtros"
- **Navegación**: Bottom navigation bar

### 🔍 Funcionalidades de Búsqueda
- **Búsqueda en tiempo real**: Por título de campaña o marca
- **Filtros combinables**: Múltiples filtros simultáneos
- **Ordenamiento**: Por fecha, pago, relevancia
- **Favoritos**: Botón corazón para guardar campañas

**🎯 Objetivo**: Dashboard que facilite el descubrimiento de campañas relevantes con filtros intuitivos.

---

## 📄 Prompt 4: Detalle de Campaña

### 📋 Descripción
Crea la **página de detalle de campaña** donde los creadores ven información completa y pueden aplicar.

### 🏗️ Estructura de la Página

#### 📱 Header de Campaña
- **Botón atrás**: Flecha izquierda para volver al dashboard
- **Logo de marca**: Nike, Adidas, etc. (esquina superior derecha)
- **Badge de estado**: "Activa", "Cierra pronto", "Cerrada"

#### 🎯 Hero Section
- **Imagen principal**: Banner de la campaña (16:9 ratio)
- **Título**: "Run With Me" (h1, color `#191919`)
- **Subtítulo**: "Nike" (marca, color `#5D5D5D`)
- **ID de campaña**: "#RWK2310" (pequeño, gris)

#### 💰 Información Clave
```
┌─────────────────────────────────────┐
│ 💰 $300 USD    📅 Cierra: 25/05    │
│ 🌎 Argentina, Colombia, Chile       │
│ 🎵 Campaña musical                  │
│ 📱 Instagram  📱 TikTok             │
└─────────────────────────────────────┘
```

#### 📖 Sobre el Proyecto
- **Título**: "Sobre este proyecto"
- **Descripción completa**:
  > "Queremos invitarte a contar tu historia con las Air Max como parte de tu día a día. La propuesta es que muestres cómo estas zapatillas se integran de manera natural en tu rutina, acompañando cada uno de tus momentos: desde lo cotidiano hasta esos espacios donde encontrás disfrute, relax o conexión con vos mismo y con los demás.
  > 
  > No buscamos algo forzado ni producido: queremos contenido real, cercano y con tu impronta. Que se sienta auténtico."

#### 📋 Requisitos
- **Título**: "Requisitos para aplicar"
- **Lista con checkmarks**:
  - ✅ Mínimo 10K seguidores en Instagram o TikTok
  - ✅ Engagement rate superior al 3%
  - ✅ Contenido relacionado con lifestyle/deportes
  - ✅ Ubicación en Argentina, Colombia o Chile
  - ✅ Disponibilidad para crear contenido en 7 días

#### 🎬 Entregables
- **Título**: "¿Qué tenés que crear?"
- **Lista de contenido**:
  - 📱 **1 Reel de Instagram** (30-60 segundos)
  - 📱 **2 Stories de Instagram** (con menciones)
  - 🎵 **1 Video de TikTok** (15-30 segundos)
  - 📝 **Copy sugerido** (proporcionado por la marca)

#### 📊 Timeline
```
Aplicación → Selección → Briefing → Creación → Entrega
    3 días      2 días      1 día       7 días     1 día
```

### 🎯 Sección de Aplicación

#### 💬 CTA Principal
- **Botón grande**: "Aplicar a esta campaña" (fondo `#8F2AF3`, texto blanco)
- **Texto secundario**: "Respuesta en 48hs"
- **Contador**: "23 creadores ya aplicaron"

#### 📝 Modal de Aplicación
Al hacer click en "Aplicar":
- **Título**: "Aplicar a Run With Me"
- **Campos**:
  - "¿Por qué sos perfecto para esta campaña?" (textarea)
  - "Links a contenido similar" (input)
  - "¿Cuándo podrías empezar?" (date picker)
- **Botones**: "Cancelar" | "Enviar aplicación"

### 🤝 Información de la Marca

#### 🏢 Sobre Nike
- **Logo**: Nike swoosh
- **Descripción**: "Marca líder mundial en calzado deportivo y lifestyle"
- **Campañas anteriores**: "15 campañas completadas en Disker"
- **Rating**: ⭐⭐⭐⭐⭐ (4.8/5) - "Excelente comunicación"

### 💬 Sección de Preguntas

#### ❓ FAQ
- **"¿Puedo aplicar si tengo menos seguidores?"**
  - "Los requisitos son flexibles. Aplicá y evaluaremos tu perfil."
- **"¿Cuándo recibo el pago?"**
  - "El pago se procesa 7 días después de la entrega aprobada."
- **"¿Puedo modificar el contenido?"**
  - "Sí, trabajamos juntos para que el contenido sea auténtico."

#### 💬 Chat con la Marca
- **Botón**: "Hacer una pregunta" (outline button)
- **Abre**: Modal de chat directo con el community manager

### 🎨 Estados de la Campaña

#### ✅ Campaña Activa
- **Badge**: "Activa" (fondo verde claro)
- **Botón**: "Aplicar a esta campaña" (habilitado)

#### ⏰ Cierra Pronto
- **Badge**: "Cierra en 2 días" (fondo `#F3E7FF`)
- **Urgencia**: Texto "¡Últimas horas para aplicar!"

#### ❌ Campaña Cerrada
- **Badge**: "Cerrada" (fondo gris)
- **Botón**: "Campaña cerrada" (deshabilitado)
- **Alternativa**: "Ver campañas similares"

### 📱 Responsive Design

#### 💻 Desktop
- **Layout**: 2 columnas (contenido principal + sidebar con info clave)
- **Imagen**: Hero image full width

#### 📱 Mobile
- **Layout**: Stack vertical
- **Sticky CTA**: Botón "Aplicar" fijo en la parte inferior

**🎯 Objetivo**: Página que proporcione toda la información necesaria para que el creador tome una decisión informada y aplique fácilmente.

---

## 👤 Prompt 5: Perfil de Usuario

### 📋 Descripción
Crea la **página de perfil completa** donde los creadores gestionan su información, ven estadísticas y configuran su cuenta.

### 🏗️ Estructura del Perfil

#### 📱 Header del Perfil
- **Avatar**: Foto de perfil circular (120px)
- **Nombre**: "María González" (h2, color `#191919`)
- **Username**: "@mariagonzalez" (color `#5D5D5D`)
- **Botón**: "Editar perfil" (outline button)

#### 📊 Estadísticas Principales
```
┌─────────────────────────────────────┐
│ 📊 45.2K      💰 $2,400     ⭐ 4.8   │
│   Seguidores    Ganado      Rating   │
│                                     │
│ 🎯 4.2%       📱 8          🏆 12    │
│   Engagement   Campañas     Badges   │
└─────────────────────────────────────┘
```

#### 🔗 Redes Sociales Conectadas
- **Instagram**: @mariagonzalez (45.2K seguidores) ✅ Verificada
- **TikTok**: @mariagonzalez (12.8K seguidores) ✅ Verificada  
- **YouTube**: María González (3.1K suscriptores) ❌ Sin conectar
- **Botón**: "Conectar YouTube"

### 📊 Dashboard de Estadísticas

#### 📈 Gráfico de Crecimiento
- **Título**: "Crecimiento de audiencia (últimos 6 meses)"
- **Gráfico de líneas**: Evolución de seguidores por mes
- **Métricas**:
  - Crecimiento mensual: +8.5%
  - Engagement promedio: 4.2%
  - Alcance promedio: 12.3K

#### 🎯 Performance por Red Social
```
Instagram  ████████████████████ 85%  (38.4K)
TikTok     ████████████████     70%  (8.9K)
YouTube    ████████             35%  (1.1K)
```

### 💼 Mis Campañas

#### 📋 Resumen de Campañas
- **Completadas**: 8 campañas
- **En progreso**: 2 campañas
- **Pendientes**: 1 aplicación

#### 🎪 Lista de Campañas Recientes
**Campaña Completada - Nike "Run With Me"**
- **Estado**: ✅ Completada
- **Pago**: $300 USD
- **Fecha**: Marzo 2024
- **Rating**: ⭐⭐⭐⭐⭐ (5/5)
- **Comentario**: "Excelente trabajo, contenido muy auténtico"

**Campaña En Progreso - Nivea "Rutina Glow"**
- **Estado**: 🔄 En progreso
- **Pago**: $350 USD
- **Deadline**: 15/05/2024
- **Entregables**: 2/3 completados

### 💰 Información Financiera

#### 💳 Métodos de Pago
- **PayPal**: maria.gonzalez@email.com ✅ Verificado
- **Transferencia bancaria**: Banco Santander ✅ Verificado
- **Botón**: "Agregar método de pago"

#### 📊 Historial de Pagos
- **Total ganado**: $2,400 USD
- **Último pago**: $350 USD (Nivea - 01/04/2024)
- **Próximo pago**: $300 USD (Nike - Pendiente)

### ⚙️ Configuración de Cuenta

#### 📝 Información Personal
- **Email**: maria.gonzalez@email.com
- **Teléfono**: +54 11 1234-5678
- **País**: Argentina
- **Ciudad**: Buenos Aires
- **Fecha de nacimiento**: 15/03/1995
- **Género**: Femenino

#### 🔔 Preferencias de Notificaciones
- **Email**: ✅ Nuevas campañas, ✅ Mensajes, ❌ Newsletter
- **Push**: ✅ Aplicaciones aceptadas, ✅ Pagos, ✅ Deadlines
- **SMS**: ❌ Todas desactivadas

#### 🎯 Preferencias de Campaña
- **Tipos preferidos**: Lifestyle, Belleza, Deportes
- **Redes preferidas**: Instagram, TikTok
- **Rango de pago**: $200 - $500 USD
- **Disponibilidad**: Lunes a Viernes

### 🏆 Logros y Badges

#### 🎖️ Badges Obtenidos
- 🥇 **Top Performer**: 5 campañas con rating 5⭐
- 🎯 **Engagement Master**: +5% engagement promedio
- 📱 **Multi-Platform**: Activo en 3+ redes sociales
- ⚡ **Quick Delivery**: Entregas antes del deadline
- 🤝 **Brand Favorite**: 3+ marcas te eligieron nuevamente

#### 📊 Próximos Objetivos
- 🎯 **Influencer Pro**: Completa 10 campañas (8/10)
- 💰 **High Earner**: Gana $5,000 USD (2,400/5,000)
- 📈 **Growth Hacker**: Alcanza 50K seguidores (45.2K/50K)

### 💬 Reseñas de Marcas

#### ⭐ Testimonios Recientes
**Nike - Run With Me**
> "María entregó contenido excepcional, muy profesional y creativo. Definitivamente trabajaremos juntos nuevamente." ⭐⭐⭐⭐⭐

**Adidas - Stay Fresh**
> "Excelente comunicación y entrega a tiempo. El contenido superó nuestras expectativas." ⭐⭐⭐⭐⭐

### 📱 Navegación del Perfil

#### 🗂️ Tabs Principales
- **📊 Overview** (activo)
- **📱 Mis Campañas**
- **💰 Finanzas**
- **⚙️ Configuración**
- **🏆 Logros**

### 🎨 Estados Interactivos

#### ✏️ Modo Edición
- **Campos editables**: Información personal, preferencias
- **Validaciones**: Email válido, teléfono formato correcto
- **Botones**: "Guardar cambios" | "Cancelar"

#### 📊 Gráficos Interactivos
- **Hover**: Mostrar valores exactos
- **Filtros**: Por período (1M, 3M, 6M, 1A)
- **Responsive**: Adaptar gráficos a mobile

### 📱 Responsive Design

#### 💻 Desktop
- **Layout**: Sidebar con navegación + contenido principal
- **Gráficos**: Full width con detalles

#### 📱 Mobile
- **Layout**: Stack vertical con tabs horizontales
- **Estadísticas**: Grid 2x3 en lugar de horizontal

**🎯 Objetivo**: Dashboard completo que permita al creador gestionar su perfil, ver su progreso y optimizar su performance en la plataforma.

---
