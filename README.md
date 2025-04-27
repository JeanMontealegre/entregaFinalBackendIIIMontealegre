# 🚀 Entrega Final Backend III

Proyecto desarrollado para la entrega final del curso Backend III.

Realizado por: **Jean Montealegre**

---

## 📋 Descripción General

Este proyecto es una API RESTful que permite la gestión de productos, carritos de compras y usuarios mockeados.  
Está implementado usando Node.js, Express, MongoDB y desplegado mediante Docker, con documentación automática utilizando Swagger.

---

## 📦 Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js + JWT
- Faker.js
- Docker
- Swagger (OpenAPI 3.0)

---

## 📁 Estructura del Proyecto

```plaintext
/src
  /config          --> Configuraciones (Passport, etc.)
  /controllers     --> Controladores de rutas
  /dao             --> Data Access Objects (DAO)
  /db              --> Conexión a MongoDB
  /docs            --> Documentación Swagger (swagger.yaml)
  /models          --> Modelos de Mongoose
  /routes          --> Rutas Express
  /utils           --> Utilidades (JWT, bcrypt)
  /views           --> Vistas Handlebars
/screenshots       --> Evidencias de ejecución
Dockerfile         --> Configuración del contenedor
.env.example       --> Variables de entorno de ejemplo
package.json       --> Configuraciones y dependencias
README.md          --> Este documento

## 🌐 Links Externos

- 📦 **Imagen Docker Hub:** [https://hub.docker.com/r/jeanmontealegre/entrega-final-backendiii](https://hub.docker.com/r/jeanmontealegre/entrega-final-backendiii)
- 🧩 **Repositorio GitHub:** [https://github.com/jeanmontealegre/entrega-final-backendIII](https://github.com/jeanmontealegre/entrega-final-backendIII)
