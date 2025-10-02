# 🎯 Disker Mobile - Análisis del Proyecto

## 📱 ¿Qué es Disker?

**Disker** es una plataforma móvil que conecta **creadores de contenido** con **marcas reales** para colaboraciones y campañas publicitarias. Es como un "marketplace" donde los influencers pueden encontrar oportunidades de trabajo con empresas reconocidas.

### 🎪 Concepto Principal
> "La plataforma para creadores con marcas reales"

La app permite a los creadores de contenido (talents) registrarse, completar su perfil, y aplicar a campañas publicitarias de marcas como Nike, Nivea, Adidas, etc.

---

## 🏗️ Arquitectura Técnica

### 📋 Stack Tecnológico
- **Framework**: React Native CLI (0.74.0)
- **Navegación**: React Navigation v7
- **Estilos**: NativeWind (Tailwind CSS para React Native)
- **Estado**: Zustand
- **Autenticación**: Google Sign-In, OAuth
- **Plataformas**: Android & iOS
- **Backend**: API REST (staging.supra.social)

### 📁 Estructura del Proyecto
```
src/
├── components/          # Componentes reutilizables
│   ├── buttons/        # Botones (Primary, Social, Selection)
│   ├── cards/          # Tarjetas (CampaignCard)
│   ├── chat/           # Sistema de mensajería
│   ├── inputs/         # Inputs con validación
│   └── navigation/     # Navegación inferior
├── screens/            # Pantallas de la app (25+ pantallas)
├── navigation/         # Configuración de rutas
├── services/          # APIs y servicios externos
├── store/             # Estado global (Zustand)
└── types/             # Tipos TypeScript
```

---

## 🎨 Paleta de Colores

### 🖤 Colores Primarios (Grises)
```css
primary-950: #191919  /* Negro principal */
primary-900: #3D3D3D  /* Gris muy oscuro */
primary-800: #454545  /* Gris oscuro */
primary-700: #4F4F4F  /* Gris medio-oscuro */
primary-600: #5D5D5D  /* Gris medio */
primary-500: #6D6D6D  /* Gris */
primary-400: #888888  /* Gris claro */
primary-300: #B0B0B0  /* Gris muy claro */
primary-200: #D1D1D1  /* Gris casi blanco */
primary-100: #E7E7E7  /* Gris blanquecino */
primary-50:  #F6F6F6  /* Casi blanco */
```

### 💜 Colores Secundarios (Violetas)
```css
violet-950: #3A0269  /* Violeta muy oscuro */
violet-900: #5178C   /* Violeta oscuro */
violet-800: #691AAF  /* Violeta medio-oscuro */
violet-700: #7B1AD6  /* Violeta medio */
violet-600: #8F2AF3  /* Violeta */
violet-500: #B063FF  /* Violeta claro */
violet-400: #BE7EFF  /* Violeta muy claro */
violet-300: #D7B6FF  /* Violeta pastel */
violet-200: #E8D3FF  /* Violeta muy pastel */
violet-100: #F3E7FF  /* Violeta casi blanco */
violet-50:  #FAF5FF  /* Violeta blanquecino */
```

### 🎯 Colores de Estado
- **Éxito**: Verde estándar
- **Error**: `#DC2626` (Rojo)
- **Advertencia**: Amarillo estándar
- **Información**: Azul estándar

---

## 🚀 Funcionalidades Principales

### 👤 Sistema de Autenticación
- ✅ Registro con email
- ✅ Confirmación por email
- ✅ Login con Google
- ✅ Login con Instagram (preparado)
- ✅ Login con Apple (preparado)
- ✅ Gestión de sesiones con tokens

### 📝 Proceso de Onboarding (5 pasos)
1. **📧 Email**: Registro con correo electrónico
2. **✉️ Confirmación**: Verificación por email
3. **👤 Nombres**: Nombre y apellido
4. **🔒 Contraseña**: Creación de contraseña
5. **📊 Datos Personales**: País, ciudad, fecha de nacimiento, género

### 🏠 Pantalla Principal (Home)
- **📋 Lista de Campañas**: Muestra campañas disponibles
- **🔍 Filtros**: Sistema de filtrado
- **📱 Navegación**: Bottom navigation bar
- **🎯 Campañas Destacadas**: Nike, Nivea, Adidas, etc.

### 📊 Gestión de Campañas
- **📖 Detalle de Campaña**: Información completa
- **💰 Compensación**: Montos en USD
- **📍 Ubicación**: Países/regiones objetivo
- **📅 Fechas**: Inicio y cierre de campañas
- **📱 Redes Sociales**: Instagram, TikTok, YouTube

### 💬 Sistema de Mensajería
- **📨 Chat**: Comunicación con marcas
- **📎 Archivos**: Envío de contenido
- **🔔 Notificaciones**: Alertas en tiempo real

### 👤 Perfil de Usuario
- **📊 Estadísticas**: Audiencia y engagement
- **📱 Redes Sociales**: Conexión de perfiles
- **💳 Métodos de Pago**: PayPal y otros
- **⚙️ Configuración**: Edición de datos

