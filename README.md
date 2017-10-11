
## 1,安装依赖包
```
npm install body-parser  cookie-parser debug ejs express morgan serve-favicon express-session connect-mongo mongoose connect-flash multer async -S
```

- webpack 是打包的
- webpack-dev-server 用来启动一个HTTP服务器预览我们的项目
- babel-core babel-loader 进行转译，把es6 和react代码转义成es5
- babel-preset-es2015 用来转义es6
- babel-preset-stage-0 用来转义es7
- babel-preset-react 用来转义react
- style-loader css-loader 用来处理css
- less-loader less 编译less
- file-loader url-loader 用来处理资源文件
- html-webpack-plugin 用来自动产出html文件
- open-browser-webpack-plugin 自动打开浏览器
"# my-blog"

## 创建并初始化git
git init
git add -A
git commit -m "1,初始化项目和依赖的模块"
git remote add origin https://github.com/zhu-xing-xing/my-blog.git
git push -u origin master


### 1,初始化项目和依赖的模块
### 2,跑通路由
### 3,使用bootstrap渲染模板
### 4,实现用户注册的功能
### 5,实现用户的登录功能
### 6,实现会话功能并控制菜单显示
### 7,增加登录状态判断中间件
### 8,成功和失败时的消息提示
### 9,实现上传头像并在导航的右上角显示个人信息
- 在注册表单增加一个头像的字段
- 给表单增加一个属性 enctype="multipart/form-data"
- 在user路由中引入multer中间件,并在注册请求中用此中间件解析请求体得到req.file和req.body
- 拼出avatar图片路径并赋给req.body对象
- 在User模型中添加avatar属性
### 10,新增发表文章
### 11,首页显示文章列表
### 12,编写文章详情页
### 13,删除文章
### 14,更新文章
### 15,实现搜索功能
### 16,实现分页的功能