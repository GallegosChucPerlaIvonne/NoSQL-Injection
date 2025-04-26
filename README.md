Asinación: Crear una aplicación que sea vulnerable ante una iinyección NoSQL

Grupo: 2061

De: Gallegos Chuc Perla Ivonne

Objetivo: Crear una aplicación que sea vulnerable ante un ataque NoSQL y que este conectado a la base de datos de MondoDB se recomienda utilizar nodejs y javascript para su desarrollo

Descripción: La aplicación le indica al usuario como debe realizar el ejercicio de tal forma de que haga un inyección NoSQL. 

Aclaración: Pensé que teníamos que elaborar un ejercicio practico parecido a los ejercicios de picoCTF realizados en clase, entonces me guie con uno de ellos, es decir, no lo puse dentro de un contexto implicito sino en uno explicito, indicandole al usuario que debe hacer y dandole pistas de como ingresar. 


Backend: Node.js con Express.js

Base de Datos: MongoDB

Frontend: HTML, CSS y JavaScript

Para esto se ocupo de la instalación y configuración de: Node.js y npm
Se clona el repositorio: bash git clone https://github.com/tu-usuario/nosql-injection-app.git
cd nosql-injection-app
Instalar las dependencias:bash, npm install
Luego se creo un archivo .env en la raíz del proyecto: MONGO_URI=mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUNAM PORT=3000
Se inicio la aplicación bash y node server.js y se accedió a la aplicación desde el navegador, entonces a partir de ahí se ve la aplicación que contiene una vulnerabilidad de NoSQL Injection en el endpoint /login. El usuario tendrá que resolver el problema por medio del uso de valores de tipo "Mixed" para las contraseñas el cual se desarrollo así para que fuese fácil de resolver. Cabe mencionar que la consulta a la base de datos no valida ni sanitiza la entrada del usuario. Por ello la aplicación acepta y procesa objetos JSON como contraseñas

Explotación de la Vulnerabilidad - solución: el usuario debe usar el nombre de usuario correcto (en este caso, "admin") y en lugar de una contraseña, introducir un operador de MongoDB

Lo que falto añadir: implementación de hashing para las contraseñas
