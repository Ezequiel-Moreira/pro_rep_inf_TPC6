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


  console.log('Recebi o pedido: ' + req.url)
  console.log('Método: ' + req.method)

  if(req.method == 'GET'){
    if(pathname == '/'){

      res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
      res.write(pug.renderFile('views/principal.pug'))
      res.end()

    }else if(pathname == '/registo'){

      res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
      res.write(pug.renderFile('views/pedido.pug'))
      res.end()

    }else if(pathname == '/lista'){

      jsonfile.readFile(bd,(erro,teses)=>{
        res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
        if(!erro){
          res.write(pug.renderFile('views/lista.pug', {lista : teses}))
        }else{
          res.write(pug.renderFile('views/erro.pug', {e : erro}))
        }
        res.end()    
      })

    }else if(pathname == '/processaForm'){

      res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
      res.write(pug.renderFile('views/resposta.pug', {tese : query}))
      res.end()

    }else if(pathname == '/w3.css'){

      res.writeHead(200, {'Content-type' : 'text/css'})
      fs.readFile('stylesheet/w3.css',(erro,dados)=>{
        if(erro){res.write(pug.renderFile('views/erro.pug',{e : erro}))}
        else{res.write(dados)}
        res.end()
      })

    }else{
      res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
      var err = 'Erro: ' + parsedUrl.pathname + ' não está implementado'
      res.write(pug.renderFile('views/erro.pug',{e : err}))
      res.end()
    }
  }else if(req.method == 'POST'){
    if(pathname == '/processaForm'){
      
      recuperaInfo(req,(resultado)=>{
        jsonfile.readFile(bd,(erro,teses)=>{
          if(!erro){
            teses.push(resultado)
            jsonfile.writeFile(bd,teses,(erro2)=>{
              if(!erro2){console.log('registo guardado com sucesso!')}
              else{console.log('Erro:' + erro2)}
            })
          }else{
            console.log('Erro: ' + erro)
          }
        })

        res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
        res.write(pug.renderFile('views/resposta.pug', {tese : resultado}))
        res.end()
      })

    }else{
      res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
      var err = 'Erro: ' + parsedUrl.pathname + ' não está implementado'
      res.write(pug.renderFile('views/erro.pug',{e : err}))
      res.end()
    }
  }else{
    res.writeHead(200, {'Content-type' : 'text/html;charset=utf-8'})
    var err = 'Erro: ' + req.method + ' não está implementado'
    res.write(pug.renderFile('views/erro.pug',{e : err}))
    res.end()
  }
})


server.listen(porta,()=>{
  console.log("À escuta na porta " + porta)
})

function recuperaInfo(request,callback){
  const FORM_URLENCODED = 'application/x-www-form-urlencoded'
  if(request.headers['content-type'] === FORM_URLENCODED){
    let body = ''
    request.on('data', (chunk)=>{
      body += chunk.toString()
    })
    request.on('end', ()=>{
      callback(parse(body))
    })
  }else{
    callback(null)
  }
}
