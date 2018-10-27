var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var {parse} = require('querystring')
var jsonfile = require('jsonfile')

var porta = 7000
var bd = "data/teses.json"

var server=http.createServer((req,res)=>{
  var parsedUrl = url.parse(req.url,true)
  var pathname = parsedUrl.pathname

  if(req.method == 'GET'){
    if(pathname == '/'){
      res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
      res.write(pug.renderFile('principal.pug'))
      res.end()
    }else if(pathname == '/registo'){

    }else if(pathname == '/lista'){
      
    }else if(pathname == '/processaForm'){

    }else if(pathname == '/w3.css'){

    }else{
      res.writeHead(501, {'Content-type' : 'text/html;charset=utf-8'})
      res.end('Erro: ' + parsedUrl.pathname + ' não está implementado')
    }
  }else if(req.method == 'POST'){
    if(pathname == '/processaForm'){
      
    }else{
      res.writeHead(501, {'Content-type' : 'text/html;charset=utf-8'})
      res.end('Erro: ' + parsedUrl.pathname + ' não está implementado')
    }
  }else{
    res.writeHead(503, {'Content-type' : 'text/html;charset=utf-8'})
    res.end('Erro: ' + req.method + ' não está implementado')
  }
})


server.listen(porta,()=>{
  console.log("À escuta na porta " + porta)
})
