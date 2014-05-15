最简单的WYSIWYG编辑器
---

>   只需要了解一个属性和一个函数就能实现最简单的WYSIWYG（what you see is what you get，所见即所得）编辑器。

### 原理

#### `contentEditable`属性

`contentEditable`属性，它会让浏览器知道某个元素（例如一个div）是否可以编辑。开启`contentEditable`后可以使用`ctr+b`以及`ctr+i`快捷键来设置粗体和斜体样式但是这些样式设置非常有限。

>   `contentEditable`接受的值为bool值。

#### `execCommand`函数

`execCommand`函数允许对`contentEditable`区域的内容做许多复杂的操作而且不用担心兼容性的问题。`execCommand`函数的详情可以参考[MDC文档](https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla#Executing_Commands)。

`execCommand`函数接受3个参数：

*   `命令名`
*   `是否展现默认UI`--尚未实现，最好设为`false`
*   `ValueArgument`--一些命令的可选参数，例如，使用`bold`命令会在当前选择的文字内容上添加`<b>`标签。

一般`ValueArgument`都可以设置成`null`值，除了一种情况，就是希望为一行文字设置标签（例如`h1`，`h2`）。需要使用`formatBlock`命令，并将希望添加的标签放到`ValueArgument`中（不要加尖括号）。

### 完整代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="css/font-awesome.min.css" />
    <style type="text/css">
#editControls {
  text-align:center;
  padding:5px;
  margin:5px;
}

#editor {
resize:vertical;
overflow:auto;
border:1px solid silver;
border-radius:5px;
min-height:100px;
box-shadow: inset 0 0 10px silver;
padding:1em;
}

a:link {text-decoration:none;}
a:visited {text-decoration:none;}
a:hover {text-decoration:none;}
a:active {text-decoration:none;}
a{
  color:black;
  padding:5px;
  border:1px solid silver;
  border-radius:5px;
  width:1em;
}
    </style>
</head>
<body>
    <div>
        <div>
            <div id='editControls'>
                <h1>World Simplest HTML5 WYSISYG Inline Editor</h1>
                <div>
                    <a data-role='undo' href='javascript:void(0)'><i class='fa fa-undo'></i></a>
                    <a data-role='redo' href='javascript:void(0)'><i class='fa fa-repeat'></i></a>
                    <a data-role='bold' href='javascript:void(0)'><i class='fa fa-bold'></i></a>
                    <a data-role='italic' href='javascript:void(0)'><i class='fa fa-italic'></i></a>
                    <a data-role='underline' href='javascript:void(0)'><i class='fa fa-underline'></i></a>
                    <a data-role='strikeThrough' href='javascript:void(0)'><i class='fa fa-strikethrough'></i></a>
                    <a data-role='justifyLeft' href='javascript:void(0)'><i class='fa fa-align-left'></i></a>
                    <a data-role='justifyCenter' href='javascript:void(0)'><i class='fa fa-align-center'></i></a>
                    <a data-role='justifyRight' href='javascript:void(0)'><i class='fa fa-align-right'></i></a>
                    <a data-role='justifyFull' href='javascript:void(0)'><i class='fa fa-align-justify'></i></a>
                    <a data-role='indent' href='javascript:void(0)'><i class='fa fa-indent'></i></a>
                    <a data-role='outdent' href='javascript:void(0)'><i class='fa fa-outdent'></i></a>
                    <a data-role='insertUnorderedList' href='javascript:void(0)'><i class='fa fa-list-ul'></i></a>
                    <a data-role='insertOrderedList' href='javascript:void(0)'><i class='fa fa-list-ol'></i></a>
                    <a data-role='h1' href='javascript:void(0)'>h<sup>1</sup></a>
                    <a data-role='h2' href='javascript:void(0)'>h<sup>2</sup></a>
                    <a data-role='p' href='javascript:void(0)'>p</a>
                    <a data-role='subscript' href='javascript:void(0)'><i class='fa fa-subscript'></i></a>
                    <a data-role='superscript' href='javascript:void(0)'><i class='fa fa-superscript'></i></a>
                </div>
            </div>
            <div id='editor' contenteditable>
                <h1>This is a title!</h1>
                <p>This is just some example text to start us off</p>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="http://code.jquery.com/jquery-2.0.2.min.js"></script>
    <script type="text/javascript">
/*
Big Thanks To:
https://developer.mozilla.org/en-US/docs/Rich-Text_Editing_in_Mozilla#Executing_Commands
*/

$('#editControls a').click(function(e) {
  switch($(this).data('role')) {
    case 'h1':
    case 'h2':
    case 'p':
      document.execCommand('formatBlock', false, $(this).data('role'));
      break;
    default:
      document.execCommand($(this).data('role'), false, null);
      break;
    }
})
    </script>
</body>
</html>
```

>   注意，用到了font-awesome和jquery


### 其他

>   如何快速复制页面上的所有文字？
>   在控制台中运行`copy(document.documentElement.innerText)`即可。

### 英文原文
*   [http://www.barneyparker.com/world-simplest-html5-wysisyg-inline-editor/](http://www.barneyparker.com/world-simplest-html5-wysisyg-inline-editor/)
*   [codepen地址](http://codepen.io/barney-parker/full/idjCG)