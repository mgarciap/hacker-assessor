#Hacker Assessor

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