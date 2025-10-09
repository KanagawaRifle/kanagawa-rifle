import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  eslint: false, // ESLint設定の解析を完全に無効化
  workspaces: {
    '.': {},
    'packages/website': {},
  },
};

export default config;
