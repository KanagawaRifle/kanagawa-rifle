export type PathItem = {
  name: string;
  title?: string;
  getHref: () => string;
  description?: string;
};

export const NEWS_FEED_PATH = '/feed.xml';

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
      title: '協会概要・事務局・連絡先',
      getHref: () => '/about',
      description:
        '特定非営利活動法人 神奈川県ライフル射撃協会の概要。横須賀市・くりはま花の国エアライフル射撃場内の事務局所在地、電話・メールの連絡先、会費等の振込先を掲載しています。',
    },
    join: {
      name: '入会案内',
      title: '入会案内・会費',
      getHref: () => '/join',
      description:
        'ライフル射撃を始めたい方へ。神奈川県ライフル射撃協会への入会の流れ、申込書、年会費、日本ライフル射撃協会への登録についてご案内します。',
    },
    competitions: {
      name: '大会',
      title: '大会日程・要項・結果',
      getHref: () => '/competitions',
      description:
        '神奈川県ライフル射撃協会が主催・主管する大会の日程、会場、大会要項、射座割、成績を掲載。スモールボア・エアライフル・ビームライフル競技の申込方法、参加料、過去年度の記録を確認できます。',
    },
    recommendation: {
      name: '推薦',
      title: '銃砲所持許可の推薦申請・手数料',
      getHref: () => '/recommendation',
      description: 'ライフル射撃の銃砲所持許可に必要な推薦申請の手続き方法、手数料、注意事項をまとめています。',
    },
    projects: {
      name: '事業',
      title: '事業計画・年間予定',
      getHref: () => '/projects',
      description:
        '神奈川県ライフル射撃協会の事業計画。射撃競技の普及活動や大会運営など、年度ごとの取り組み内容を掲載。',
    },
    news: {
      name: 'お知らせ',
      description:
        '神奈川県ライフル射撃協会からのお知らせ。大会要項・射座割・成績、行事予定、射撃場の休場情報、会費や推薦申請に関する案内を掲載しています。',
      getHref: () => '/news',
    },
  },

  sub: {
    forms: {
      name: '様式',
      title: '申請書・各種様式',
      description:
        '神奈川県ライフル射撃協会の申請書・各種様式をダウンロード。大会申込書、入会申込書、段級審査受験申請書、インテグリティ講習会・ライフル射撃講習会の申込書を掲載しています。',
      getHref: () => '/forms',
    },
    links: {
      name: '関連リンク',
      title: '射撃協会・射撃場・専門店の関連リンク',
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
    description: `${year}年度の神奈川県ライフル射撃協会の大会日程・記録。スモールボア・エアライフル・ビームライフル競技の日程、会場、大会要項、射座割、成績など、公開済みの資料を確認できます。`,
  };
}
