var express = require("express");
var qiniu = require('qiniu');
var app = express();

qiniu.conf.ACCESS_KEY = '';
qiniu.conf.SECRET_KEY = '';

var bucket = "jquery_upload_demo";

var opts = {
  scope: bucket,
  expires: 3600,
  callbackUrl: null,
  callbackBodyType: null,
  customer: null
};

var token = new qiniu.auth.UploadToken(opts);
var uploadToken = token.generateToken();

app.get('/token.json', function(req, res){

    // our front-end isnot serve by node server, all of them are static files
    // so we need output response headers for CORS
    // or you can change to use template engine for render pages
    res.header('Pragma', 'no-cache');
    res.header('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Access-Control-Allow-Origin', '*');

    var output = {
    	"authToken": uploadToken,
      "bucketName": bucket,
    	"uploadURL": "http://up.qbox.me/upload",
    }
    
   	res.json(output);
});

app.use(app.router);

app.listen(8125);

console.log('listening on port 8125');