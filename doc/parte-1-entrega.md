# Prueba de concepto - Parte 1

## Modalidad: 
Una parte a entregar (parte 1) y otra con programación en pareja (parte 2).

## Herramientas:
- AngularJS
- Cualquier extensión, paquete o seed de Angular que crea necesarios (tener en cuenta la restricción de jQuery)
- Karma + Jasmine
- Bootstrap
- **No se puede usar jQuery, debe utilizar js simple y en caso de no ser posible, los selectores de angular.**


## Requerimientos
**Desarrollar una SPA que se utilizará para especificar la experiencia laboral durante entrevistas de trabajo a programadores.**

La misma debe contar con:
* Lista de categorías o secciones de interés con una sub-lista desplegable de sus items.
* Para cada ítem se debe poder seleccionar:
    * Nivel. Opciones:
        * No tengo conocimiento
        * Tengo conocimiento pero no lo he utilizado
        * Tengo conocimiento y experiencia
    * Experiencia en años (input)
    * Comentario (textarea, opcional)
* Filtrado de categorías por nombre.
* Filtrado de items de las categorías visibles. Al filtrar items se deben desplegar las categorías visibles. Al borrar el filtro de items se deben plegar todas las categorías.
* Botón de guardado de todos los datos, armando un objeto JSON con todos los datos ingresados y mostrándolo por consola.


## Requerimientos adicionales
- Para las llamadas al servidor asumir que existe un servicio REST en la URL ´/api/1/resourceName.json´. Utilizar los archivos .json adjuntos.
- Se deberán programar y utilizar al menos 1 controlador, 1 servicio o factory y 1 directiva.
- Utilizar diseño responsive (smartphone y desktop).
- Donde sea posible realice pruebas unitarias.

## Entrega
- Antes de comenzar realizar una estimación del esfuerzo requerido y detallarlo por mail a leonardo.lower@altoros.com.
- Al finalizar detallar el esfuerzo real implicado en el desarrollo.
- Código en github (app, unit tests e instrucciones de build/instalación en el archivo README.md)
