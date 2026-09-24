export type PathItem = {
  name: string;
  getHref: () => string;
  description?: string;
};

// 実装部分
export const paths = {
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
        '神奈川県ライフル射撃協会の概要。ライフル射撃競技の普及・振興を目的とした団体です。事務局の所在地・連絡先、会費等の振込先を掲載しています。',
    },
    join: {
      name: '入会案内',
      getHref: () => '/join',
      description:
        'ライフル射撃を始めたい方へ。神奈川県ライフル射撃協会への入会の流れ、申込書、年会費、日本ライフル射撃協会への登録についてご案内します。',
    },
    competitions: {
      name: '大会',
      getHref: () => '/competitions',
      description:
        'ライフル射撃大会の情報。スモールボア・エアライフル・ビームライフル競技の参加料、大会要項、射座割、成績など出場に必要な情報を掲載。',
    },
    recommendation: {
      name: '推薦',
      getHref: () => '/recommendation',
      description: 'ライフル射撃の銃砲所持許可に必要な推薦申請の手続き方法、手数料、注意事項をまとめています。',
    },
    projects: {
      name: '事業',
      getHref: () => '/projects',
      description:
        '神奈川県ライフル射撃協会の事業計画。射撃競技の普及活動や大会運営など、年度ごとの取り組み内容を掲載。',
    },
    news: {
      name: 'お知らせ',
      description: 'ライフル射撃に関するお知らせや最新情報。大会案内、行事予定、射撃場情報などをご確認いただけます。',
      getHref: () => '/news',
    },
  },

  sub: {
    forms: {
      name: '様式',
      description: 'ライフル射撃に関する各種書類や様式。入会申込書、推薦申請書など必要な資料をダウンロードできます。',
      getHref: () => '/forms',
    },
    links: {
      name: '関連リンク',
      getHref: () => '/links',
      description:
        'ライフル射撃に関連する団体へのリンク。地域の射撃協会、射撃場、射撃用品の専門店などを紹介しています。',
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
};

/** Metadata for an archive; supported years are owned by the competition registry. */
export function getCompetitionPath(year: number): PathItem {
  return {
    name: `大会（${year}年度）`,
    getHref: () => `/competitions/${year}`,
    description: `${year}年度のライフル射撃大会記録。スモールボア・エアライフル・ビームライフル競技の参加案内や成績をまとめています。`,
  };
}
