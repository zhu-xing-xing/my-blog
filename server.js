let express = require('express');
let path = require('path');  //3,为了处理路径,引入path模块
let bodyParser = require('body-parser'); //4.1 引入中间件,用来获取请求体
let session = require('express-session');//6.1 引入会话中间件
let flash = require('connect-flash');//8.1 引入中间件
let app = express();

//引入各个中间件!!!
let index = require('./routes/index');//导入路由中间件
let user = require('./routes/user');
let article = require('./routes/article');

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

//6.2  在使用了会话中间件之后,会在请求对象上增加req.session属性  默认是一个空对象
app.use(session({
	resave:true,   //每次客户端请求到服务器都会保存session
	secret:'zxx',   //用来加密cookie,防止cookie被客户端篡改
	saveUninitialized:true  //保存未初始化的session
}));

//8.2 注意此中间件的使用位置,一定要放在session后面,因为此中间件是需要依赖session(本质上是往session里面写消息,从session里面取消息,但还是多了一个清除session的功能)
//req.flash(type,msg)两个参数表示赋值(往会话中写消息)  req.flash(type)一个参数表示取值
app.use(flash());

app.use(function(req,res,next){  	//在这里从会话对象中取出user属性,再赋值给模版对象
	//真正渲染模板的是res.locals,给它赋值(增加属性),会最终合并到res.locals上   在这里赋值各个组件都可以用到
	res.locals.user = req.session.user;   //res.locals是模版数据对象
	
	//flash本身有个特点就是闪现后就消失,读一次就立刻清空掉数据
	res.locals.success = req.flash('success').toString();  //8.9 req.flash('success')[]
	console.log(req.flash('success').toString());  //数据清空掉了   读取不到了
	res.locals.error = req.flash('error').toString();//8.10
	
	next();
});


// 使用3个路由中间件
app.use('/',index);//使用路由中间件 当客户端访问/时,交给index来处理

//当用户端请求体过来的路径是/user开头的话,会会交给user中间件来处理  /user/signup  /user/signin
//注意路径前缀/user写在app.use中,后面的/signup和/signin要写在routes/user.js中
app.use('/user',user);
app.use('/article',article);

app.listen(8080);


/*
let server = require('http').createServer(app);
server.listen(8080);*/
