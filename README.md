# 🐳 Docker Libre - Electron + React + Webpack

Este proyecto es una base moderna para crear aplicaciones de escritorio utilizando **Electron**, **React** y **Webpack**. Ideal para quienes buscan una arquitectura modular y escalable, sin depender de frameworks pesados.

---





## 🚀 Características

- ⚛️ Interfaz con React y JSX
- 🔧 Empaquetado con Webpack 5
- 💡 Arquitectura lista para desarrollo modular
- 🪟 Controles de ventana personalizados (minimizar, maximizar, cerrar)
- 🖥️ Empaquetado como aplicación de escritorio con Electron

---

## 📦 Requisitos

Para correr este proyecto necesitas tener instalado:

- [Node.js](https://nodejs.org/) v18 o superior (Recomendado: v22+)
- [npm](https://www.npmjs.com/) (v10+)
- [Git](https://git-scm.com/) (opcional pero recomendado)
- Un sistema operativo compatible con Electron (Windows, macOS o Linux)

Puedes comprobar si están correctamente instalados ejecutando en tu terminal:

``` bash
node -v         # Debe mostrar: v22.14.0 o similar
npm -v          # Debe mostrar: 10.9.2 o similar
git --version   # Debe mostrar: 2.49.0 o similar
```


## Comandos iniciales

Todo esto debe de hacerce en la rama de desarrollo y no debe deberia modificar los archivos **package-lock.json** ni **package.json**


si estan en linux o windows ejecutar el siguiente comando que les creara la carpeta **node_modules**
``` bash
npm install electron@25
```

para iniciar por primera vez el proyecto, lo que hara este comando es compilar todo el proyecto para su ejecucion correcta lo que deberia abriles la ventana

``` bash
npm start
```

este comando se usara mientras estás programando y probando. lo que hara facil el desarrollo para recargar el proyecto en tiempo real con el comando **ctrl-r**
``` bash
npm run dev
```
