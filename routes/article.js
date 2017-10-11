let express = require('express');
let {checkNotLogin,checkLogin} = require('../auth');  //7.9  引入新写的两个中间件
let router = express.Router();
let {Article} =require('../model');//10.4 导入模型,并解构出来

router.get('/add',checkLogin,function(req,res){//7.10
	res.render('article/add',{title:'发表文章'});//不能写/或者./  不用写后缀
});

//10.1 写路由
router.post('/add',checkLogin,function(req,res){
	//10.3
	let article = req.body;
	//这篇文章的作者是当前的登录用户
	article.user = req.session.user._id;
	
	//10.5 调用Article模型的create方法来进行保存
	Article.create(article,function(err,doc){
		if(err){
			req.flash('error',err);
			res.redirect('back');
		}else{
			req.flash('success','文章发表成功');
			res.redirect('/');
		}
	})
});

module.exports = router;