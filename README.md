<<<<<<< HEAD
# 共销汇前端开发说明

## 构建过程
## v1.0版文档
``` bash
## git 安装过程
# mac用户安装git:http://sourceforge.net/projects/git-osx-installer/
# windows用户安装git:https://gitforwindows.org/
# linux用户安装git (e.g centos):
sudo yum install git
# or (e.g ubuntu):
sudo apt-get install git

## 进入终端输入
git config --global user.name "your name"
git config --global user.email "example@xxx.com"

git clone git@vue.boka.cn:/home/git/xsb.git
cd xsb
git init

# linux用户:
cd .git
vi config
# windows用户:
直接在../.git/目录下打开config文件
# 文件后面添加:
[remote "origin"]
  url = git@vue.boka.cn:/home/git/xsb.git
  fetch = +refs/heads/*:refs/remotes/origin/*  
# 查看分支
git branch
# 如果没有任何分支
git add .
git commit -m "init"
# 再次查看分支
git branch
# 如显示 * master 代表在主分支下
# 创建新分支 xx (注意:xx代表分支名称，可自己随意起)
git branch xx
# 切换分支到 xx
git checkout xx
# 拉取代码到xx分支
git pull origin xx

## 搭建node环境
# 安装nvm 具体安装方式可查看 https://github.com/creationix/nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
or Wget:
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# 安装node的最新长期支持版本，long time support
nvm install --lts
# 查看npm是否安装成功
npm --version
# 成功则显示版本信息

## 启动项目
# 进入xsb目录下
cd xsb
# 安装依赖包
npm update
# 启动项目
npm start
# 访问项目
# 浏览器地址栏输入: http://127.0.0.1/#/center

## 关于协同开发的步骤
# 开发组成员生成pubkey，终端输入:
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# id_rsa通常在目录home/.ssh/
# linux用户查看ssh key:
cat /home/.ssh/id_rsa.pub
# windows用户直接根据生成成功后提示的文件目录直接打开查看
# 将id_rsa的内容提交系统管理员
# 系统管理员在服务器上添加用户组权限(以下是系统管理员操作,非系统管理员可忽略):
vi /home/git/.ssh/authorized_keys
# 每行ssh key对应一个用户

# 开发人员协同操作
# 进入开发目录
cd xsb
# 切换到自己的分支
git checkout xx
# 先备份自己的分支
git push origin xx
# 再切回到主分支
git checkout master
# 合并分支
git merge xx
# 同步到远程服务器主分支
git push origin master
# 即可再浏览器中输入: http://vue.boka.cn/#/center 查看结果

## 关于git对项目的版本管理说明
# 开发人员各自在自己建立的分支下面开发，不要随意合并远程分支
# 如需合并远程分支进行调试开发，请先进行备份，先将远程主分支拉取到本地备份分支上
# 可建立新分支进行备份，如已建立可直接拉取远程分支:
git branch backup
git checkout backup
git pull origin backup
# 合并远程主分支过程
git checkout master
git merge xx
# 以上xx是自己的开发分支，也就是准备在服务器上调试的分支代码
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
start up up
