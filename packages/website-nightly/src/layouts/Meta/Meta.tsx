import * as React from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const siteURL =  process.env.NEXT_PUBLIC__SITE_URL as string;
  const currentURL = `${siteURL}${router.pathname}`

  const metaRobots: Array<string> = [];
  noIndex && metaRobots.push('noindex');
  noFollow && metaRobots.push('nofollow');

  return (
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <title>{`${title}：${category}`}</title>
      <meta name="description" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@KanagawaRifle" />
      <meta name="twitter:creator" content="@KanagawaRifle" />

      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={`${siteURL}/opengraph-image.png`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentURL} />
      <meta property="og:site_name" content="神奈川県ライフル射撃協会" />
      <meta property="fb:app_id" content="627531405479342" />

      {metaRobots.length !== 0 && <meta name="robots" content={metaRobots.join(',')} />}
    </Head>
  );
};

export default Meta;
