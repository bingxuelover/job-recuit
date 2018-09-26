var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('服务启动成功!');
});
app.post('/delete', function(req, res) {
  res.send({status: 0, msg: '删除成功'});
});
app.post('/save', function(req, res) {
  res.send({status: 0, msg: '保存成功'});
});
app.post('/uploadPhoto', function(req, res) {
  res.send({status: 0, msg: '上传成功'});
});
app.post('/Resume', function(req, res) {
  res.send({status: 0, msg: '保存成功'});
});

app.use(express.static('dist'));

var server = app.listen(9000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
