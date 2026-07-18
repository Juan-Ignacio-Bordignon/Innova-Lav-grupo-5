# Documentación de uso de la API
## Descripción general
Esta API proporciona endpoints para la gestión de usuarios, progreso del usuario, módulos, lecciones, favoritos y validación de respuestas. A continuación se detallan los endpoints disponibles, los métodos HTTP correspondientes, los cuerpos de las solicitudes y las respuestas esperadas.
## Configuración y uso
1. Clonar el repositorio del proyecto.
2. Navegar al directorio del proyecto e instalar las dependencias:
    ```bash
    cd innovalab-grupo5
    npm install
    ```
3. Configurar las variables de entorno necesarias en el archivo `.env`:
    ```
    DATABASE_URL="postgresql://..."
    DIRECT_URL="postgresql://..."
    ```
4. Generar el cliente de Prisma:
    ```bash
    npx prisma generate
    ```
5. Iniciar el servidor:
    ```bash
    npm start
    ```
    O en modo desarrollo:
    ```bash
    npm run dev
    ```
## Requisitos previos
- Node.js instalado en el sistema.
- npm (Node Package Manager) para gestionar las dependencias del proyecto.
- Credenciales de la base de datos Supabase (solicitarlas al equipo de backend).
# Endpoints de la API
## Autenticación
- Creación de usuario
    Method: POST
    Endpoint: /auth/register
    Body:
    ```json
    {
        "nombre": "Juan Pérez",
        "email": "juan.perez@example.com",
        "password": "password123"
    }
    ```
    Respuesta:
    ```json
    {
        "message": "Usuario creado exitosamente",
        "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```
    Error:
    ```json
    {
        "message": "El correo electrónico ya está en uso"
    }
    ```
    O en caso de algunos campos faltantes o inválidos:
    ```json
    {
        "errors": [
        {
        "type": "field",
        "value": "",
        "msg": "El nombre es obligatorio",
        "path": "nombre",
        "location": "body"
        },
        {
        "type": "field",
        "value": "",
        "msg": "Debe ingresar un email válido",
        "path": "email",
        "location": "body"
        },
        {
        "type": "field",
        "value": "",
        "msg": "La contraseña debe tener al menos 6 caracteres",
        "path": "password",
        "location": "body"
        }
    ]
    }
    ```
- Inicio de sesión
    Method: POST
    Endpoint: /auth/login
    Body:
    ```json
    {
        "email": "juan.perez@example.com",
        "password": "password123"
    }
    ```
    Respuesta:
    ```json
    {
        "mensaje": "Inicio de sesión exitoso",
        "token": "eyJhbGciOiJIUzI1NiIsIn..."
    }
    ```
    Error:
    ```json
    {
        "message": "Credenciales inválidas"
    }
    ```
## Usuario
- Información del usuario
    Method: GET
    Endpoint: /user
    Header: {Authorization: "Bearer `token`",}
    Respuesta:
    ```json
    {
        "usuario": {
            "username": "Juan Pérez",
            "email": "juan.perez@example.com"
        },
        "progreso": [
            {
                "moduleId": 1,
                "moduleName": "Nombre del módulo",
                "lessonId": 1,
                "lessonName": "Nombre de la lección",
                "exerciseId": 1,
                "exerciseName": "Nombre del ejercicio",
                "completadoEn":  "2026-06-23T12:00:00Z",
            },
            {
                "moduleId": 1,
                "moduleName": "Nombre del módulo",
                "lessonId": 1,
                "lessonName": "Nombre de la lección",
                "exerciseId": 2,
                "exerciseName": "Nombre del ejercicio",
                "completadoEn":  "2026-06-23T12:00:00Z",
            }
        ],
        // Trae la última lección (completada o no) del usuario
        "ultimaLeccion": {
            "moduleId": 1,
            "moduleName": "Nombre del módulo",
            "lessonId": 1,
            "lessonName": "Nombre de la lección",
            "exerciseId": 1,
            "exerciseName": "Nombre del ejercicio",
            "completadoEn":  "2026-06-23T12:00:00Z",
        },
        "puntos": 50,
        "racha": 5,
        "logros": [
            {
                "id": 1,
                "nombre": "Logro 1",
                "descripcion": "Descripción del logro 1",
                "icono": "🏆",
            },
            {
                "id": 2,
                "nombre": "Logro 2",
                "descripcion": "Descripción del logro 2",
                "icono": "🎖️",
            }
        ]
    }
    ```
    Error:
    ```json
    { "error": "Usuario no encontrado" }
    ```
    O
    ```json
    {
        "error": "No se pudo obtener la información del usuario"
    }
    ```
