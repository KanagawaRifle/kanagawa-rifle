FROM mcr.microsoft.com/devcontainers/typescript-node:26
ARG NODE_VERSION=26.13.0
RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} && nvm alias default ${NODE_VERSION} && npm install -g npm@12.2.1"
ENV PATH=/usr/local/share/nvm/versions/node/v26.13.0/bin:${PATH}
