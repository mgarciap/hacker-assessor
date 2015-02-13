#Hacker Assessor

## Requerimientos
**Desarrollar una SPA que se utilizará para especificar la experiencia laboral durante entrevistas de trabajo a programadores.**

La misma debe contar con:
* Lista de categorías o secciones de interés con una sub-lista de sus items.
* Para cada ítem se debe poder seleccionar:
    * Nivel. Opciones:
        * No tengo conocimiento
        * Tengo conocimiento pero no lo he utilizado
        * Tengo conocimiento y experiencia
    * Experiencia en años (input)
    * Comentario (textarea, opcional)
* Filtrado de categorías por nombre.
* Filtrado de items de las categorías visibles. 

## Directory Structure
```
angular-initial/
  |- src/
  |  |- app/
  |  |  |- common/
  |  |  |  |- styles/
  |  |  |  |  |- something.less
  |  |  |  |- partials/
  |  |  |  |  |- index.html
  |  |  |  |- controllers.js
  |  |  |  |- modules.js
  |  |  |  `- services.js
  |  |  |- module*/
  |  |  |  |- styles/
  |  |  |  |  |- something.less
  |  |  |  |- partials/
  |  |  |  |  |- index.html
  |  |  |  |- controllers.js
  |  |  |  |- modules.js
  |  |  |  `- services.js
  |  |- img/
  |  `- index.html
  |- vendor/
  |- .bowerrc
  |- bower.json
  |- gulp.conf.json
  |- gulpfile.js
  `- package.json
```

###Rodando
Instale las dependencias.

    $ npm install -g bower browser-sync gulp protractor
    $ npm install
    $ bower install
    $ gulp

En su navegador favorito, acceda a http://localhost:3000.

###Extendendo
Vas a necesitar tener alguna versión del [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) instalado para poder instalar Protractor y rodar las pruebas. Fíjate si lo tenéis ejecutando el siguiente comando `java -version`

Para rodar y extender las pruebas.

    $ gulp help
    $ webdriver-manager start
    $ npm test


###Librerias

* Gulp
* Browser Sync
* Bower
* Less


####Dev
* [browser-sync](https://www.npmjs.com/package/browser-sync)
* [protractor](https://www.npmjs.com/package/protractor)
* [gulp-inject](https://www.npmjs.org/package/gulp-inject)  
* [main-bower-files](https://www.npmjs.org/package/main-bower-files)

####Prod
* [Angular](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)