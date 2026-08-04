```
# Documentación de uso de la API

## Descripción general
Esta API proporciona endpoints para la gestión de usuarios, progreso del usuario, módulos, lecciones, favoritos y log de eventos. A continuación se detallan los endpoints disponibles, los métodos HTTP correspondientes, los cuerpos de las solicitudes y las respuestas esperadas.

## Configuración y uso
1. Clonar el repositorio del proyecto.
2. Navegar al directorio del proyecto e instalar las dependencias:
   ```bash
   cd innovalab-grupo5
   npm install

```

3.  Configurar las variables de entorno necesarias en el archivo `.env`:
    
    Fragmento de código
    
    ```
    DATABASE_URL="postgresql://..."
    DIRECT_URL="postgresql://..."
    
    ```
    
4.  Generar el cliente de Prisma:
    
    Bash
    
    ```
    npx prisma generate
    
    ```
    
5.  Iniciar el servidor:
    
    Bash
    
    ```
    npm start
    
    ```
    
    O en modo desarrollo:
    
    Bash
    
    ```
    npm run dev
    
    ```
    

## Requisitos previos

-   Node.js instalado en el sistema.
    
-   npm (Node Package Manager) para gestionar las dependencias.
    
-   Credenciales de la base de datos Supabase.
    

# Endpoints de la API

## Autenticación

### Creación de usuario

-   **Method:** `POST`
    
-   **Endpoint:** `/auth/register`
    
-   **Body:**
    

JSON

```
{
  "nombre": "Juan Pérez",
  "email": "juan.perez@example.com",
  "password": "password123"
}

```

-   **Respuesta (201):**
    

JSON

```
{
  "message": "Usuario creado exitosamente",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}

```

-   **Error (400):**
    

JSON

```
{
  "message": "El correo electrónico ya está en uso"
}

```

### Inicio de sesión

-   **Method:** `POST`
    
-   **Endpoint:** `/auth/login`
    
-   **Body:**
    

JSON

```
{
  "email": "juan.perez@example.com",
  "password": "password123"
}

```

-   **Respuesta (200):**
    

JSON

```
{
  "mensaje": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsIn..."
}

```

-   **Error (401):**
    

JSON

```
{
  "message": "Credenciales inválidas"
}

```

## Usuario

### Información del usuario

-   **Method:** `GET`
    
-   **Endpoint:** `/user`
    
-   **Header:** `Authorization: Bearer <token>`
    
-   **Respuesta (200):**
    

JSON

```
{
  "usuario": {
    "username": "Juan Pérez",
    "email": "juan.perez@example.com"
  },
  "progreso": [
    {
      "moduleId": 1,
      "moduleName": "Palabras",
      "lessonId": 1,
      "lessonName": "Alfabeto",
      "completadoEn": "2026-06-23T12:00:00Z"
    }
  ],
  "ultimaLeccion": {
    "moduleId": 1,
    "moduleName": "Palabras",
    "lessonId": 1,
    "lessonName": "Alfabeto"
  },
  "puntos": 50,
  "racha": 5
}

```

##  Progreso del Usuario

Endpoints para consultar y registrar el avance del usuario en módulos, lecciones, teorías y ejercicios.

---

### 1. Obtener progreso general

Obtiene el historial completo de progresos registrados para el usuario autenticado.

* **Method:** `GET`
* **Endpoint:** `/progress`
* **Header:** `Authorization: Bearer <token>`
* **Respuesta (200 OK):**

JSON

```
{
  "message": "Progreso obtenido correctamente.",
  "data": [
    {
      "id": 1,
      "userId": 17,
      "moduloId": 1,
      "leccionId": 1,
      "teoriaId": null,
      "ejercicioId": 1,
      "completadoEn": "2026-07-28T01:36:07.286Z",
      "primerIntento": "2026-07-28T01:36:07.286Z",
      "errores": 0,
      "puntos": 10
    }
  ]
}
```


### Guardar progreso (Consolidación de Validación, Puntos y Rachas)
Registra la resolución de un ejercicio o la lectura de un bloque teórico. Valida respuestas, calcula puntos (+10 si es correcto, +2 por intento de consolidación), acumula errores e incrementa la racha activa del usuario

-   **Method:** `POST`
    
-   **Endpoint:** `/progress/save-resolved`
    
-   **Header:** `Authorization: Bearer <token>`
    

#### Caso A: El usuario visualiza/completa TEORÍA

-   **Body:**
    

JSON

```
{
  "moduloId": 1,
  "leccionId": 1,
  "teoriaId": 1,
  "isTheory": true
}

```

-   **Respuesta (200):**
    

JSON

```
{
  "message": "Progreso de teoría guardado correctamente.",
  "data": {
    "id": 2,
    "userId": 17,
    "moduloId": 1,
    "leccionId": 1,
    "teoriaId": 1,
    "ejercicioId": null,
    "completadoEn": "2026-07-28T01:40:00.000Z"
  }
}

```

#### Caso B: El usuario responde un EJERCICIO

-   **Body:**
    

JSON

```
{
  "moduloId": 1,
  "leccionId": 1,
  "ejercicioId": 1,
  "respuestaUsuario": "A",
  "isTheory": false
}

```

-   **Respuesta (200):**
    

JSON

```
{
  "message": "Progreso de ejercicio procesado correctamente.",
  "esCorrecto": true,
  "puntosGanados": 10,
  "rachaActual": 1,
  "data": {
    "id": 1,
    "userId": 17,
    "moduloId": 1,
    "leccionId": 1,
    "ejercicioId": 1,
    "completadoEn": "2026-07-28T01:36:07.286Z",
    "errores": 0,
    "puntos": 10
  }
}

