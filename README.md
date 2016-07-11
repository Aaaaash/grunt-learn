#前端集成解决方案

>一套包含`框架`和`工具`，便于开发者快速构建web应用程序的工作流<br/>

##解决哪些前端问题？
* 前端开发团队代码风格不统一，如何强制开发规范<br/>
* 前期开发的组件库如何维护和使用<br/>
* 如何模块化前端项目<br/>
* 服务器部署前必须的压缩，检查流程如何简化，如何完善<br/>

##主流的方式
* Yeoman<br/>
* Bower<br/>
* Grunt/Gulp<br/>

##Grunt
###NodeJs
<a href="https://github.com/SakuB/Nodejs">Nodejs相关学习笔记</a>

##Yoman
###安装yoman
>npm install yo

### 安装generator
>npm install -g generator-angular

详见yoman-demo目录下angular-demo<br/>

##Bower
###bower下安装jquery
>bower install jquery<br/>

>>cached https://github.com/jquery/jquery-dist.git#2.2.4<br/>
validate 2.2.4 against https://github.com/jquery/jquery-dist.git#<br/>
new version for https://github.com/jquery/jquery-dist.git#<br/>
https://github.com/jquery/jquery-dist.git<br/>
checkout 3.1.0<br/>
resolved https://github.com/jquery/jquery-dist.git#3.1.0<br/>
install jquery#3.1.0<br/>

###bower下安装bootstrap
>bower install bootstrap

项目目录下将会自动创建一个`bower_components`文件夹，里面就包含了刚刚安装的jquery和bootstrap<br/>

bower还可以通过github短语来安装没有在bower上注册的组件<br/>
>bower install SakuB/2048-game<br/>

>not-cached git://github.com/SakuB/2048-game.git<br/>
resolve git://github.com/SakuB/2048-game.git<br/>
checkout master<br/>
resolved git://github.com/SakuB/2048-game.git#e4f5bf1fb7<br/>
install 2048-game#e4f5bf1fb7<br/>

使用以上命令，bower会自动从指定的github用户名上下载项目<br/>
`/`前面的SakuB为github的用户名，后面的2048-game为项目名，bower会自动寻找这个用户名以及他下面相应的项目进行下载<br/>

同时也可以使用项目的完整地址来安装<br/>
>bower install https://github.com/SakuB/2048-game

bower也支持安装其他cdn上的js文件，同样也是使用完整的地址来安装<br/>
>bower install http://push.zhanzhang.baidu.com/push.js

在bower可以搜索到一些常用的包<br/>
在bower创建的项目目录下也可以创建一个bower.json文件，用于记录项目所用包的一些相关信息，具体配置方式与package.json基本相同<br/>
####bower下载的组件如何使用？
在项目目录中新建一个app目录，并在app目录下新建一个index.html文件<br/>
引用js文件一样还是用原始的引用方式，实际上非常麻烦，所以这里要用到grunt和bower搭配使用<br/>

##Grunt的使用以及与bower和yoman的结合
单独的使用bower并不能使我们实际开发效率有太大的帮助，所以必须将这些工具结合起来<br/>

###grunt与yoman
