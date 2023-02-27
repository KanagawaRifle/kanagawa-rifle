import * as React from 'react';
import clsx from 'clsx';
import Link from '@kanagawa-rifle/website/components/Link';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = (props) => {
  return (
    <footer>
      <div className="p-2 text-center max-w-xl mx-auto text-sm">
        <nav id="AppNav">
          <ul className="flex flex-wrap border border-white">
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline border-b border-white" href="/message">
                ご挨拶
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline border-b border-l border-white" href="/about">
                協会について
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline border-b border-l border-white" href="/projects">
                事業計画
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link
                className="p-2 block hover:underline border-b md:border-l border-white relative"
                href="/competitions"
              >
                <span className="absolute top-0 left-0 bg-red-700 inline-block text-xs text-white">new</span>
                <span>大会関係</span>
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline border-b border-l border-white" href="/recommendation">
                推薦関係
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline border-l md:border-b-0 border-b border-white" href="/join">
                入会案内
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline md:border-l border-white" href="/links">
                リンク
              </Link>
            </li>
            <li className="md:w-1/5 w-1/3 text-center">
              <Link className="p-2 block hover:underline border-l border-white" href="mailto:kraofficial@yahoo.co.jp">
                メール
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={clsx('p-2 mt-2', styles.sns)}>
        <ul className="flex justify-center -2 text-center max-w-screen-xl mx-auto">
          <li className="p-2 mx-2">
            <Link className="block" target="_blank" href="https://www.facebook.com/KanagawaRifle">
              <FontAwesomeIcon size="xl" fixedWidth={true} icon={faFacebook} />
            </Link>
          </li>
          <li className="p-2 mx-2">
            <Link className="block" target="_blank" href="https://twitter.com/KanagawaRifle">
              <FontAwesomeIcon size="xl" fixedWidth={true} icon={faTwitter} />
            </Link>
          </li>
          <li className="p-2 mx-2">
            <Link className="block" target="_blank" href="https://www.instagram.com/KanagawaRifle">
              <FontAwesomeIcon size="xl" fixedWidth={true} icon={faInstagram} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