---

## 🎯 Tipos de Campañas

### 🎵 Campaña Musical
- Contenido con música de fondo
- Plataformas: Instagram, TikTok

### 🎪 Campaña de Evento
- Promoción de eventos presenciales
- Cobertura en vivo

### 👕 Campaña de Producto
- Showcase de productos
- Reviews y unboxing

### 🎬 Campaña de Video
- Contenido audiovisual
- YouTube, Instagram Reels

---

## 📱 Pantallas Principales

### 🔐 Autenticación
- `AuthScreen` - Pantalla de bienvenida
- `LoginScreen` - Inicio de sesión
- `EmailScreen` - Registro con email
- `NameScreen` - Captura de nombres
- `PasswordScreen` - Creación de contraseña
- `AboutScreen` - Datos personales

### 🏠 Aplicación Principal
- `HomeScreen` - Feed de campañas
- `CampaignDetailScreen` - Detalle de campaña
- `ProfileScreen` - Perfil del usuario
- `MessagesScreen` - Bandeja de mensajes
- `NotificationsScreen` - Notificaciones

### ⚙️ Configuración
- `PersonalInfoScreen` - Información personal
- `PaymentMethodsScreen` - Métodos de pago
- `SocialMediaProfileScreen` - Perfiles sociales
- `AudienceStatsScreen` - Estadísticas

---

## 🔗 Integración con APIs

### 🌐 Backend Principal
- **Base URL**: `https://staging.supra.social`
- **Endpoints**: `/api/v1/talents/`
- **Autenticación**: Bearer tokens
- **Formato**: JSON REST API

### 📊 Funciones API Implementadas
- ✅ Registro de usuario
- ✅ Confirmación de email
- ✅ Actualización de nombres
- ✅ Configuración de contraseña
- ✅ Datos personales
- ✅ Login con Google

---

## 🎨 Diseño y UX

### 🎯 Principios de Diseño
- **Minimalista**: Uso extensivo de grises y blancos
- **Moderno**: Interfaces limpias y espaciadas
- **Intuitivo**: Navegación clara y directa
- **Responsive**: Adaptado para móviles

### 🎨 Elementos Visuales
- **Tipografía**: Geist (Bold, Medium)
- **Iconografía**: Iconos custom en PNG
- **Imágenes**: Logos de marcas reales
- **Animaciones**: Transiciones suaves

### 📱 Componentes Clave
- **CampaignCard**: Tarjeta de campaña con toda la info
- **PrimaryButton**: Botón principal con variantes
- **FloatingLabelInput**: Inputs con labels flotantes
- **BottomNavBar**: Navegación inferior
- **LoadingOverlay**: Overlay de carga

---

## 🚀 Casos de Uso Principales

### 👤 Para Creadores de Contenido
1. **Registro**: Crear cuenta y completar perfil
2. **Explorar**: Buscar campañas relevantes
3. **Aplicar**: Postularse a campañas de interés
4. **Comunicar**: Chat con marcas
5. **Crear**: Producir contenido para campañas
6. **Cobrar**: Recibir pagos por colaboraciones

### 🏢 Para Marcas
1. **Publicar**: Crear campañas publicitarias
2. **Filtrar**: Encontrar creadores ideales
3. **Comunicar**: Chat con talents
4. **Supervisar**: Revisar contenido creado
5. **Pagar**: Compensar a creadores

---

## 🎯 Propuesta de Valor

### ✨ Para Creadores
- 💰 **Monetización**: Ingresos reales por contenido
- 🎯 **Oportunidades**: Acceso a marcas reconocidas
- 📊 **Crecimiento**: Estadísticas y analytics
- 🤝 **Networking**: Conexión con la industria

### ✨ Para Marcas
- 🎯 **Targeting**: Audiencias específicas
- 📊 **Medición**: ROI y métricas claras
- 🎨 **Creatividad**: Contenido auténtico
- 💰 **Eficiencia**: Costos controlados

---

## 🔮 Tecnologías Futuras

### 📱 Próximas Integraciones
- **Instagram API**: Conexión directa
- **TikTok API**: Estadísticas automáticas
- **YouTube API**: Analytics de videos
- **Stripe**: Pagos internacionales

### 🚀 Funcionalidades Pendientes
- **Analytics Avanzados**: Métricas detalladas
- **IA para Matching**: Algoritmos de recomendación
- **Live Streaming**: Transmisiones en vivo
- **NFTs**: Contenido tokenizado

---

## 📊 Métricas de Éxito

### 🎯 KPIs Principales
- **👥 Usuarios Activos**: Creadores registrados
- **📈 Campañas Completadas**: Éxito de colaboraciones
- **💰 Volumen de Pagos**: Dinero movido en la plataforma
- **⭐ Satisfacción**: Rating de marcas y creadores
- **📱 Engagement**: Interacción en la app

---

*📱 Disker Mobile - Conectando creatividad con oportunidades reales*
