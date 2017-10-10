//这个中间件是判断用户是否为未登录状态(未登录的用户才能访问这个页面,已登陆的则不允许访问)
// 为了在进入路由之前要求此用户未登录,如果未登录的话,可继续访问路由;如果已经登陆,则跳回首页,提示已经登录
exports.checkNotLogin = function(req,res,next){
	if(req.session.user){
		res.redirect('/');
	}else{
		next();
	}
};

//这个中间件是判断用户是否为登录状态(登录的用户才能访问这个页面,未登陆的则不允许访问)
// 为了在进入路由之前要求此用户已登录,如果已登录的话,可继续访问路由;如果未登陆,则跳回登录页,提示用户登录
exports.checkLogin = function(req,res,next){
	if(req.session.user){
		next();
	}else{
		res.redirect('/user/signin');
	}
};