// 基本的なPathItemの型定義
export type PathItem = {
  name: string;
  getHref: (path?: string) => string;
  description?: string;
  children?: Record<string, PathItem>;
};

// 各カテゴリのキーを厳密に定義
type MainPathKeys = 'about' | 'join' | 'competitions' | 'recommendation' | 'projects' | 'news';
type SubPathKeys = 'forms' | 'links';
type ExternalPathKeys = 'jrsf' | 'yrsa' | 'nichiranet';

// competitionsの子要素のキーを定義
type CompetitionChildrenKeys = 'year2024' | 'year2023' | 'year2022';

// 特定のパスの型を詳細に定義
type CompetitionsPathItem = PathItem & {
  children: Record<CompetitionChildrenKeys, PathItem>;
};

// CDN用の特別な型（pathパラメータを持つgetHref）
type CdnPathItem = Omit<PathItem, 'getHref'> & {
  getHref: (path?: string) => string;
};

// メイン型定義 - 定義したキー型を活用
type Paths = {
  home: PathItem;
  main: Record<MainPathKeys, PathItem> & {
    competitions: CompetitionsPathItem;
  };
  sub: Record<SubPathKeys, PathItem>;
  external: Record<ExternalPathKeys, PathItem>;
  cdn: CdnPathItem;
};

// 実装部分
export const paths: Paths = {
  home: {
    name: 'ホーム',
    getHref: () => '/',
    description:
      'ライフル競技に興味のある方へ向けて、大会の開催・運営や普及活動を行い、スポーツ振興と子どもの健全育成を目指しています。',
  },

  main: {
    about: {
      name: '協会について',
      getHref: () => '/about',
      description:
        '神奈川県ライフル射撃協会の概要をご紹介します。事務局所在地や連絡先、口座情報、沿革、会長挨拶などを掲載しています。',
    },
    join: {
      name: '入会案内',
      getHref: () => '/join',
      description:
        '神奈川県ライフル射撃協会、または日本ライフル射撃協会へのご入会をご希望される方は、本ページをご参考にお申し込みください。',
    },
    competitions: {
      name: '大会',
      getHref: () => '/competitions',
      description:
        '各種大会の情報を掲載しています。参加料や大会要項、射座割、成績など、出場に必要な情報をご確認いただけます。',
      children: {
        year2024: {
          name: '大会（2024年度）',
          getHref: () => '/competitions/2024',
          description:
            '2024年度に開催された大会の情報を掲載しています。参加案内や成績など、当時の大会記録をまとめています。',
        },
        year2023: {
          name: '大会（2023年度）',
          getHref: () => '/competitions/2023',
          description:
            '2023年度に開催された大会の情報を掲載しています。参加案内や成績など、当時の大会記録をまとめています。',
        },
        year2022: {
          name: '大会（2022年度）',
          getHref: () => '/competitions/2022',
          description:
            '2022年度に開催された大会の情報を掲載しています。参加案内や成績など、当時の大会記録をまとめています。',
        },
      },
    },
    recommendation: {
      name: '推薦',
      getHref: () => '/recommendation',
      description: '推薦申請の手続き方法や手数料、注意事項などをまとめています。申請に必要な情報を掲載しています。',
    },
    projects: {
      name: '事業',
      getHref: () => '/projects',
      description: '各年度の事業計画や関連する案内を掲載しています。活動方針や取り組み内容をご覧いただけます。',
    },
    news: {
      name: 'お知らせ',
      description:
        '協会からのお知らせや最新情報を掲載しています。大会案内、行事予定、重要なお知らせなどをご確認いただけます。',
      getHref: () => '/news',
    },
  },

  sub: {
    forms: {
      name: '様式',
      description: '各種書類や様式を掲載しています。必要な資料をこのページからダウンロードできます。',
      getHref: () => '/forms',
    },
    links: {
      name: '関連リンク',
      getHref: () => '/links',
      description:
        '関連する団体や協会などへのリンクを掲載しています。射撃・銃に関わる各種組織の情報をご覧いただけます。',
    },
  },

  external: {
    jrsf: {
      name: '日本ライフル射撃協会',
      getHref: () => 'https://www.riflesports.jp',
    },
    yrsa: {
      name: '横須賀市ライフル射撃協会',
      getHref: () => 'https://yokosukarifle.web.fc2.com',
    },
    nichiranet: {
      name: 'ニチラネット',
      getHref: () => 'https://members.riflesports.jp/_login.cgi?top1',
    },
  },

  cdn: {
    name: 'CDN',
    getHref: (path?: string): string => {
      const baseUrl: string =
        process.env.NEXT_PUBLIC_STATIC_FILE_BASE_URL ?? 'https://static.kanagawa-rifle.org/website';

      if (!path) return baseUrl;

      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
      }

      const normalizedPath: string = path.startsWith('/') ? path : `/${path}`;
      const cleanBaseUrl: string = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

      return `${cleanBaseUrl}${normalizedPath}`;
    },
  },
};
