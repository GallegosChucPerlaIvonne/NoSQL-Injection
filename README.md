## Asinación: NoSQL Injection Vulnerable App
# Estructura de archivos
Este repositorio contiene una aplicación web vulnerable que demuestra un ataque de NoSQL Injection utilizando MongoDB y Node.js.
# Descripción del Proyecto
Este proyecto fue creado para Temas Especiales de Seguridad Informática. La aplicación simula un sistema de login de una empresa que utiliza MongoDB como base de datos, pero que contiene una vulnerabilidad crítica de seguridad que permite a un atacante iniciar sesión sin conocer las credenciales correctas.
# Tecnologías Utilizadas
Backend: Node.js con Express.js
Base de Datos: MongoDB Atlas
Frontend: HTML, CSS y JavaScript
Paquetes: express, mongoose, dotenv, body-parser
#Instalación y Configuración
Requisitos Previos
-Node.js (v14.0.0 o superior)
-npm (v6.0.0 o superior)
-Conexión a Internet (para acceder a MongoDB Atlas)
#Pasos de Instalación
Clonar el repositorio:
 bash git clone https://github.com/tu-usuario/nosql-injection-app.git
cd nosql-injection-app


Instalar las dependencias:
 bash
npm install


Crear un archivo .env en la raíz del proyecto con la siguiente configuración:
 MONGO_URI=mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUNAM
PORT=3000


Iniciar la aplicación:
 bash
node server.js


Acceder a la aplicación en su navegador:
 http://localhost:3000


# Estructura del Proyecto
nosql-injection-app/
├── node_modules/
├── frontend/
│   ├── frontend.html  # Interfaz de usuario
│   └── login.js       # Lógica del cliente
├── server.js          # Servidor principal con la vulnerabilidad
├── .env               # Variables de entorno (no incluido en el repositorio)
├── package.json       # Dependencias del proyecto
└── README.md          # Este archivo
# Detalles de la Vulnerabilidad
La aplicación contiene una vulnerabilidad de NoSQL Injection en el endpoint /login. El problema se encuentra en:
El esquema de usuario permite valores de tipo "Mixed" para las contraseñas:
 javascript
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  password: mongoose.Schema.Types.Mixed // Intencionalmente inseguro
}));


La consulta a la base de datos no valida ni sanitiza la entrada del usuario:
 javascript
const user = await User.findOne({ username, password });


El cliente acepta y procesa objetos JSON como contraseñas:
 javascript
try {
    passwordInput = passwordInput.replace(/'/g, '"');
    password = JSON.parse(passwordInput);
} catch {
    password = passwordInput;
}


Explotación de la Vulnerabilidad
Para explotar esta vulnerabilidad, un atacante puede:
Usar el nombre de usuario correcto (en este caso, "admin")
En lugar de una contraseña, introducir un operador de MongoDB como:
 {"$ne": null}
 Esto convierte la consulta en:
 javascript
db.users.findOne({username: "admin", password: {"$ne": null}})
 Lo que significa: "Encuentra un usuario con nombre 'admin' y cuya contraseña NO SEA null", permitiendo acceso sin conocer la contraseña real.
# Cómo Corregir la Vulnerabilidad
Para corregir esta vulnerabilidad:
Validar todas las entradas del usuario: Asegurar que las contraseñas sean siempre strings.
 javascript
if (typeof password !== 'string') {
  return res.json({ success: false });
}


No aceptar objetos como contraseñas: Eliminar la conversión JSON.
Usar esquemas estrictos: Cambiar el tipo de contraseña en el esquema.
 javascript
password: { type: String, required: true }


Implementar técnicas de hashing para las contraseñas: Usar bcrypt u otras bibliotecas de hash.
Usar middleware de validación: Como express-validator para sanitizar entradas.
#Uso de la Aplicación
Accede a la aplicación en http://localhost:3000
Intenta iniciar sesión con credenciales normales (fallará)
Explota la vulnerabilidad usando:
Usuario: admin
Contraseña: {"$ne": null}
# Otras Pruebas de Concepto
Además del ataque básico, puedes probar:
{"$gt": ""} - Encuentra documentos donde la contraseña es "mayor que" una cadena vacía
{"$in": ["password1", "password2", "admin123"]} - Intento de fuerza bruta
{"$regex": "^a"} - Encuentra contraseñas que comiencen con "a"
# Autor
Perla Ivonne Gallegos Chuc
# Advertencia Legal
Esta aplicación fue creada con fines educativos únicamente. El uso de técnicas de NoSQL Injection en sistemas sin autorización expresa es ilegal y puede resultar en consecuencias legales graves. El autor no se hace responsable del mal uso de esta información.
# Referencias

