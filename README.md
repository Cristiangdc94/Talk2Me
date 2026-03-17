<div align="center">

# 💬 Talk2Me

**La plataforma definitiva de comunicación corporativa y social en tiempo real.**

[![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<img src="/public/og-image.jpg" alt="Talk2Me Banner" width="100%" style="border-radius: 15px; margin-top: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.5);"/>

*Conecta con tus amigos, mantente al día con las noticias de tu empresa y chatea con nuestra IA integrada.*

</div>

---

## 📑 Tabla de Contenidos
- [✨ Características](#-características-principales)
- [📸 Vistazo a la App](#-vistazo-a-la-app)
- [🛠️ Arquitectura y Tecnologías](#️-arquitectura-y-tecnologías)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Guía de Instalación](#-guía-de-instalación)
- [🤖 Configuración del Chatbot](#-configuración-del-chatbot-firebase)
- [🗺️ Roadmap & Sprints](#-roadmap--sprints)

---

## ✨ Características Principales

| Función | Descripción |
| :--- | :--- |
| **📰 NewsPortal** | Tablero dinámico con noticias generales y actualizaciones corporativas. |
| **👥 Feed Social** | Publicación y visualización de estados en tiempo real al estilo red social. |
| **🤖 IA Integrada** | Chatbot inteligente impulsado por la extensión *Gemini* de Firebase. |
| **🔐 Seguridad** | Sistema robusto de Login y Registro gestionado por Firebase Auth. |
| **🚀 SEO Extremo** | Landing page indexable, metadatos Open Graph, Sitemap y conexión con Bing. |
| **🌙 UI Moderna** | Diseño *Dark Mode* nativo y minimalista usando Tailwind CSS (Zinc palette). |

---

## 📸 Vistazo a la App

> **Nota para el desarrollador:** *Sube un par de capturas de tu app a la carpeta `/public` y cambia los nombres de los archivos aquí abajo para que se muestren.*

<div align="center">
  <img src="https://via.placeholder.com/400x250/18181B/FFFFFF?text=Dashboard+General" alt="Dashboard View" width="48%">
  <img src="https://via.placeholder.com/400x250/18181B/FFFFFF?text=Chatbot+IA+View" alt="Chatbot View" width="48%">
</div>

---

## 🛠️ Arquitectura y Tecnologías

Talk2Me está construido sobre una arquitectura **Serverless** aprovechando lo mejor de la web moderna:

* **Frontend:** Construido con **Next.js 14 (App Router)** para un enrutamiento rápido e hidratación de componentes con **React 19**.
* **Estilos:** **Tailwind CSS** para un diseño responsivo y utilitario desde el minuto uno.
* **Backend como Servicio (BaaS):**
  * **Firebase Authentication:** Gestión de sesiones segura.
  * **Cloud Firestore:** Base de datos NoSQL en tiempo real para mensajes y posts.
  * **Firebase Extensions:** Despliegue de funciones IA en la nube sin configurar servidores.
* **Hosting:** Despliegue continuo gestionado por **Vercel**.

<div align="center">
  <img src="/Diagrama APP.png" alt="Diagrama de Arquitectura de Talk2Me" width="100%" style="border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);"/>
</div>

---

## 📂 Estructura del Proyecto

```text
📦 Talk2Me
 ┣ 📂 public               # Recursos públicos (Sitemap, SEO, Imágenes)
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 bot            # Interfaz del Chatbot IA (/bot)
 ┃ ┃ ┣ 📂 general        # Dashboard protegido (/general)
 ┃ ┃ ┣ 📂 login          # Pantalla Auth
 ┃ ┃ ┣ 📜 layout.tsx     # Metadatos globales y estructura
 ┃ ┃ ┣ 📜 not-found.tsx  # Página 404 personalizada
 ┃ ┃ ┗ 📜 page.tsx       # Landing Page (Optimizada para SEO)
 ┃ ┣ 📂 components       # Componentes UI (NewsPortal, Cards, etc.)
 ┃ ┗ 📜 firebase.ts      # Cliente de inicialización de Firebase
 ┣ 📜 .npmrc             # Resolución de conflictos (legacy-peer-deps)
 ┗ 📜 package.json       # Configuración y dependencias



