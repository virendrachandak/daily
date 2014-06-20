vim emment定制
---

使用`html:5`刷出的模板是可以自定义的；

1.  直接修改`~/.vim/bundle/emmet-vim/autoload/emmet.vim`；
2.  修改一下代码可以定制`html:5`输出的内容：

```
\            'html:5': "<!DOCTYPE html>\n"
\                    ."<html>\n"
\                    ."<head>\n"
\                    ."\t<meta charset=\"${charset}\">\n"
\                    ."\t<title></title>\n"
\                    ."</head>\n"
\                    ."<body>\n\t${child}|\n</body>\n"
\                    ."</html>",
```

3.  同理，修改其他快捷键内容即可修改相应的输出。
