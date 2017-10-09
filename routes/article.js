let express = require('express');
let router = express.Router();

router.get('/add',function(req,res){
	res.render('article/add',{title:'发表文章'});//不能写/或者./  不用写后缀
});
module.exports = router;