```

## Módulos y lecciones

### Obtener módulos

-   **Method:** `GET`
    
-   **Endpoint:** `/module`
    
-   **Respuesta (200):**
    

JSON

```
{
  "modules": [
    {
      "id": 1,
      "nombre": "Palabras",
      "descripcion": "Aprenderás palabras simples para luego generar conversaciones.",
      "lecciones": [
        {
          "id": 1,
          "titulo": "Alfabeto"
        }
      ]
    }
  ]
}

```

### Obtener lecciones y ejercicios de una lección

-   **Method:** `GET`
    
-   **Endpoint:** `/module/:moduleId/lessons/:lessonId/exercises`
    
-   **Header:** `Authorization: Bearer <token>` _(opcional para obtener status del usuario)_
    
-   **Respuesta (200 - Con inyección de URL de Supabase y estado):**
    

JSON

```
[
  {
    "id": 1,
    "titulo": "Letra A",
    "tipo": "teoria",
    "status": "completed",
    "contenidoMultimedia": "[https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/Letra_A.mp4](https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/Letra_A.mp4)"
  },
  {
    "id": 1,
    "pregunta": "¿Qué letra es?",
    "tipo": "ejercicio",
    "status": "notStarted",
    "contenidoMultimedia": "[https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/Letra_A.mp4](https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/Letra_A.mp4)"
  }
]

```

## Favoritos

### Agregar a favoritos

-   **Method:** `POST`
    
-   **Endpoint:** `/favorites`
    
-   **Header:** `Authorization: Bearer <token>`
    
-   **Body:**
    

JSON

```
{
  "teoriaId": 1
}

```

-   **Respuesta (201):**
    

JSON

```
{
  "mensaje": "Agregado a favoritos correctamente",
  "favorite": {
    "id": 1,
    "userId": 2,
    "teoriaId": 1,
    "createdAt": "2026-07-21T19:40:58.727Z"
  }
}

```

### Obtener favoritos del usuario

-   **Method:** `GET`
    
-   **Endpoint:** `/favorites`
    
-   **Header:** `Authorization: Bearer <token>`
    
-   **Respuesta (200):**
    

JSON

```
{
  "favorites": [
    {
      "id": 1,
      "createdAt": "2026-07-21T19:40:58.727Z",
      "teoria": {
        "id": 1,
        "titulo": "Letra A",
        "tipo": "teoria",
        "contenidoMultimedia": "[https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/Letra_A.mp4](https://ozrcernencngontkultp.supabase.co/storage/v1/object/public/videos-lsa/Letra_A.mp4)"
      },
      "leccion": {
        "id": 1,
        "titulo": "Alfabeto"
      },
      "modulo": {
        "id": 1,
        "nombre": "Palabras"
      }
    }
  ]
}

```

### Eliminar de favoritos

-   **Method:** `DELETE`
    
-   **Endpoint:** `/favorites/:favoriteId`
    
-   **Header:** `Authorization: Bearer <token>`
    
-   **Respuesta (200):**
    

JSON

```
{
  "mensaje": "Eliminado de favoritos correctamente"
}

```

## Log de eventos

### Obtener eventos

-   **Method:** `GET`
    
-   **Endpoint:** `/event-log`
    
-   **Respuesta (200):**
    

JSON

```
[
  {
    "id": 1,
    "userId": 2,
    "evento": "Inicio de lección",
    "properties": {},
    "timestamp": "2026-07-21T20:00:00.000Z"
  }
]

```

### Guardar evento

-   **Method:** `POST`
    
-   **Endpoint:** `/event-log`
    
-   **Header:** `Authorization: Bearer <token>`
    
-   **Body:**
    

JSON

```
{
  "evento": "Ejercicio respondido",
  "properties": { "ejercicioId": 12, "esCorrecto": true }
}

```

-   **Respuesta (201):**
    

JSON

```
{
  "createdEvent": {
    "id": 1,
    "userId": 2,
    "evento": "Ejercicio respondido",
    "properties": { "ejercicioId": 12, "esCorrecto": true },
    "timestamp": "2026-07-21T20:01:00.000Z"
  }
}

```

## Anexo: Historial de Cambios por Ramas

### Cambios en rama `feature/urls-videos-supabase-storage`

-   **Method:** `GET`
    
-   **Endpoint:** `/module/:moduleId/lessons/:lessonId/exercises`
    
-   **Respuesta (Con inyección de URL de Supabase):**
    

JSON

```
{
  "exercises": [
    {
      "id": 1,
      "titulo": "Titulo del ejercicio",
      "status": "inProgress",
      "contenidoMultimedia": "https://[id-proyecto].supabase.co/storage/v1/object/public/videos/ejercicios/video.mp4"
    }
  ]
}

```

-   **Detalle:** Se modificaron los controladores para estructurar dinámicamente las URLs públicas de los videos alojados en Supabase Storage. Además, se parchó el método `getExercises` agregando una validación previa; si la lección no contiene ejercicios cargados, la API maneja el estado de forma controlada en lugar de lanzar un error de servidor.
    

### Cambios en rama `feature/validacion-ejercicios-vacios`

-   **Method:** `GET`
    
-   **Endpoint:** `/module/:moduleId/lessons/:lessonId/exercises`
    
-   **Respuesta (Caso lección en desarrollo sin ejercicios):**
    

JSON

```
[]

```

-   **Detalle:** Se implementó una validación defensiva en el backend para detectar de forma temprana las consultas sobre lecciones que no tienen ejercicios asociados. El controlador responde con un código HTTP 200 y un array vacío, lo que garantiza que la interfaz de la aplicación pueda continuar su renderizado sin romperse.