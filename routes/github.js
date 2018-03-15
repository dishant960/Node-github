var express = require('express');
var router = express.Router();
const https = require('https');


/* GET users listing. */
router.get('/search', function (req, res, next) {
  let searchValue = req.query.value;

  if (searchValue != '') {
    let sort = req.query.sort || 'stars';
    let order = req.query.order || 'desc';

    var options = {
      host: 'api.github.com',
      path: '/search/repositories?q=' + searchValue + '&sort=' + sort + '&order=' + order,
      method: 'GET',
      headers: { 'user-agent': 'node-github' }
    };

    console.log(options.path);

    var request = https.request(options, function (response) {
      var body = '';
      response.on("data", function (chunk) {
        body += chunk.toString('utf8');
      });

      response.on("end", function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
      });
    });

    request.end();
  }
  else {
    res.send("Not a valid input");
  }


});

router.get('/repo', function (req, res, next) {
  let repoName = req.query.repoName;

  if (repoName != '') {
    var options = {
      host: 'api.github.com',
      path: '/repos/' + repoName,
      method: 'GET',
      headers: { 'user-agent': 'node-github' }
    };

    var request = https.request(options, function (response) {
      var body = '';
      response.on("data", function (chunk) {
        body += chunk.toString('utf8');
      });

      response.on("end", function () {
        res.setHeader('Content-Type', 'application/json');
        res.send(body);
      });
    });

    request.end();
  }
  else {
    res.send("Not a valid input");
  }


});

module.exports = router;
