# Starter Template with React Navigation

This is a minimal starter template for React Native apps using Expo and React Navigation.

It includes the following:

- Example [Native Stack](https://reactnavigation.org/docs/native-stack-navigator) with a nested [Bottom Tab](https://reactnavigation.org/docs/bottom-tab-navigator)
- Web support with [React Native for Web](https://necolas.github.io/react-native-web/)
- TypeScript support and configured for React Navigation
- Automatic [deep link](https://reactnavigation.org/docs/deep-linking) and [URL handling configuration](https://reactnavigation.org/docs/configuring-links)
- Theme support [based on system appearance](https://reactnavigation.org/docs/themes/#using-the-operating-system-preferences)
- Expo [Development Build](https://docs.expo.dev/develop/development-builds/introduction/) with [Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)

## Getting Started

1. Create a new project using this template:

   ```sh
   npx create-expo-app@latest --template react-navigation/template
   ```

2. Edit the `app.json` file to configure the `name`, `slug`, `scheme` and bundle identifiers (`ios.bundleIdentifier` and `android.bundleIdentifier`) for your app.

3. Edit the `src/App.tsx` file to start working on your app.

## Running the app

- Install the dependencies:

  ```sh
  npm install
  ```

- Start the development server:

  ```sh
  npm start
  ```

- Build and run iOS and Android development builds:

  ```sh
  npm run ios
  # or
  npm run android
  ```

- In the terminal running the development server, press `i` to open the iOS simulator, `a` to open the Android device or emulator, or `w` to open the web browser.

## Notes

This project uses a [development build](https://docs.expo.dev/develop/development-builds/introduction/) and cannot be run with [Expo Go](https://expo.dev/go). To run the app with Expo Go, edit the `package.json` file, remove the `expo-dev-client` package and `--dev-client` flag from the `start` script.

We highly recommend using the development builds for normal development and testing.

The `ios` and `android` folder are gitignored in the project by default as they are automatically generated during the build process ([Continuous Native Generation](https://docs.expo.dev/workflow/continuous-native-generation/)). This means that you should not edit these folders directly and use [config plugins](https://docs.expo.dev/config-plugins/) instead. However, if you need to edit these folders, you can remove them from the `.gitignore` file so that they are tracked by git.

## Resources

- [React Navigation documentation](https://reactnavigation.org/)
- [Expo documentation](https://docs.expo.dev/)

---

Demo assets are from [lucide.dev](https://lucide.dev/)

# 📱 Proyecto Innova — Aplicación de Aprendizaje de Lengua de Señas Argentina (LSA)

Bienvenido al repositorio del equipo de Frontend (Grupo 5). Esta aplicación está construida utilizando **React Native**, **Expo** (compatible con Expo Go), **TypeScript** y **NativeWind (Tailwind CSS)**.

---

## 🚀 Cómo correr la aplicación localmente

1. Instalar las dependencias del proyecto:
```sh
   npm install

2. Iniciar el servidor de desarrollo de Expo:

Bash
   npm start


3. Escanear el código QR desde la aplicación Expo Go en tu dispositivo móvil (asegúrate de tener la app actualizada a la última versión desde la Play Store/App Store).

🔀 1. Flujo de Git y Ramas (GitFlow)
Siguiendo las especificaciones globales del proyecto, el flujo de ramificación para nuestro rol se organiza de la siguiente manera:

Plaintext
develop (Integración general de todos los roles)
  ↑ (Mediante Pull Request revisado por el equipo)
frontend (Rama madre de nuestro rol)
  ↑ (Merge interno cuando la tarea esté lista)
feature/frontend-[nombre-tarea] (Nuestras ramas individuales)


🛠️ Comandos obligatorios para trabajar:
1. Sincronizar rama madre: Antes de crear cualquier rama local, trae los últimos cambios del servidor:

Bash
   git checkout frontend
   git pull origin frontend

2. Crear rama de tarea: Usa obligatoriamente el prefijo feature/frontend-:

Bash
    git checkout -b feature/frontend-routing-base

3. Subir cambios: Al finalizar, sube tu rama a GitHub:

Bash
   git push origin feature/frontend-tu-tarea


⚠️ Regla de Oro: Queda estrictamente prohibido hacer commits directos sobre las ramas frontend, develop o main. Los pasos a la rama madre se integran tras revisión interna.

📋 2. Reglas del Tablero Kanban (GitHub Project)
El seguimiento se realiza en el GitHub Project oficial.

-Cada Issue o Tarea creada por el equipo debe llevar asignada obligatoriamente la etiqueta "frontend".

-Ningún integrante puede comenzar a programar una tarea sin antes mover el Issue correspondiente a la columna "In Progress" y autoasignarse la tarjeta.

🏗️ 3. Criterios de Arquitectura por Funcionalidades (Features)
El proyecto se organiza bajo el patrón de Desarrollo Guiado por Características. Cada módulo del MVP es independiente dentro de src/features/.

Anatomía de una Feature:
/screens: Pantallas completas que se conectan de forma directa al sistema de navegación (ej: LoginScreen.tsx).

/components: Componentes de interfaz exclusivos de esta funcionalidad (ej: LoginForm.tsx).

/hooks: Lógica de React y estados específicos de esta funcionalidad.

Criterio de Reutilización (Código Compartido):

Si un componente visual se utiliza en dos o más features distintas (ej: botones principales, contenedores), se debe programar dentro de la carpeta global de elementos atómicos: src/components/ui/.

Si un servicio conecta con APIs globales, se almacena en src/services/api/.

🎨 4. Estilos con Tailwind (NativeWind) y TypeScript
Estilos Consistentes: Para paddings, márgenes y layouts, utilizar múltiplos de 4 de Tailwind (p-4, p-6, m-2) para mantener la simetría de la interfaz.

Colores de la App: No se permite usar valores de colores hardcodeados (ej: text-[#2563eb]). Se deben emplear las clases de color definidas en el tema global o en src/constants/colors.ts.

Desarrollo Orientado a Especificaciones (Mocks): Antes de programar interfaces dinámicas, se deben tipar los contratos de datos en src/types/common.types.ts. Los archivos de src/data/mocks/ deben imitar fielmente estas estructuras de datos.