## Progreso del usuario
- Obtener progreso
    Method: GET
    Endpoint: /progress
    Header: {Authorization: "Bearer `token`",}
    Respuesta:
    ```json
    {
    "progreso": [
            {
            "moduloId": 1,
            "modulo": {
                "nombre": "Palabras"
            },
            "leccionId": 1,
            "leccion": {
                "titulo": "Alfabeto"
            },
            "ejercicioId": 1,
            "ejercicio": {
                "titulo": "Letra A"
            },
            "errores": 0,
            "puntos": 0,
            "primerIntento": "2026-06-30T20:03:50.000Z",
            "completadoEn": "2026-06-30T20:03:50.000Z"
            }
        ]
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudo obtener el progreso del usuario"
    }
    ```

- Guardar progreso resolutivo (Consolidación de Validación, Puntos y Rachas)
    Method: POST
    Endpoint: /progress/save-resolved
    Header: {Authorization: "Bearer `token`"}
    
    Caso A: El usuario visualiza una pantalla de TEORÍA
    Body:
    ```json
    {
        "moduloId": 1,
        "lessonId": 3,
        "teoriaId": 5,
        "isTheory": true
    }
    ```
    
    Caso B: El usuario resuelve un EJERCICIO
    Body:
    ```json
    {
        "moduloId": 1,
        "lessonId": 3,
        "ejercicioId": 12,
        "respuestaUsuario": "Opción A",
        "isTheory": false
    }
    ```
    
    Respuesta:
    ```json
    {
        "message": "Progreso de ejercicio procesado, puntos y racha actualizados.",
        "esCorrecto": true,
        "puntosGanados": 10,
        "rachaActual": 5
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudo actualizar el progreso del usuario"
    }
    ```

## Módulos y lecciones
- Obtener módulos
    Method: GET
    Endpoint: /module
    Respuesta:
    ```json
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
                    },
                    {
                        "id": 2,
                        "titulo": "Días de la semana"
                    }
                ]
            }
        ]
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudieron obtener los módulos"
    }
    ```
- Obtener lecciones de un módulo
    Method: GET
    Endpoint: /module/{moduleId}/lessons
    Respuesta:
    ```json
    {
        "lessons": [
            {
                "id": 1,
                "titulo": "Alfabeto",
                "contenido": "Contenido de la lección"
            }
        ]
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudieron obtener las lecciones para el módulo especificado"
    }
    ```
- Obtener lección específica
    Method: GET
    Endpoint: /module/{moduleId}/lessons/{lessonId}
    Respuesta:
    ```json
    {
        "lesson": {
            "id": 1,
            "titulo": "Alfabeto",
            "contenido": "Contenido de la lección"
        }
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudo obtener la lección especificada"
    }
    ```
