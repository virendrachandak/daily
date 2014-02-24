解决cmder中文乱码问题
---
mingw 和 gitbash可以
在msys目录下修改etc/profile文件
alias l='/bin/ls --show-control-chars --color=tty'
alias la='/bin/ls -aF --show-control-chars --color=tty'
alias ll='/bin/ls -alF --show-control-chars --color=tty'
alias ls='/bin/ls --show-control-chars -F --color=tty'
Cmder的话直接在console输入alias+
l=ls --show-control-chars
la=ls -aF --show-control-chars
ll=ls -alF --show-control-chars
ls=ls --show-control-chars -F
自己会保存的
也可以cmder/config/aliases下添加上面的4行
