# Documentación de uso de la API

## Usuario

- Creación de usuario

	Method: POST

	Endpoint: /auth/register
	
	Body:
  	```json
	{
		"nombre": "Juan Pérez",
		"email": "juan.perez@example.com",
		"contraseña": "password123"
	}
	```
	Respuesta:
	```json
	{
		"mensaje": "Usuario creado exitosamente",
		"usuario_id": 1
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
		"contraseña": "password123"
	}
	```
	Respuesta:
	```json
	{
		"mensaje": "Inicio de sesión exitoso",
		"usuario_id": 1
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
			"id": 1,
			"nombre": "Juan Pérez",
			"email": "juan.perez@example.com"
		},
		"progreso": {
			{
			"idModulo": 1,
			"idLeccion": 3
			},
			{
			"idModulo": 2,
			"idLeccion": 1
			}
		},
		"ultima_leccion": {
			"idModulo": 1,
			"idLeccion": 3
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
			"idModulo": 1,
			"idLeccion": 3
			},
			{
			"idModulo": 2,
			"idLeccion": 1
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
		"idModulo": 1,
		"idLeccion": 4
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
		"idUsuario": 1,
		"idModulo": 1,
		"idLeccion": 3,
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
		"idUsuario": 1,
		"idModulo": 1,
		"idLeccion": 3,
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