[![npm][npm]][npm-url]
[![node][node]][node-url]

# flyer-cli

> 商业端脚手架-飞鸟

# install

> npm install flyer-cli -g

# API

> ## 脚手架包含了⑦种命令:
> * add: 添加模板，没有任何特性的模板
> * dellete: 删除模板
> * init: 初始化项目
> * list: 添加一个列表模板
> * form: 添加一个表单模板
> * report: 添加一个报表模板
> * module: 初始化一个模块
> ## 说明:
> * flayer-cli基于商业端构建的一款脚手架，解决在生产过程中带来的重复劳动，以上模板均可接受用户输入，提供了指令解析功能，目前版本只支持文件路径解析，用户可指明模板生成的路径，确保文件及模块的唯一性;
> * 如果没有参数，默认在当前目录下

# 示例及详细说明



add （添加一个模板）
```
flyer add <path>
```

>
> 没有任何特性的模板，你所知道的一个普普通通的vue模板，还有一些我们经常用的钩子函数一并帮你生成，你所要做的就是实现你的业务逻辑
>

list（初始化一个列表模板）
```
flyer list <path>
```

>
> ```
> flyer list
> or
> flier list src/pages/xxx
> ```
>
> * 创建一个列表页，包含了查询、列表项、分页三个部分；
> * path为一个有效路径，保证文件能够正常写入，如果没有路径，则写在当前指令执行的文件夹位置;
>

form（初始化一个表单模板）
```
flyer form <path>
```

report（初始化一个报表模板）
```
flyer report <path>
```

module（初始化一个报表模板）
```
flyer module <floder-name>
```

>
> * 初始化一个模块，
> * 模块内容包含 < 列表页(list.vue) | 表单页(form.vue) | 模块配置文件(config.js) > 三个部分
> * floder-name 默认写入位置‘src/pages/floder-name’，如果项目结构不是'src/pages/...'，请输入具体的模块路劲，确保程序成功写入文件；
>

init（初始化一个vue项目）
```
flyer init <project-name>
```

>
> 未完待续...
> 
>


[npm]: https://img.shields.io/npm/v/flyer-cli.svg
[npm-url]: https://www.npmjs.com/package/flyer-cli

[node]: https://img.shields.io/node/v/flyer-cli.svg
[node-url]: https://nodejs.org

[deps]: https://david-dm.org/flyer-cli.svg
[deps-url]: https://david-dm.org/flyer-cli