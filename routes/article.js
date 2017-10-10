let express = require('express');
let {checkNotLogin,checkLogin} = require('../auth');  //7.9  引入新写的两个中间件
let router = express.Router();

router.get('/add',checkLogin,function(req,res){//7.10
	res.render('article/add',{title:'发表文章'});//不能写/或者./  不用写后缀
});
module.exports = router;