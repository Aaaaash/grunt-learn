#前端集成解决方案

>一套包含`框架`和`工具`，便于开发者快速构建web应用程序的工作流<br/>

##解决哪些前端问题？
* 前端开发团队代码风格不同意，如何强制开发规范<br/>
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
?npm install -g generator-angular

详见yoman-demo目录下angular-demo<br/>

##Bower
###bower下安装jquery
>bower install jquery<br/>

>bower jquery#*                  cached https://github.com/jquery/jquery-dist.git#2.2.4
bower jquery#*                validate 2.2.4 against https://github.com/jquery/jquery-dist.git#*
bower jquery#*                     new version for https://github.com/jquery/jquery-dist.git#*
bower jquery#*                 resolve https://github.com/jquery/jquery-dist.git#*
bower jquery#*                checkout 3.1.0
bower jquery#*                resolved https://github.com/jquery/jquery-dist.git#3.1.0
bower jquery#^3.1.0            install jquery#3.1.0

###bower下安装bootstrap
>bower install bootstrap

项目目录下将会自动创建一个`bower_components`文件夹，里面就包含了刚刚安装的jquery和bootstrap<br/>

bower还可以通过github短语来安装没有在bower上注册的组件<br/>
>bower install SakuB/2048-game<br/>

>bower 2048-game#*           not-cached git://github.com/SakuB/2048-game.git#*
bower 2048-game#*              resolve git://github.com/SakuB/2048-game.git#*
bower 2048-game#*             checkout master
bower 2048-game#*             resolved git://github.com/SakuB/2048-game.git#e4f5bf1fb7
bower 2048-game#*              install 2048-game#e4f5bf1fb7

使用以上命令，bower会自动从指定的github用户名上下载项目<br/>
`/`前面的SakuB为github的用户名，后面的2048-game为项目名，bower会自动寻找这个用户名以及他下面相应的项目进行下载<br/>

同时也可以使用项目的完整地址来安装<br/>
>bower install https://github.com/SakuB/2048-game
