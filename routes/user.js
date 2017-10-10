let express = require('express');
let {User} = require('../model');//2,通过解构赋值直接获取User
let router = express.Router();

//用户注册 /user/signup
router.get('/signup',function(req,res){
	res.render('user/signup',{title:'注册'});
});

//1,写路由方法
router.post('/signup',function(req,res){
	let user = req.body;//得到请求体对象(username,password,email)
	User.create(user,function(err,doc){   //3,把user对象保存到数据库中
		//err错误对象  doc保存成功后的user对象   _id  __v
		if(err){  //4,如果保存失败,回到上一个页面,重新保存
			res.redirect('back');
		}else{  //5,如果保存成功,跳转到登录页
			res.redirect('/user/signin');
		}
	});
});

router.get('/signin',function(req,res){
	res.render('user/signin',{title:'登录'});
});

//用户登录
router.post('/signin',function(req,res){
	let user = req.body;  //得到用户登录时提交的登录表单
	User.findOne(user,function(err,doc){//查询数据库里是否有用户登录时的user  user有两个参数username和password
		if(err){   //err有值,说明查询失败
			res.redirect('back');  //返回,重新填写  还是登录页面
		}else{
			if(doc){  //如果有doc,说明找到了,登陆成功    doc是一条信息或者null
				req.session.user = doc;  //6.3  向会话对象中写入属性user,且user=doc
				res.redirect('/');
			}else{
				res.redirect('back');
			}
		}
	});
});

router.get('/signout',function(req,res){
	res.render('user/signout',{title:'退出'});
});
 module.exports = router;