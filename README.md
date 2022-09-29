# Proyecto Final - Curso Coder Backend

## Consigna: 
Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar
dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones
básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada
contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con
Carritos.

## Aspectos a incluir en el entregable:
* A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects),
y pueden ir todas incluidas en una misma carpeta de ‘daos’.

* En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia
de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará
en base al valor de una variable de entorno cargada al momento de ejecutar el servidor
(opcional: investigar el uso de imports dinámicos).

* Incluir un archivo de configuración (config) que contenga los datos correspondientes para
conectarse a las bases de datos o medio de persistencia que corresponda.

### Opcional
* Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

<sup>Formato de entrega: link a un repositorio en Github con los tres proyectos en
carpetas separadas. No incluir los node_modules.</sup>

# Como ejecutar el proyecto
### En tu pc
- Antes que nada debes tener instalado en tu pc node.js
- Debes clonar el repositorio
- Abrir una terminal y en ella dirigirte a la carpeta con el nombre del proyecto
- Ejecutar el comando ``` npm install ```
- Una vez finalizado el punto anterior, ejecutar el comando ``` npm run start ```
- Luego puedes utilizar Postman, insomia o tu programa favorito para testear los diferentes 
endpoints