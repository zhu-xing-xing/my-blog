let express = require('express');
let path = require('path');  //3,为了处理路径,引入path模块
let bodyParser = require('body-parser'); //4.1 引入中间件,用来获取请求体

let app = express();

app.set('view engine','html');  //1,设置模版引擎  指定模版的后缀为html
app.set('views',path.resolve('views')); //2,设置模版存放的根目录,需要制定绝对路径
//4,path.resolve从当前绝对路径出发,然后用当前的绝对路径加上views,变成另外一个绝对路径,会指向views文件夹
//5,自定义渲染方法
app.engine('html',require('ejs').__express); //6,指定对于html类型的模版使用ejs方法来进行渲染


//4.2 解析客户端提交过来的请求体,并转成对象赋值给req.body
app.use(bodyParser.urlencoded({extended:true}));
//4.3 表单提交过来的请求体是urlencoded类型
//4.4 bodyParser有四种方法:urlencoded  json raw text 使用那个方法取决于请求体的类型


//此静态文件中间件会拦截客户端对于静态文件的请求,如:bootstrap.css,然后会在当前目录下的node_modules目录寻找此文件,
// 如果能找到则返回客户端并结束请求
app.use(express.static(path.resolve('node_modules')));//7,引入中间件,指定目录

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
