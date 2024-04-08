# 参数
ARG BASE_IMAGE=mcr.microsoft.com/devcontainers/base:focal
# 必须是 USER(EvilJoker) + 仓库名（codespace_template ）
ARG IMAGE_SOURCE=https://github.com/EvilJoker/codespace_template 


FROM ${BASE_IMAGE}
# 镜像名，让仓库可以找到这个镜像
LABEL org.opencontainers.image.source=${IMAGE_SOURCE}

ARG DEBIAN_FRONTEND=noninteractive