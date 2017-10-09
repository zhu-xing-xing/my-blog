
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

### 2,跑通路由
### 3,渲染模版
### 4,实现用户注册功能