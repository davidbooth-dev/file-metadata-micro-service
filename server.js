'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');

var app = express();
var upload = multer({ dest: 'uploads/'});

var cors_options = {
  optionSuccessStatus: 200, // some legacy browsers choke on 204
  origin: [
    "https://marsh-glazer.gomix.me",
    "https://narrow-plane.gomix.me",
    "https://www.freecodecamp.com"
  ]
}

app.use(cors(cors_options));  

var router = express.Router();

app.use('/api', cors(), router);

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

router.post('/fileanalyse', upload.single('upfile'), function(req, res, next){
  console.log('File: ', req.file);

  res.json({ filename: req.file.filename, size: req.file.size });
});

// Unmatched routes handler
app.use(function (req, res) {
  if (req.method.toLowerCase() === "options") {
    res.end();
  } else {
    res
      .status(404)
      .type("txt")
      .send("Not Found");
  }
});

// listen for requests :)
var server = app.listen(process.env.PORT || 3001, function () {
  console.log('Express Server Listening on localhost:port ' + server.address().port)
});
