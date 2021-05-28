var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var template = require('./lib/template.js');

var app = http.createServer(function(request,response){
    //callback함수에서 request는 요청할 때 웹브라우저가 보낸 정보,
    //response는 응답할 때 우리가 웹브라우저에게 전송할 정보
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    //url을 분석해서 id값을 추출할 수 있는 코드.
    var pathname = url.parse(_url, true).pathname;
    //console.log(url.parse(_url, true)); -->console에서 url에 대한 각종 정보 확인 가능

    if(pathname == '/') {
      if(queryData.id == undefined) {
      fs.readdir('./data', function(error, filelist){
        var title = 'Welcome';
        var description = 'Hello Node.js';

        var list = template.list(filelist);

        var html = template.HTML(title, list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
        //원래 괄호안에는 fs.readFileSync(__dirname + _url)
        //위 코드는 node.js파일 밑에 있는 파일들을 읽어주는 코드
      })
      //파일 목록을 가져온 다음에 해당 작업이 끝나면 nodejs는 function 중괄호 안에 있는 코드를 실행시킴


      } else { //쿼리스트링이 있다면
        fs.readdir('./data', function(error, filelist){
          var filteredId = path.parse(queryData.id).base;
          var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description, {
            allowedTags : ['h1']
          });
          var list = template.list(filelist);
          var html = template.HTML(sanitizedTitle, list,
            `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
            `<a href="/create">create</a>
             <a href="/update?id=${sanitizedTitle}">update</a>
             <form action="delete_process" method="post">
                  <input type="hidden" name="id" value="${sanitizedTitle}">
                  <input type="submit" value="delete">
                </form>`
            );
          response.writeHead(200);
          response.end(html);
          //원래 괄호안에는 fs.readFileSync(__dirname + _url)
          //위 코드는 node.js파일 밑에 있는 파일들을 읽어주는 코드
        });
      });
      }
    } else if(pathname === '/create'){
    fs.readdir('./data', function(error, filelist){
      var title = 'WEB - create';
      var list = template.list(filelist);
      var html = template.HTML(title, list, `
        <form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>
      `, ' ');
      response.writeHead(200);
      response.end(html);
      });
    } else if(pathname == '/create_process') {
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
      });


    } else if(pathname == '/update') {
      fs.readdir('./data', function(error, filelist){
        var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(title, list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
        response.writeHead(200);
        response.end(html);
        //원래 괄호안에는 fs.readFileSync(__dirname + _url)
        //위 코드는 node.js파일 밑에 있는 파일들을 읽어주는 코드
      });
    });
  } else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          })
        });
      });
    } else if(pathname === '/delete_process'){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filteredId = path.parse(id).base;
        fs.unlink(`data/${filteredId}`, function(error){
          response.writeHead(302, {Location: `/`});
          response.end();
        })
      });
    } else { //pathname이 root가 아닐 때(잘못된 경로로 접속했을 때)
      response.writeHead(404);
      response.end('Not found');
    }


});
app.listen(3000);
