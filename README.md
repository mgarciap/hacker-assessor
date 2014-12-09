#PDCP1

Vas a necesitar tener Python y Node.js instalados en tu compu.

##Rodando
Instale las dependencias.

    $ npm install
    $ node node_modules/bower/bin/bower install
    $ cd public && python -m SimpleHTTPServer 8000

En su navegador favorito, acceda a http://localhost:8000.

##Extendendo

    $ npm install -g bower gulp

Si instala nuevos paquetes usando `bower install <packete>`, usa `gulp` para inyectarlos en el index.

    $ gulp

##Librerias

###Dev
https://www.npmjs.org/package/gulp-inject
https://www.npmjs.org/package/main-bower-files

###Prod
Angular, Bootstrap
