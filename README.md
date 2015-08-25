# Hacker Assessor

![Codeship build badge](https://codeship.com/projects/54f16f00-47a2-0132-beb3-4adcde5a863d/status?branch=v0.3.1) ![TravisCI build badge](https://travis-ci.org/n370/hacker-assessor.svg?branch=v0.3.1)

### Requerimientos
Desarrollar una SPA que se utilizará para especificar la experiencia laboral durante entrevistas de trabajo a programadores.

La misma debe contar con:
- Lista de categorías o secciones de interés con una sub-lista de sus items.
- Para cada ítem se debe poder seleccionar:
  - Nivel. Opciones:
    - No tengo conocimiento
    - Tengo conocimiento pero no lo he utilizado
    - Tengo conocimiento y experiencia

  - Experiencia en años (input)
  - Comentario (textarea, opcional)

- Filtrado de categorías por nombre.
- Filtrado de items de las categorías visibles.

### Rodando
Instale las dependencias.

```
$ npm install -g bower browser-sync gulp protractor
$ npm install
$ bower install
$ gulp
```

En su navegador favorito, acceda a [http://localhost:3000](http://localhost:3000).

### Extendendo
Vas a necesitar tener alguna versión del [Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html) instalado para poder instalar Protractor y rodar las pruebas. Fíjate si lo tenéis ejecutando el siguiente comando `java -version`

Para rodar y extender las pruebas.

```
$ gulp help
$ webdriver-manager start
$ npm test
```

### Librerias
- Gulp
- Browser Sync
- Bower
- Less

#### Desarrollo
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [protractor](https://www.npmjs.com/package/protractor)
- [main-bower-files](https://www.npmjs.org/package/main-bower-files)

#### Producción
- [Angular](https://angularjs.org/)
- [AngularFire]()
- [Angular Material]()

Hacker Assessor (c) by [@n370](http://www.github.com/n370) and [@leolower](http://www.github.com/leolower)

---

Hacker Assessor is licensed under a
Creative Commons Attribution 4.0 International License.

You should have received a copy of the license along with this
work. If not, see <http://creativecommons.org/licenses/by/4.0/>.
