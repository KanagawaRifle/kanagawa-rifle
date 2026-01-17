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
type CompetitionChildrenKeys = 'year2026' | 'year2025' | 'year2024' | 'year2023' | 'year2022';

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
      '神奈川県ライフル射撃協会の公式サイト。スモールボア・エアライフル・ビームライフル競技の大会開催・運営や普及活動を行い、射撃スポーツの振興を目指しています。',
  },

  main: {
    about: {
      name: '協会について',
      getHref: () => '/about',
      description:
        '神奈川県ライフル射撃協会の概要。ライフル射撃競技の普及・振興を目的とした団体です。事務局所在地や連絡先、沿革などを掲載しています。',
    },
    join: {
      name: '入会案内',
      getHref: () => '/join',
      description:
        'ライフル射撃を始めたい方へ。神奈川県ライフル射撃協会への入会方法、年会費、入会特典などをご案内します。初心者の方も歓迎です。',
    },
    competitions: {
      name: '大会',
      getHref: () => '/competitions',
      description:
        'ライフル射撃大会の情報。スモールボア・エアライフル・ビームライフル競技の参加料、大会要項、射座割、成績など出場に必要な情報を掲載。',
      children: {
        year2026: {
          name: '大会（2026年度）',
          getHref: () => '/competitions/2026',
          description:
            '2026年度のライフル射撃大会記録。スモールボア・エアライフル・ビームライフル競技の参加案内や成績をまとめています。',
        },
        year2025: {
          name: '大会（2025年度）',
          getHref: () => '/competitions/2025',
          description:
            '2025年度のライフル射撃大会記録。スモールボア・エアライフル・ビームライフル競技の参加案内や成績をまとめています。',
        },
        year2024: {
          name: '大会（2024年度）',
          getHref: () => '/competitions/2024',
          description:
            '2024年度のライフル射撃大会記録。スモールボア・エアライフル・ビームライフル競技の参加案内や成績をまとめています。',
        },
        year2023: {
          name: '大会（2023年度）',
          getHref: () => '/competitions/2023',
          description:
            '2023年度のライフル射撃大会記録。スモールボア・エアライフル・ビームライフル競技の参加案内や成績をまとめています。',
        },
        year2022: {
          name: '大会（2022年度）',
          getHref: () => '/competitions/2022',
          description:
            '2022年度のライフル射撃大会記録。スモールボア・エアライフル・ビームライフル競技の参加案内や成績をまとめています。',
        },
      },
    },
    recommendation: {
      name: '推薦',
      getHref: () => '/recommendation',
      description:
        'ライフル射撃の銃砲所持許可に必要な推薦申請の手続き方法、手数料、注意事項をまとめています。',
    },
    projects: {
      name: '事業',
      getHref: () => '/projects',
      description:
        '神奈川県ライフル射撃協会の事業計画。射撃競技の普及活動や大会運営など、年度ごとの取り組み内容を掲載。',
    },
    news: {
      name: 'お知らせ',
      description:
        'ライフル射撃に関するお知らせや最新情報。大会案内、行事予定、射撃場情報などをご確認いただけます。',
      getHref: () => '/news',
    },
  },

  sub: {
    forms: {
      name: '様式',
      description:
        'ライフル射撃に関する各種書類や様式。入会申込書、推薦申請書など必要な資料をダウンロードできます。',
      getHref: () => '/forms',
    },
    links: {
      name: '関連リンク',
      getHref: () => '/links',
      description:
        'ライフル射撃に関連する団体へのリンク。日本ライフル射撃協会、各地域協会、射撃場などの情報を掲載。',
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
