if &cp | set nocp | endif
let s:cpo_save=&cpo
set cpo&vim
inoremap <D-BS> 
inoremap <M-BS> 
inoremap <M-Down> }
inoremap <D-Down> <C-End>
inoremap <M-Up> {
inoremap <D-Up> <C-Home>
noremap! <M-Right> <C-Right>
noremap! <D-Right> <End>
noremap! <M-Left> <C-Left>
noremap! <D-Left> <Home>
inoremap <Plug>(emmet-anchorize-summary) =emmet#util#closePopup()=emmet#anchorizeURL(1)
inoremap <Plug>(emmet-anchorize-url) =emmet#util#closePopup()=emmet#anchorizeURL(0)
inoremap <Plug>(emmet-remove-tag) =emmet#util#closePopup()=emmet#removeTag()
inoremap <Plug>(emmet-split-join-tag) :call emmet#splitJoinTag()
inoremap <Plug>(emmet-toogle-comment) =emmet#util#closePopup()=emmet#toggleComment()
inoremap <Plug>(emmet-image-size) =emmet#util#closePopup()=emmet#imageSize()
inoremap <Plug>(emmet-move-prev) :call emmet#moveNextPrev(1)
inoremap <Plug>(emmet-move-next) :call emmet#moveNextPrev(0)
inoremap <Plug>(emmet-balance-tag-outword) :call emmet#balanceTag(-1)
inoremap <Plug>(emmet-balance-tag-inward) :call emmet#balanceTag(1)
inoremap <Plug>(emmet-update-tag) =emmet#util#closePopup()=emmet#updateTag()
inoremap <Plug>(emmet-expand-word) =emmet#util#closePopup()=emmet#expandAbbr(1,"")
inoremap <Plug>(emmet-expand-abbr) =emmet#util#closePopup()=emmet#expandAbbr(0,"")
nnoremap  h 
nnoremap <NL> j
nnoremap  k 
nnoremap  l 
nnoremap  G
nnoremap <silent>  :CtrlP
nnoremap  :w
vmap  <Plug>(expand_region_shrink)
vmap c <Plug>(emmet-code-pretty)
vmap m <Plug>(emmet-merge-lines)
nmap A <Plug>(emmet-anchorize-summary)
nmap a <Plug>(emmet-anchorize-url)
nmap k <Plug>(emmet-remove-tag)
nmap j <Plug>(emmet-split-join-tag)
nmap / <Plug>(emmet-toogle-comment)
nmap i <Plug>(emmet-image-size)
nmap N <Plug>(emmet-move-prev)
nmap n <Plug>(emmet-move-next)
vmap D <Plug>(emmet-balance-tag-outword)
nmap D <Plug>(emmet-balance-tag-outword)
vmap d <Plug>(emmet-balance-tag-inward)
nmap d <Plug>(emmet-balance-tag-inward)
nmap u <Plug>(emmet-update-tag)
nmap ; <Plug>(emmet-expand-word)
vmap , <Plug>(emmet-expand-abbr)
nmap , <Plug>(emmet-expand-abbr)
nnoremap  3 :e #
nnoremap  . :e .
nnoremap  e :e ++enc=gbk
nnoremap  s :source $MYVIMRC
nmap  n :set nu
nmap  h :nohlsearch
vmap  P "+Pautocmd BufWritePost .vimrc source $MYVIMRC
vmap  p "+p""""""""""""""""""""""""""""""""""""""""""""
nmap  P "+P" => auto commands for vim
nmap  p "+p""""""""""""""""""""""""""""""""""""""""""""
vmap  d "+d
vmap  y "+y
nnoremap  x :tabedit $MYVIMRC
nnoremap ; :
xmap S <Plug>VSurround
nmap cs <Plug>Csurround
nmap ds <Plug>Dsurround
nmap gx <Plug>NetrwBrowseX
xmap gS <Plug>VgSurround
noremap gV `[v`]
vnoremap j gj
nnoremap j gj
vnoremap k gk
nnoremap k gk
nnoremap <silent> p p`]
map q: :q
omap s :normal vs
vnoremap <silent> s //e=&selection=='exclusive'?'+1':'':call histdel('search',-1)|let @/=histget('search',-1)gv
vmap v <Plug>(expand_region_expand)
nmap ySS <Plug>YSsurround
nmap ySs <Plug>YSsurround
nmap yss <Plug>Yssurround
nmap yS <Plug>YSurround
nmap ys <Plug>Ysurround
vnoremap <silent> y y`]
noremap <M-Down> }
noremap <D-Down> <C-End>
noremap <M-Up> {
noremap <D-Up> <C-Home>
noremap <M-Right> <C-Right>
noremap <D-Right> <End>
noremap <M-Left> <C-Left>
noremap <D-Left> <Home>
nnoremap <silent> <Plug>NetrwBrowseX :call netrw#NetrwBrowseX(expand("<cfile>"),0)
xnoremap <silent> <Plug>(expand_region_shrink) :call expand_region#next('v', '-')
xnoremap <silent> <Plug>(expand_region_expand) :call expand_region#next('v', '+')
nnoremap <silent> <Plug>(expand_region_expand) :call expand_region#next('n', '+')
nnoremap <silent> <Plug>SurroundRepeat .
vnoremap <Plug>(emmet-code-pretty) :call emmet#codePretty()
vnoremap <Plug>(emmet-merge-lines) :call emmet#mergeLines()
nnoremap <Plug>(emmet-anchorize-summary) :call emmet#anchorizeURL(1)
nnoremap <Plug>(emmet-anchorize-url) :call emmet#anchorizeURL(0)
nnoremap <Plug>(emmet-remove-tag) :call emmet#removeTag()
nnoremap <Plug>(emmet-split-join-tag) :call emmet#splitJoinTag()
nnoremap <Plug>(emmet-toogle-comment) :call emmet#toggleComment()
nnoremap <Plug>(emmet-image-size) :call emmet#imageSize()
nnoremap <Plug>(emmet-move-prev) :call emmet#moveNextPrev(1)
nnoremap <Plug>(emmet-move-next) :call emmet#moveNextPrev(0)
vnoremap <Plug>(emmet-balance-tag-outword) :call emmet#balanceTag(-2)
nnoremap <Plug>(emmet-balance-tag-outword) :call emmet#balanceTag(-1)
vnoremap <Plug>(emmet-balance-tag-inward) :call emmet#balanceTag(2)
nnoremap <Plug>(emmet-balance-tag-inward) :call emmet#balanceTag(1)
nnoremap <Plug>(emmet-update-tag) :call emmet#updateTag()
nnoremap <Plug>(emmet-expand-word) :call emmet#expandAbbr(1,"")
vnoremap <Plug>(emmet-expand-abbr) :call emmet#expandAbbr(2,"")
nnoremap <Plug>(emmet-expand-abbr) :call emmet#expandAbbr(3,"")
nnoremap <BS> gg
vmap <BS> "-d
imap S <Plug>ISurround
imap s <Plug>Isurround
imap  <Plug>Isurround
imap A <Plug>(emmet-anchorize-summary)
imap a <Plug>(emmet-anchorize-url)
imap k <Plug>(emmet-remove-tag)
imap j <Plug>(emmet-split-join-tag)
imap / <Plug>(emmet-toogle-comment)
imap i <Plug>(emmet-image-size)
imap N <Plug>(emmet-move-prev)
imap n <Plug>(emmet-move-next)
imap D <Plug>(emmet-balance-tag-outword)
imap d <Plug>(emmet-balance-tag-inward)
imap u <Plug>(emmet-update-tag)
imap ; <Plug>(emmet-expand-word)
imap , <Plug>(emmet-expand-abbr)
let &cpo=s:cpo_save
unlet s:cpo_save
set autoread
set autowrite
set background=dark
set backspace=indent,eol,start
set clipboard=unnamed
set completeopt=menu,longest
set digraph
set fileencodings=ucs-bom,utf-8,default,latin1
set fileformats=mac,unix,dos
set guifont=Inconsolata-dz\ for\ Powerline:h14
set guitablabel=%{GuiTabLabel()}
set helplang=en
set hidden
set history=1000
set hlsearch
set incsearch
set iskeyword=@,48-57,_,192-255,-,#,.
set langmenu=none
set laststatus=2
set matchtime=2
set mouse=a
set printexpr=system('open\ -a\ Preview\ '.v:fname_in)\ +\ v:shell_error
set runtimepath=~/.vim,~/.vim/bundle/Vundle.vim,~/.vim/bundle/vim-airline,~/.vim/bundle/vim-markdown,~/.vim/bundle/vim-less,~/.vim/bundle/vim-css3-syntax,~/.vim/bundle/emmet-vim,~/.vim/bundle/scss-syntax.vim,~/.vim/bundle/ctrlp.vim,~/.vim/bundle/vim-coloresque,~/.vim/bundle/vim-startify,~/.vim/bundle/ag.vim,~/.vim/bundle/vim-fugitive,~/.vim/bundle/SudoEdit.vim,~/.vim/bundle/vim-velocity,~/.vim/bundle/vim-surround,~/.vim/bundle/syntastic,~/.vim/bundle/vim-json,~/.vim/bundle/vim-expand-region,~/.vim/bundle/vim-colorschemes,~/.vim/bundle/gitignore,/Applications/MacVim.app/Contents/Resources/vim/vimfiles,/Applications/MacVim.app/Contents/Resources/vim/runtime,/Applications/MacVim.app/Contents/Resources/vim/vimfiles/after,~/.vim/after,~/.vim/bundle/Vundle.vim/after,~/.vim/bundle/vim-airline/after,~/.vim/bundle/vim-markdown/after,~/.vim/bundle/vim-less/after,~/.vim/bundle/vim-css3-syntax/after,~/.vim/bundle/emmet-vim/after,~/.vim/bundle/scss-syntax.vim/after,~/.vim/bundle/ctrlp.vim/after,~/.vim/bundle/vim-coloresque/after,~/.vim/
set shiftwidth=4
set showmatch
set showtabline=2
set softtabstop=4
set noswapfile
set tabstop=4
set termencoding=utf-8
set timeoutlen=500
set titlestring=%t%(\ %M%)%(\ (%{expand(\"%:p:h\")})%)%(\ %a%)\ -\ %{v:servername}
set viewoptions=folds,cursor,slash,unix
set window=40
" vim: set ft=vim :
