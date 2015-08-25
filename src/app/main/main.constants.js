(function() {
  'use strict';

  angular
    .module('hackerAssessor.main')
    .constant('BASE_PATH', 'https://hacker-assessor.firebaseio.com/')
    .constant('TEMPLATE_SENIORITIES', {
      CURRENT: {
        ID: '-Jk8wy2M_BfCZXtagqKC'
      },
      NEXT: {
        ID: '-Jj_DTkfRMVNJl4qQq20'
      }
    })
    .constant('MAX_SENIORITY_ID', "-Jj_DBAikma6ZDJmAUMe");
})();
