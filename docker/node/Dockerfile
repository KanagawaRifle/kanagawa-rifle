FROM node:26.9.0

# Lighthouse CI 用の Chromium をインストール
# Install the current security-patched Chromium from the base distribution.
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Chromium のパスを環境変数に設定
ENV CHROME_PATH=/usr/bin/chromium

RUN npm install --global npm@11.19.0
