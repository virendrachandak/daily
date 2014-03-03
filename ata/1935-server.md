1.  安装mongodb数据库；
2.  安装hapijs模块；
3.  安装mongoose模块

    遇到问题：    
    1.  `node-gyp.js rebuild`时，出现以下错误：
    ```
    {lamb} node "D:\Program Files\nodejs\node_modules\npm\bin\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild 
    在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关。                                                                                          `
    ```

    ```
    在此解决方案中一次生成一个项目。若要启用并行生成，请添加“/m”开关。                    
    MSBUILD : error MSB4132: 无法识别工具版本“2.0”。可用的工具版本为 "4.0"。 
    ```

    [npm-gyp模块](https://www.npmjs.org/package/node-gyp)

    >   node.js原生插件构建工具
    
    >   注意一下：node-gyp安装需要依赖一些其他工具，在windows8下安装需要依赖 visual studio c++ 2012
    >   [下载地址](http://www.microsoft.com/zh-cn/download/details.aspx?id=34673)

