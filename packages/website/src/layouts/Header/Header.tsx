import * as React from 'react';

import Link from '@kanagawa-rifle/website/components/Link';
import clsx from 'clsx';

import styles from './Header.module.scss';

export type HeaderProps = {} & React.ComponentProps<'div'>;

const Header: React.FC<HeaderProps> = (props) => {
  const { className, ...others } = { ...props };

  return (
    <div className={clsx(styles.module, 'p-2 text-center', className)} {...others}>
      <h1>
        <Link className="text-white" href="/">
          <span className="text-xl">ＮＰＯ法人</span>
          <br />
          <span className="text-2xl font-bold">神奈川県ライフル射撃協会</span>
        </Link>
      </h1>
    </div>
  );
};

export default Header;
