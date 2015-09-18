var resources = require('./resources');
var response = require('./response');
var template = require('./template');
var utils = require('./utils');
var qs = require('querystring');

module.exports = {
  indexPage: indexPage,
  loginPage: loginPage,
  singleHackerPage: singleHackerPage,
  becomeSeniority: becomeSeniority
}

function indexPage(req, res) {
  resources.getHackers(function(hackers) {
    var templateData = template.prepareTemplateData(['hackers'], [hackers]);
    response.make(req, res, templateData, 'index.html.ejs');
  });
}

function loginPage(req, res) {
  if(req.method === 'GET') {
    response.make(req, res, {}, 'login.html.ejs');
  } else {
    var body = "";

    req.on('data', function(data){
      body += data;
    });
    req.on('end', function(){
      var hacker = qs.parse(body).hacker;
      // TODO: delete the harcoded id. Find the user in the DB.
      var params = { hacker_id: 1 };
      singleHackerPage(req, res, params);
    });
  };
}

function singleHackerPage(req, res, params) {
  resources.getHacker(params.hacker_id, function(hacker) {
    resources.getSeniorities(function(seniorities) {
      templateData = template.prepareTemplateData(['hacker', 'seniorities'], [hacker, seniorities]);
      templateData.hacker = templateData.hacker[0];
      response.make(req, res, templateData, 'hacker.html.ejs');
    });
  });
}

function becomeSeniority(req, res, params) {
  resources.getHacker(params.hacker_id, function(hacker) {
    resources.getSeniority(params.seniority_id, function(seniority) {
      seniority.rows[0].requirements = utils.matchRequirements(hacker.rows[0].skills, seniority.rows[0].requirements);
      templateData = template.prepareTemplateData(['hacker', 'seniority'], [hacker, seniority]);
      templateData.hacker = templateData.hacker[0];
      templateData.seniority = templateData.seniority[0];
      response.make(req, res, templateData, 'seniority.html.ejs');
    });
  });
}
