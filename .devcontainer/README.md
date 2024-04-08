使用说明

# 云端使用
使用 .devcontainer/devcontainer.json 


# 本地使用

使用 .devcontainer/local/devcontainer.json  
+ local 中使用 云端中构建的镜像--- 解决无法使用本地构建的镜像问题

## 解决 镜像无法下载的问题


https://stackoverflow.com/questions/74656167/unable-to-pull-image-from-github-container-registry-ghcr
> 先 取消登录 docker logout ghcr.io
> 再生成 token 去登录 。user: 邮箱名




# 新建项目使用前
+ 修改 devcontainer 中属性： 基础镜像、插件等
+ 修改 workflows/main.yml 中的镜像名: imageName
+ 修改 local/devcontainer.json 中的镜像名: imageName
+ 开发流水线权限：  workflow permissions / Read and write permissions