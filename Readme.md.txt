# 💬 Talk2Me

![Talk2Me Banner](/public/og-image.jpg) **Talk2Me** es una plataforma moderna de comunicación en tiempo real diseñada para conectar amigos y mantener a los equipos al día con noticias corporativas. Además, cuenta con un asistente inteligente integrado impulsado por IA.

---

## ✨ Características Principales

* **📰 Portal de Noticias (NewsPortal):** Tablero dinámico con noticias generales y actualizaciones de la empresa.
* **👥 Feed de Amigos:** Publicación y visualización de estados en tiempo real.
* **🤖 Chatbot IA Integrado:** Asistente conversacional impulsado por la extensión Gemini de Firebase, que responde preguntas en tiempo real desde la base de datos.
* **🔐 Autenticación Segura:** Sistema de Login y Registro gestionado mediante Firebase Authentication.
* **🚀 SEO Optimizado:** Landing page pública indexable, metadatos Open Graph, sitemap, archivo robots.txt, integración con Bing Webmaster Tools y manejo de errores 404 personalizados.
* **🌙 Modo Oscuro Nativo:** Interfaz de usuario moderna y minimalista utilizando la paleta `zinc` de Tailwind CSS.

---

## 🛠️ Stack Tecnológico

**Frontend:**
* [Next.js 14](https://nextjs.org/) (App Router)
* [React 19](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)

**Backend & Infraestructura:**
* [Firebase Authentication](https://firebase.google.com/docs/auth) (Gestión de usuarios)
* [Cloud Firestore](https://firebase.google.com/docs/firestore) (Base de datos NoSQL en tiempo real)
* Firebase Extensions (Build Chatbot with Gemini)
* [Vercel](https://vercel.com/) (Hosting y Despliegue continuo)

---

## 📂 Estructura del Proyecto

La aplicación sigue la estructura recomendada de Next.js (App Router):

```text
📦 Talk2Me
 ┣ 📂 public               # Recursos estáticos (Sitemap, SEO Bing, Imágenes)
 ┣ 📂 src
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 bot            # Interfaz del Chatbot IA
 ┃ ┃ ┣ 📂 general        # Dashboard principal (Noticias y Feed protegido)
 ┃ ┃ ┣ 📂 login          # Pantalla de inicio de sesión
 ┃ ┃ ┣ 📂 signup         # Pantalla de registro
 ┃ ┃ ┣ 📜 layout.tsx     # Layout global y metadatos SEO
 ┃ ┃ ┣ 📜 not-found.tsx  # Página 404 personalizada
 ┃ ┃ ┗ 📜 page.tsx       # Landing Page pública (Optimizada para SEO)
 ┃ ┣ 📂 components       # Componentes reutilizables (ej. NewsPortal)
 ┃ ┗ 📜 firebase.ts      # Configuración y conexión con Firebase
 ┣ 📜 .npmrc             # Configuración para ignorar conflictos de React 19
 ┣ 📜 tailwind.config.ts # Configuración de estilos
 ┗ 📜 package.json       # Dependencias y scripts