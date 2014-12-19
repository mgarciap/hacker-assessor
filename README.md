#PDCP1

###Rodando
Instale las dependencias.

    $ npm install -g bower
    $ npm install
    $ bower install
    $ npm start

En su navegador favorito, acceda a http://localhost:8000.

###Extendendo
Vas a necesitar tener alguna versión del [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) instalado para poder instalar Protractor y rodar las pruebas. Fíjate si lo tenéis ejecutando el siguiente comando `java -version`

    $ npm install -g gulp protractor

Si instala nuevos paquetes usando `bower install <packete>`, usa `gulp` para inyectarlos en el index.

    $ gulp
Para rodar y extender las pruebas.

    $ webdriver-manager start
    $ npm test


###Librerias

####Dev
* [http-server](https://www.npmjs.com/package/http-server)
* [protractor](https://angular.github.io/protractor/)
* [gulp-inject](https://www.npmjs.org/package/gulp-inject)  
* [main-bower-files](https://www.npmjs.org/package/main-bower-files)

####Prod
* [Angular](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)
