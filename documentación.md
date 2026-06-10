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
		"username": "Juan Pérez",
		"email": "juan.perez@example.com",
		"password": "password123"
	}
	```
	Respuesta:
	```json
	{
		"mensaje": "Usuario creado exitosamente",
		"userId": 1
	}
	```
	Error:
	```json
	{
		"error": "El correo electrónico ya está en uso"
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
		"userId": 1
	}
	```
	Error:
	```json
	{
		"error": "Correo electrónico o contraseña incorrectos"
	}
	```

## Usuario

- Información del usuario

	Method: GET

	Endpoint: /user/{userId}

	Respuesta:
	```json
	{
		"usuario": {
			"userId": 1,
			"username": "Juan Pérez",
			"email": "juan.perez@example.com"
		},
		"progreso": [
			{
				"ModuleId": 1,
				"LessonId": [1, 2, 3]
			},
			{
				"ModuleId": 2,
				"LessonId": [4]
			}
		],
		"ultimaLeccion": {
			"ModuleId": 1,
			"LessonId": [3]
		},
		"puntos": 50,
		"logros": [
			{
				"id": 1,
				"nombre": "Logro 1",
				"descripcion": "Descripción del logro 1"
			}
		]
	}
	```
	Error:
	```json
	{
		"error": "No se pudo obtener la información del usuario"
	}
	```

## Progreso del usuario

- Obtener progreso

	Method: GET

	Endpoint: /progress/{userId}

	Respuesta:
	```json
	{
		"progreso": [
			{
				"ModuleId": 1,
				"LessonId": [1, 2, 3]
			},
			{
				"ModuleId": 2,
				"LessonId": [4]
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

- Actualizar progreso

	Method: POST

	Endpoint: /progress/{userId}

	Body:
	```json
	{
		"ModuleId": 1,
		"LessonId": [4]
	}
	```
	Respuesta:
	```json
	{
		"mensaje": "Progreso actualizado exitosamente"
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
				"contenido": "Contenido de la lección",
				"videoUrl": "https://..."
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
			"contenido": "Contenido de la lección",
			"videoUrl": "https://..."
		}
	}
	```
	Error:
	```json
	{
		"error": "No se pudo obtener la lección especificada"
	}
	```

## Favoritos

- Agregar favorito

	Method: POST

	Endpoint: /favorites

	Body:
	```json
	{
		"userId": 1,
		"leccionId": 3
	}
	```
	Respuesta:
	```json
	{
		"mensaje": "Lección agregada a favoritos",
		"favorite": {
			"id": 1,
			"userId": 1,
			"leccionId": 3,
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

	Endpoint: /favorites/{userId}

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

	Endpoint: /favorites/{id}

	Respuesta:
	```json
	{
		"mensaje": "Lección eliminada de favoritos"
	}
	```
	Error:
	```json
	{
		"error": "No se pudo eliminar de favoritos"
	}
	```

## Respuesta del usuario a una lección

- Validar respuesta

	Method: POST

	Endpoint: /answer/validate

	Body:
	```json
	{
		"userId": 1,
		"ModuleId": 1,
		"LessonId": 3,
		"respuesta": "Respuesta del usuario"
	}
	```
	Respuesta:
	```json
	{
		"correcta": true,
		"puntos": 10
	}
	```
	Error:
	```json
	{
		"error": "No se pudo validar la respuesta del usuario"
	}
	```

- Guardar resultado

	Method: POST

	Endpoint: /answer/save

	Body:
	```json
	{
		"userId": 1,
		"ModuleId": 1,
		"LessonId": [3],
		"correcta": true,
		"puntos": 10
	}
	```
	Respuesta:
	```json
	{
		"mensaje": "Resultado guardado exitosamente"
	}
	```
	Error:
	```json
	{
		"error": "No se pudo guardar el resultado del usuario"
	}

## Logros del usuario

- Obtener logros del usuario

	Method: GET

	Endpoint: /user/{userId}/logros

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
```	```