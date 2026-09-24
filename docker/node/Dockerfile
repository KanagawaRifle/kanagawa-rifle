FROM node:24.21.0

# Lighthouse CI 用の Chromium をインストール
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Chromium のパスを環境変数に設定
ENV CHROME_PATH=/usr/bin/chromium
