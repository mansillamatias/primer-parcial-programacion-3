# Evaluación 1 - Programación III
**Tecnicatura Universitaria en Programación - UTN (A Distancia)**

## ✍️ Descripción

El objetivo de esta evaluación es consolidar los conocimientos adquiridos en las 
primeras unidades del cursado (HTML, CSS, JavaScript y TypeScript), mediante la 
evolución del proyecto Food Store hacia una aplicación frontend más dinámica e 
interactiva. 

Este proyecto consiste en la evolución de la aplicación **Food Store** hacia una plataforma dinámica e interactiva utilizando **Vite** y **TypeScript**. Se implementó un catálogo de productos con funcionalidades de búsqueda y filtrado, además de un sistema de carrito de compras con persistencia local.

---

## 🚀 Funcionalidades Implementadas
Basado en los requerimientos obligatorios y las Historias de Usuario (HU):

- **Catálogo de Productos:** Renderizado dinámico desde un origen de datos.
- **Búsqueda y Filtrado (HU-P1-01/02):** Buscador por nombre y filtros por categoría desde el menú lateral.
- **Carrito con Persistencia (HU-P1-03):** Gestión de productos agregados mediante `localStorage` para evitar pérdida de datos al recargar.
- **Visualización y Totales (HU-P1-04/05):** Vista detallada del carrito con nombre, precio, cantidad y cálculo automático del total general.

---

## 🛠️ Tecnologías Utilizadas
El desarrollo se realizó exclusivamente con tecnologías nativas según la consigna
- **HTML5** y **CSS3** 
- **JavaScript** y **TypeScript** 
- **Vite** como herramienta de construcción 
- **pnpm** como gestor de paquetes recomendado

---

## 📂 Estructura del Proyecto
Se respetó la organización de carpetas solicitada:
- `src/pages/store/home/`: Lógica y vista del catálogo.
- `src/pages/store/cart/`: Lógica y vista del carrito.
- `src/types/`: Definición de interfaces (`Product`, `CartItem`, `Icategoria`).
- `src/data/`: Origen de datos y categorías.

---

## ⚠️ ¡Importante! Nivel de Seguridad

La protección de rutas implementada en este proyecto **NO ES SEGURA** y no debe utilizarse en un entorno de producción.

- **Razón**: La lógica de autenticación se basa en datos guardados en `localStorage` en el navegador del usuario.
- **Riesgo**: Cualquier usuario con conocimientos técnicos básicos puede abrir las herramientas de desarrollador del navegador para inspeccionar, modificar o eliminar los datos de `localStorage`, obteniendo así acceso no autorizado a rutas protegidas.

Este enfoque es útil únicamente para fines de aprendizaje y para prototipos de bajo riesgo. La seguridad real debe implementarse en el **backend**.

---

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).