//定义路由中间件
let express = require('express');

//创建路由实例
let router = express.Router(); //调用Router方法可以得到一个路由中间件的实例

//当客户端通过get请求的方式来访问/时,会交由对应的函数来处理
router.get('/',function(req,res){
	// res.send('首页');
	//路由是相对路径,相对于模版根目录(server.js中设置的views/index.html)
	res.render('index',{title:'首页'});//不能写/或者./  不用写后缀
});

module.exports=router; //一定要记得导出!