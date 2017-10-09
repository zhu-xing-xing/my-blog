let express = require('express');
let app = express();

let index = require('./routes/index');//导入路由中间件
app.use('/',index);//使用中间件 当客户端访问/时,交给index来处理

//当用户端请求体过来的路径是/user开头的话,会会交给user中间件来处理  /user/signup  /user/signin
//注意路径前缀/user写在app.use中,后面的/signup和/signin要写在routes/user.js中
let user = require('./routes/user');
app.use('/user',user);

let article = require('./routes/article');
app.use('/article',article);

app.listen(8080);


/*
let server = require('http').createServer(app);
server.listen(8080);*/
