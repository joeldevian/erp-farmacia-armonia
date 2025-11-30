# 🏥 ERP Farmacia ARMONÍA

Sistema de Gestión Empresarial (ERP) desarrollado para la Farmacia ARMONÍA, construido con tecnologías modernas y escalables.

## 📋 Descripción

Este proyecto es un ERP completo que permite gestionar todos los aspectos operativos de una farmacia, incluyendo inventario, ventas, clientes, proveedores y más.

## 🛠️ Tecnologías Utilizadas

### Backend
- **NestJS** - Framework de Node.js para aplicaciones del lado del servidor
- **TypeORM** - ORM para TypeScript y JavaScript
- **PostgreSQL** - Base de datos relacional
- **TypeScript** - Superset tipado de JavaScript

### Frontend
- **React 18** - Librería para construir interfaces de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool y dev server ultrarrápido
- **Axios** - Cliente HTTP para peticiones al backend

## 📁 Estructura del Proyecto

```
C:\nebula\farmacia\
├── backend/                 # Aplicación NestJS
│   ├── src/
│   │   ├── config/         # Configuraciones (DB, etc.)
│   │   ├── app.module.ts   # Módulo principal
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── main.ts         # Punto de entrada
│   ├── .env                # Variables de entorno
│   ├── .env.example        # Plantilla de variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── services/      # Servicios (API, etc.)
│   │   ├── App.tsx        # Componente principal
│   │   ├── main.tsx       # Punto de entrada
│   │   └── index.css      # Estilos globales
│   ├── .env               # Variables de entorno
│   ├── .env.example       # Plantilla de variables
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md              # Este archivo
```

## ⚙️ Configuración

### Requisitos Previos

- Node.js (v18 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

### Variables de Entorno

#### Backend (`backend/.env`)

```env
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración de Base de Datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=armonia
```

> ⚠️ **Importante**: Actualiza las credenciales de PostgreSQL con tus valores reales.

#### Frontend (`frontend/.env`)

```env
# URL del Backend API
VITE_API_URL=http://localhost:3000
```

## 🚀 Instalación y Ejecución

### 1. Instalar Dependencias del Backend

```bash
cd C:\nebula\farmacia\backend
npm install
```

### 2. Instalar Dependencias del Frontend

```bash
cd C:\nebula\farmacia\frontend
npm install
```

### 3. Configurar Base de Datos

Asegúrate de que PostgreSQL esté corriendo y que la base de datos `armonia` exista:

```sql
CREATE DATABASE armonia;
```

> 📝 **Nota**: TypeORM está configurado con `synchronize: true`, por lo que las tablas se crearán automáticamente cuando agregues entidades.

### 4. Ejecutar el Backend

```bash
cd C:\nebula\farmacia\backend
npm run start:dev
```

El backend estará disponible en: `http://localhost:3000`

### 5. Ejecutar el Frontend

En otra terminal:

```bash
cd C:\nebula\farmacia\frontend
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🧪 Verificación de la Instalación

1. Abre tu navegador en `http://localhost:5173`
2. Deberías ver la página principal del ERP
3. Si la conexión es exitosa, verás un mensaje verde confirmando la conexión con el backend y la base de datos

## 📦 Scripts Disponibles

### Backend

- `npm run start:dev` - Inicia el servidor en modo desarrollo con hot-reload
- `npm run start:prod` - Inicia el servidor en modo producción
- `npm run build` - Compila el proyecto
- `npm run lint` - Ejecuta el linter

### Frontend

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila el proyecto para producción
- `npm run preview` - Previsualiza el build de producción
- `npm run lint` - Ejecuta el linter

## 🔒 Seguridad

- Los archivos `.env` están incluidos en `.gitignore` para proteger información sensible
- Nunca subas archivos `.env` al repositorio
- Usa `.env.example` como referencia para las variables necesarias

## 👨‍💻 Autor

**Joel** - Desarrollador del ERP Farmacia ARMONÍA

## 📄 Licencia

Este proyecto es privado y está desarrollado exclusivamente para la Farmacia ARMONÍA.

---

**Estado del Proyecto**: ✅ Configuración inicial completada - Listo para desarrollo de funcionalidades
