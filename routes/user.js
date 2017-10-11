let express = require('express');
let {User} = require('../model');//2,通过解构赋值直接获取User

let multer = require('multer');//9.1 引入multer中间件(用来上传图片)
let uploads = multer({dest:'public/uploads'}); //9.2  设置上传路径(dest表示上传后的图片所存放的位置)

let {checkNotLogin,checkLogin} = require('../auth');  //7.3  引入新写的两个中间件
let router = express.Router();

//用户注册 /user/signup
router.get('/signup',checkNotLogin,function(req,res){  //7.4 把判断未登录的中间件放在这里(登录过,就不再执行后面的function,在中间件里直接跳转到首页;如果没登陆过,走中间件里的next(),即执行后面的fn)
	res.render('user/signup',{title:'注册'});
});

//1,写路由方法
//9.3 single当表单里只有一个上传字段的话 avatar是上传字段的name属性 req.file  req.body
//single方法,传递进去一个字段的名字,返回一个路由中间件,中间件会解析我们的请求体,把文件信息赋给req.file;把其他字段赋值给req.body
router.post('/signup',checkNotLogin,uploads.single('avatar'),function(req,res){  //7.5
	let user = req.body;//得到请求体对象(username,password,email)
	
	//9.4 给user对象添加avatar字段
	user.avatar = `/uploads/${req.file.filename}`; //9.5 还要再写一个静态文件中间件
	
	User.create(user,function(err,doc){   //3,把user对象保存到数据库中
		//err错误对象  doc保存成功后的user对象   _id  __v
		if(err){  //4,如果保存失败,回到上一个页面,重新保存
			req.flash('error','用户注册失败'); //8.3
			res.redirect('back');
		}else{  //5,如果保存成功,跳转到登录页
			req.flash('success','用户注册成功'); //8.4
			res.redirect('/user/signin');
		}
	});
});

router.get('/signin',checkNotLogin,function(req,res){ //7.6
	res.render('user/signin',{title:'登录'});
});

//用户登录
router.post('/signin',checkNotLogin,function(req,res){//7.7
	let user = req.body;  //得到用户登录时提交的登录表单
	User.findOne(user,function(err,doc){//查询数据库里是否有用户登录时的user  user有两个参数username和password
		if(err){   //err有值,说明查询失败 数据库没连上
			req.flash('error','操作数据库失败'); //8.5
			res.redirect('back');  //返回,重新填写  还是登录页面
		}else{
			if(doc){  //如果有doc,说明找到了,登陆成功    doc是一条信息或者null
				req.flash('success','用户登录成功'); //8.6 存放的是数组,取出来的也是一个数组
				// req.flash('success','用户登录成功'); //8.6
				req.session.user = doc;  //6.3  向会话对象中写入属性user,且user=doc
				res.redirect('/');
			}else{   //查询数据库的操作成功,但是没有查到
				req.flash('error','用户和密码不正确'); //8.7
				res.redirect('back');
			}
		}
	});
});

router.get('/signout',checkLogin,function(req,res){ //7.8
	req.session.user = null;  //7.1  清除user
	req.flash('success','用户退出成功'); //8.8
	res.redirect('/user/signin');  //7.2  返回到登录页
});
 module.exports = router;