import * as React from 'react';

import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';

import Link from 'next/link'

import styles from './Footer.module.scss';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer className={styles.module}>
      <nav className={clsx('px-4 py-6 mt-2 max-w-screen-xl mx-auto', styles.nav)}>
        <ul className="flex">
          <li className="p-2">
            <Link className="block" target="_blank" href="https://www.facebook.com/KanagawaRifle">
              <FontAwesomeIcon size="xl" fixedWidth={true} icon={faFacebook} />
            </Link>
          </li>
          <li className="p-2 mx-2">
            <Link className="block" target="_blank" href="https://twitter.com/KanagawaRifle">
              <FontAwesomeIcon size="xl" fixedWidth={true} icon={faTwitter} />
            </Link>
          </li>
          <li className="p-2">
            <Link className="block" target="_blank" href="https://www.instagram.com/KanagawaRifle">
              <FontAwesomeIcon size="xl" fixedWidth={true} icon={faInstagram} />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={clsx('px-4 py-6 mt-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4', styles.nav)}>
        <ul>
          <li className={'my-2'}><Link className={'no-underline'} href={'/about'}>協会について</Link></li>
          <li className={'my-2'}><Link className={'no-underline'} href={'/join'}>入会案内</Link></li>
          <li className={'my-2'}><Link className={'no-underline'} href={'/projects'}>事業計画</Link></li>
          <li className={'my-2'}><Link className={'no-underline'} href={'/competitions'}>大会</Link></li>
          <li className={'my-2'}><Link className={'no-underline'} href={'/recommendation'}>推薦</Link></li>
        </ul>
        <ul>
          <li className={'my-2'}><Link className={'no-underline'} href={'/forms'}>様式</Link></li>
          <li className={'my-2'}><Link className={'no-underline'} href={'/links'}>リンク</Link></li>
        </ul>
        <ul>
          <li className={'my-2'}><Link className={'no-underline'} target="_blank" href={'https://www.riflesports.jp/'}>日本ライフル射撃協会<FontAwesomeIcon size="sm" fixedWidth={true} icon={faArrowUpRightFromSquare} /></Link></li>
          <li className={'my-2'}><Link className={'no-underline'} target="_blank" href={'https://yokosukarifle.web.fc2.com/'}>横須賀市ライフル射撃協会<FontAwesomeIcon size="sm" fixedWidth={true} icon={faArrowUpRightFromSquare} /></Link></li>
          <li className={'my-2'}><Link className={'no-underline'} target="_blank" href={'https://members.riflesports.jp/_login.cgi?top1'}>ニチラネット<FontAwesomeIcon size="sm" fixedWidth={true} icon={faArrowUpRightFromSquare} /></Link></li>


        </ul>
      </nav>
      <nav className={clsx('px-4 py-6 mt-2 max-w-screen-xl mx-auto', styles.nav)}>
        <div><Link href={'/'} className={'font-bold text-xs no-underline'}>特定非営利活動法人　神奈川県ライフル射撃協会</Link></div>
        <div><Link href={'/'} className={'text-xl no-underline'} sx={{fontFamily: 'Roboto', fontWeight: 900}}>ＫＲＡ</Link></div>
      </nav>
    </footer>
  );
};

export default Footer;
