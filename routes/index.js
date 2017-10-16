//定义路由中间件
let express = require('express');
let {Article} = require('../model');//11.1 引入model
//创建路由实例
let router = express.Router(); //调用Router方法可以得到一个路由中间件的实例

//当客户端通过get请求的方式来访问/时,会交由对应的函数来处理
router.get('/',function(req,res){
	//13.1  先得到搜索框里输入的关键字
	let {keyword} = req.query;//query是jquery提供的对象
	let query = {};//13.2 构建一个空对象
	
	//13.3
	if(keyword){
		// query.title = new RegExp(keyword); //只要文章标题符合正则就可以显示出来
		//$or  后面数组中的条件有一个满足即可
		query['$or'] = [{title:new RegExp(keyword)},{content:new RegExp(keyword)}];
	}
	
/*
 //11.2 从数据库查询出所有的文章,排列在首页
	Article.find({},function(err,articles){  //11.3  查讯出来的文章列表一定是[]
		//路由是相对路径,相对于模版根目录(server.js中设置的views/index.html)
		console.log(articles);
		res.render('index',{title:'首页',articles});//不能写/或者./  不用写后缀
	});
*/
//13.4  find里面添加query(搜索条件)
//11.4 populate(填充):可以把一个字段从字符串转成对象
	Article.find(query).populate('user').exec(function(err,articles){  //11.3  查询出来的文章列表一定是[]
		// console.log(articles);
		//路由是相对路径,相对于模版根目录(server.js中设置的views/index.html)
		res.render('index',{title:'首页',keyword,articles});//不能写/或者./  不用写后缀
	});
});

module.exports=router; //一定要记得导出!

