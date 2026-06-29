# 🚗 CDA Pradera — Frontend

Sistema de agendamiento de citas para un Centro de Diagnóstico Automotor (CDA). Aplicación web construida con React que permite a los usuarios registrarse, iniciar sesión y gestionar sus citas de revisión técnico-mecánica vehicular.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

---

## 📋 Tabla de contenido

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Vistas](#-vistas)
- [Instalación y uso](#-instalación-y-uso)
- [Variables de entorno](#-variables-de-entorno)

---

## 📌 Descripción

Interfaz web de CDA Pradera con diseño de dos paneles: panel izquierdo oscuro con identidad de marca y panel derecho blanco para contenido. Incluye autenticación con JWT, rutas protegidas y un flujo de agendamiento con calendario personalizado y selección de horarios disponibles.

---

## 🛠️ Tecnologías

| Tecnología | Uso |
|---|---|
| React 18 | Librería principal de UI |
| React Router DOM | Enrutamiento del lado del cliente |
| Axios | Peticiones HTTP al backend |
| react-icons | Íconos de interfaz (FaCar, MdCalendarToday, etc.) |
| CSS3 | Estilos personalizados por componente |

---

## 🖥️ Vistas

### LoginRegister
- Tabs para alternar entre **Iniciar sesión** y **Registrarse**
- Almacena `token`, `user_id` y `user_name` en `localStorage` al autenticarse
- Redirige automáticamente al home si ya existe sesión activa (`PublicRoute`)

### Home
- Saludo personalizado con el nombre del usuario y botón de cierre de sesión
- Dos tabs: **Información de cita** y **Resumen de cita**
- Calendario personalizado con navegación por mes y bloqueo de fechas pasadas
- Selector de horarios que marca las horas ya reservadas como ocupadas
- Flujo de confirmación antes de guardar la cita

### History
- Tabla con todas las citas agendadas por el usuario autenticado
- Columnas: Nombre, Fecha, Hora y Teléfono
- Botón para volver al home
- Mensaje de estado vacío cuando no hay citas registradas

---

## ⚙️ Instalación y uso

1. Clonar el repositorio:

```bash
git clone https://github.com/andresmdevco/cda-appointment-system-frontend.git
cd cda-appointment-system-frontend
```

2. Instalar las dependencias:

```bash
npm install
```

3. Crear el archivo `.env` con las variables necesarias (ver sección siguiente).

4. Asegúrarse de que el backend esté corriendo en `http://localhost:5000`.

5. Iniciar la aplicación:

```bash
npm start
```

La aplicación quedará disponible en `http://localhost:3000`.

---

## 🔐 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
REACT_APP_BACKEND_URL=http://localhost:5000/api
```