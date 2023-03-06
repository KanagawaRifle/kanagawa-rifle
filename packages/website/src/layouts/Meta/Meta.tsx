import * as React from 'react';

import Head from 'next/head';

export type MetaProps = {
  title: string;
  category?: string;
  description?: string;
  noIndex?: boolean;
  noFollow?: boolean;
};

const Meta: React.FC<MetaProps> = (props) => {
  const {
    title,
    category = '神奈川県ライフル射撃協会',
    description = '特定非営利活動法人神奈川県ライフル射撃協会の公式サイトです。',
    noIndex = false,
    noFollow = false,
  } = { ...props };

  const metaRobots: Array<string> = [];
  noIndex && metaRobots.push('noindex');
  noFollow && metaRobots.push('nofollow');

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{`${title}：${category}`}</title>
      <meta name="description" content={description} />

      {metaRobots.length !== 0 && <meta name="robots" content={metaRobots.join(',')} />}
    </Head>
  );
};

export default Meta;
