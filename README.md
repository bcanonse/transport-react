# Transport App

## Proyecto seminario Analisis y Diseño

![version](https://img.shields.io/badge/version-1.1.0-blue.svg) ![license](https://img.shields.io/badge/license-MIT-blue.svg)

![Transport App](https://i.imgur.com/HBhU6kL.png)

### Herramientas utilizadas para la creación del proyecto.

Para la creación del proyecto se utilizaron librerías como ReactJS y Tailwind. ReactJS es una librería para Javascript, una de las más utilizadas para crear aplicaciones web. Por otro lado Tailwind es una librería para el estilizado de páginas web se acopla muy bien con el lenguaje de maquetado HTML y permite crear interfaces de usuario atractivas.

Para el consumo de información o datos se utiliza como servicios Firebase. Un SDK de Google que tiene varias aplicaciones para consumir manejar datos, manejo de archivos y autenticación. 

Para este proyecto se utilizan los 3 antes mencionados, la base de datos que se utiliza es una NoSQL, se maneja bucket para subir imágenes de los productos y la autentación básica para la seguridad de la información.

No dejando atrás el uso de NodeJS, como herramienta para la ejecución de Javascript fuera de un navegador y el uso npm para el manejo de paquetes utilizados en el proyecto.

ReactJS utiliza el concepto de componentes, por consiguiente, cada parte de la aplicación web esta separada por componentes, para una mejor comprensión del código y separación de responsabilidades.

Este tipo de herramientas permite realizar aplicaciones web de alto rendimiento y creación de interfaces bonitas y responsivas.

La aplicación web, tiene configuración básica para ser utilizada como PWA, aclarando que no está configurado para el uso de datos sin conexión a internet. Hace falta configurar más, pero se trabajará en ello.

### Como iniciar con el proyecto.

- Instalar NodeJS **LTS** desde <a href="https://nodejs.org/en/?ref=creativetim">NodeJs Página oficial</a>
- Descargar el proyecto ya sea como archivo comprimido o bien clonarlo con Git
- Descomprimir el archivo descargado o si se clono, dirigerse al directorio del proyecto
- Si esta utilizando Linux, se puede ejecutar el siguiente comando `npm run install:clean` (Este comando limpia la carpeta de node_modules, instala las dependencias, genera los estilos de tailwin y ejecuta el servidor para la aplicación web)
- Si es con Windows `npm install` (Instala las dependencias en el directorio actual)
- Ejecutar `npm run build:tailwind` (Genera el archivo con las clases necesarias para el estilizado de las páginas, esto es sumamante importante realizarlo)
- Ejecutar servidor para proveer la aplicación web, es necesario correr el siguiente comando `npm start`
- Navegar a https://localhost:3000
- Listo ya estará en ejecución la aplicación web.

### Estructura de la aplicación web.

Basado en el ánalisis del problema y sobre la solución que se dará a las necesidades, la aplicación web cuenta con 4 partes principales o también se pueden llamar como módulos, los cuáles son:

- Sitio web, el cuál muestra información sobre todos los negocios disponibles de la corporación, poder realizar cotizaciones por cada negocio. Y el negocio de pisos cerámicos pueden realizar pedidos en línea por medio de un carrito de compras.

![Website](https://i.imgur.com/mVr4whZ.png)

- Módulo administrativo (Este cuenta con la parte administrativa y configuración básica de los diferentes negocios. En el pueden crear los usuarios, dar permisos a los usuarios sobre que empresas trabajarán, crear más negocios y sucursales).

![Admin web app](https://i.imgur.com/KGRJhuM.png)

- Módulo operativo (Este cuenta con la parte operativa sobre cada negocio al que tenga permiso el usuario que se autentique. En el puede crear productos, clientes, proveedores, pedidos internos y externos, asignar vendedor a una cotización, facturas entre otras más).

![Operators web app](https://i.imgur.com/KAaoyg4.png)

- Módulo gerencial (Este cuenta con la parte de reportes y dashboard sobre informes de los movimientos de los negocios y negocio específico, en el pueden ver el estado de las ventas de la corporación, servicios generados, pedidos en línea generados entre otras cosas más).

![Business web app](https://i.imgur.com/tQJKJ6j.png)

Cabe resaltar que para ingresar a cada módulo es necesario iniciar sesión, de lo contrario no podrá realizar ninguna operación dentro de la aplicación web.

![Login](https://i.imgur.com/UWhiBQH.png)

### Proyecto desplegado como infraestructura SaaS.

La aplicación web funciona como software como servicio *SaaS*, siendo así una aplicación web con alta disponibilidad.

Se aloja en la plataforma de *Netlify* y esta disponible para su uso. Esta es la url de la aplicación web.

https://transport-umg-app.netlify.app/