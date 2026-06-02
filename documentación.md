# Documentación de uso de la API

## Usuario

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

- Informacion del usuario

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
		"progreso": {
			{
			"ModuleId": 1,
			"LessonId": 3
			},
			{
			"ModuleId": 2,
			"LessonId": 1
			}
		},
		"ultima_leccion": {
			"ModuleId": 1,
			"LessonId": 3
		},
		"rachaConección": 5

	}
	```
	Error:
	```json
	{
		"error": "No se pudo obtener la información del usuario"
	}
	```
## Progreso del usuario

- Progreso del usuario

	Method: GET

	Endpoint: /user/{userId}/progress

	Respuesta:
	```json
	{
		"progreso": {
			{
			"ModuleId": 1,
			"LessonId": 3
			},
			{
			"ModuleId": 2,
			"LessonId": 1
			}
		}
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

	Endpoint: /user/{userId}/progress

	Body:
	```json
	{
		"ModuleId": 1,
		"LessonId": 4
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
		"modulos": [
		{
			"id": 1,
			"nombre": "Módulo 1",
			"descripcion": "Descripción del módulo 1"
		},
		{
			"id": 2,
			"nombre": "Módulo 2",
			"descripcion": "Descripción del módulo 2"
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
		"lecciones": [
		{
			"id": 1,
			"titulo": "Lección 1",
			"contenido": "Contenido de la lección 1"
		},
		{
			"id": 2,
			"titulo": "Lección 2",
			"contenido": "Contenido de la lección 2"
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
		"leccion": {
		"id": 1,
		"titulo": "Lección 1",
		"contenido": "Contenido de la lección 1"
		}
	}
	```
	Error:
	```json
	{
		"error": "No se pudo obtener la lección especificada"
	}
	```

## Respuesta del usuario a una lección

- Recibir respuesta

	Method: POST

	Endpoint: /respuesta/validar

	Body:
	```json
	{
		"userId": 1,
		"ModuleId": 1,
		"LessonId": 3,
		"respuesta": "Respuesta del usuario a la lección"
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

	Endpoint: /respuesta/guardar

	Body:
	```json
	{
		"userId": 1,
		"ModuleId": 1,
		"LessonId": 3,
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
	```