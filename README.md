# Innova-Lav-grupo-5

App de aprendizaje de Lengua de Señas Argentina (LSA) desarrollada con React Native, Node.js, Express y PostgreSQL. El objetivo es facilitar el aprendizaje de la LSA mediante módulos progresivos, videos educativos, ejercicios interactivos y seguimiento personalizado del progreso del usuario.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![React Native](https://img.shields.io/badge/React_Native-20232A?style=flat&logo=react)](https://reactnative.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

---

## Tabla de contenidos

- [Características](#características)
- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y configuración](#instalación-y-configuración)
- [Variables de entorno](#variables-de-entorno)
- [Uso](#uso)
- [Documentación de la API](#documentación-de-la-api)
- [Gamificación](#gamificación)
- [Contribución](#contribución)
- [Licencia](#licencia)
- [Autores](#autores)

---

## Características

- **Módulos progresivos** — Aprendé LSA paso a paso a través de módulos organizados por nivel de dificultad.
- **Lecciones con contenido multimedia** — Videos educativos alojados en Supabase Storage integrados en cada lección.
- **Ejercicios interactivos** — Tres tipos de ejercicios: opción múltiple, verdadero/falso y ordenamiento de palabras.
- **Seguimiento de progreso** — Registro detallado del avance por usuario, módulo, lección y ejercicio.
- **Sistema de rachas** — Mantené tu racha activa completando actividades de forma consecutiva.
- **Puntos y logros** — Ganá puntos por cada ejercicio completado y acumulá logros.
- **Favoritos** — Marcá contenidos teóricos como favoritos para acceder rápidamente.
- **Registro de eventos** — Log de actividades del usuario para análisis y seguimiento.
- **Autenticación JWT** — Registro e inicio de sesión seguro con tokens JSON Web.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React Native |
| Backend | Node.js, Express |
| Base de datos | PostgreSQL |
| ORM | Prisma |
| Autenticación | JSON Web Tokens (JWT) |
| Validación | express-validator |
| Almacenamiento multimedia | Supabase Storage |
| Variables de entorno | dotenv |

---

## Estructura del proyecto

```
innovalab-grupo5/
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── assets/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── assets/
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── metro.config.js
├── src/
│   ├── app.js                  # Aplicación Express principal
│   ├── server.js               # Punto de entrada del servidor
│   ├── controllers/            # Controladores de cada recurso
│   │   ├── auth.controller.js
│   │   ├── module.controller.js
│   │   ├── lesson.controller.js
│   │   ├── exercise.controller.js
│   │   ├── progress.controller.js
│   │   ├── user.controller.js
│   │   ├── favorite.controller.js
│   │   └── event-log.controller.js
│   ├── routes/                 # Definición de rutas
│   │   ├── auth.routes.js
│   │   ├── module.routes.js
│   │   ├── progress.routes.js
│   │   ├── user.routes.js
│   │   ├── favorite.routes.js
│   │   └── event-log.routes.js
│   ├── middlewares/            # Middlewares personalizados
│   │   ├── auth.middleware.js
│   │   └── validate.middleware.js
│   ├── services/               # Lógica de negocio
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── progress.service.js
│   │   ├── exercise.service.js
│   │   ├── gamification.service.js
│   │   └── favorite.service.js
│   ├── prisma/
│   │   ├── prisma.js           # Instancia de Prisma Client
│   │   ├── schema.prisma       # Esquema de base de datos
│   │   ├── seed.js             # Script de sembrado de datos
│   │   └── migrations/         # Migraciones de Prisma
│   ├── validators/
│   │   └── auth.validator.js
│   └── utils/
│       ├── racha.utils.js
│       ├── log.utils.js
│       ├── jws.js
│       └── formatters.js
├── documentación.md            # Documentación detallada de la API
├── package.json
└── README.md
```

---

## Requisitos previos

- **Node.js** instalado en el sistema
- **npm** (Node Package Manager)
- **Cuenta de Supabase** con credenciales de base de datos PostgreSQL
- **Git** para clonar el repositorio

---

## Instalación y configuración

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/MarielaTorres/innovalab-grupo5.git
   cd innovalab-grupo5
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   DATABASE_URL="postgresql://usuario:contraseña@host:puerto/base_de_datos"
   DIRECT_URL="postgresql://usuario:contraseña@host:puerto/base_de_datos"
   PORT=3000
   JWT_SECRET="tu_secreto_jwt"
   ```

4. **Generar el cliente de Prisma**

   ```bash
   npx prisma generate
   ```

5. **Ejecutar migraciones**

   ```bash
   npx prisma migrate dev
   ```

6. **Sembrar datos (opcional)**

   ```bash
   npx prisma db seed
   ```

---

## Variables de entorno

| Variable | Descripción | Obligatoria |
|----------|------------|:-----------:|
| `DATABASE_URL` | URL de conexión a PostgreSQL | Sí |
| `DIRECT_URL` | URL directa a PostgreSQL (para migraciones) | Sí |
| `PORT` | Puerto del servidor (por defecto: `3000`) | No |
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | Sí |

---

## Uso

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Iniciar el servidor en producción:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`.

---

## Documentación de la API

La documentación completa de endpoints está disponible en [`documentación.md`](./documentación.md).

---

## Gamificación

La app incluye un sistema de gamificación para motivar el aprendizaje:

- **Puntos** — Se obtienen puntos al completar ejercicios y lecciones. Cada respuesta correcta otorga +10 puntos.
- **Racha** — Se incrementa la racha diaria al completar actividades de forma consecutiva.
- **Logros** — Se desbloquean logros al alcanzar ciertos hitos (ej. completar un módulo, mantener una racha, etc.).

---

## Contribución

1. Realizá un fork del repositorio.
2. Creá una rama para tu feature (`git checkout -b feature/nombre-de-la-feature`).
3. Realizá tus cambios y committeálos (`git commit -m 'feat: descripción del cambio'`).
4. Push a la rama (`git push origin feature/nombre-de-la-feature`).
5. Abrí un Pull Request.

---

## Licencia

Este proyecto está bajo la licencia [ISC](LICENSE).

---

## Autores

- **Back-end:** Lorena Febbraro, Juan Bordignon
- **Front-end:** Emanuel Marcello, Carmen Vargas, Elaine Amaya
- **Diseño UX-UI:** Natali Rodriguez Balderrama
- **Data Analytic:** Mauricio Ruiz, Marcelo Gutierrez
- **Tester QA:** Juan Gabriel Ruiz, Thiago de la Quintana, Pablo Morales