- Obtener ejercicios de una lección
    Method: GET
    Endpoint: module/{moduleId}/lessons/{lessonId}/exercises
    Respuesta:
    ```json
    {
        "exercises": [
            {
            "id": 1,
            "titulo": "Titulo del ejercicio",
            "status": "completed",// Puede ser "completed", "inProgress" o "notStarted"
            "contenidoMultimedia": "Link a contenido multimedia"
            }
        ]
    }
## Favoritos
- Agregar favorito
    Method: POST
    Endpoint: /favorites
    Header: {Authorization: "Bearer `token`",}
    Body:
    ```json
    {
        "exerciseId": 3
    }
    ```
    Respuesta:
    ```json
    {
        "mensaje": "Lección agregada a favoritos",
        "favorite": {
            "id": 1,
            "userId": 1,
            "exerciseId": 3,
            "createdAt": "2026-06-09T00:00:00.000Z"
        }
    }
    ```
    Error:
    ```json
    {
        "error": "Esta lección ya está en favoritos"
    }
    ```
- Obtener favoritos del usuario
    Method: GET
    Endpoint: /favorites
    Header: {Authorization: "Bearer `token`",}
    Respuesta:
    ```json
    {
        "favorites": [
            {
                "id": 1,
                "userId": 1,
                "leccionId": 3,
                "createdAt": "2026-06-09T00:00:00.000Z",
                "leccion": {
                    "id": 3,
                    "titulo": "Días de la semana",
                    "contenido": "...",
                    "videoUrl": "https://..."
                }
            }
        ]
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudieron obtener los favoritos"
    }
    ```
- Eliminar favorito
    Method: DELETE
    Endpoint: /favorites/:exerciseId
    Header: {Authorization: "Bearer `token`",}
    
    Respuesta:
    ```json
    {
        "mensaje": "Ejercicio eliminado de favoritos"
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudo eliminar de favoritos"
    }
    ```

## Logros del usuario
- Obtener logros del usuario
    Method: GET
    Endpoint: /user/logros
    Header: {Authorization: "Bearer `token`",}
    Respuesta:
    ```json
    {
        "logros": [
            {
                "id": 1,
                "logroId": 1,
                "fechaObtenido": "2026-06-10T00:00:00.000Z",
                "logro": {
                    "id": 1,
                    "nombre": "Sin Errores",
                    "descripcion": "Completaste una lección sin errores",
                    "icono": "🏆"
                }
            }
        ]
    }
    ```
    Error:
    ```json
    {
        "error": "No se pudieron obtener los logros del usuario"
    }
    ``` 
## Log de eventos 
- Obtener toda información en el registro
    Method: GET
    Endpoint:/event-log
    Respuesta:
    ```json
    [   {
        "id":"1",
        "userId":"1",
        "evento":"Nombre de evento",
        "properties":{},
        "timestamp":"2026-06-10T00:00:00.000Z",
        },
        {
        "id":"2",
        "userId":"1",
        "evento":"Nombre de evento",
        "properties":{},
        "timestamp":"2026-06-10T00:00:00.000Z",
        }
    ]
    ```
    El contenido de "properties" varia dependiendo del evento registrado
- Guardar toda información en el registro
    Method: POST
    Endpoint:/event-log
    Header: {Authorization: "Bearer `token`",}
    Body:
    ```json
    {
        "evento":"Nombre de evento",
        "properties":{},
    }
    ```
    Respuesta:
    ```json
    {
        "createdEvent": {
        "id": 1,
        "userId": 1,
        "evento": "Nombre de evento",
        "properties": {},
        "timestamp": "2026-06-23T21:01:42.649Z"
        }
    }
    ```
    El contenido de "properties" varia dependiendo del evento registrado

Cambios en rama feature/urls-videos-supabase-storage

    Method: GET

    Endpoint: /module/{moduleId}/lessons/{lessonId}/exercises

    Respuesta (Con inyección de URL de Supabase):
    ```json
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

    Detalle:
    Se modificaron los controladores para estructurar dinámicamente las URLs públicas de los videos alojados en Supabase Storage. Además, se parchó el método `getExercises` agregando una validación previa; si la lección no contiene ejercicios cargados, la API maneja el estado de forma controlada en lugar de lanzar un error de servidor.

	Cambios en rama feature/validacion-ejercicios-vacios

    Method: GET

    Endpoint: /module/{moduleId}/lessons/{lessonId}/exercises

    Respuesta (Caso lección en desarrollo sin ejercicios):
    ```json
    []
    ```

    Detalle:
    Se implementó una validación defensiva en el backend para detectar de forma temprana las consultas sobre lecciones que no tienen ejercicios asociados. El controlador responde con un código HTTP 200 y un array vacío, lo que garantiza que la interfaz de la aplicación pueda continuar su renderizado sin romperse.

