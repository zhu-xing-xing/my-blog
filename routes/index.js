//定义路由中间件
let express = require('express');

//创建路由实例
let router = express.Router(); //调用Router方法可以得到一个路由中间件的实例

//当客户端通过get请求的方式来访问/时,会交由对应的函数来处理
router.get('/',function(req,res){
	res.send('首页');
});

module.exports=router; //一定要记得导出!