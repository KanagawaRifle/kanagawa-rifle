import { render, screen, within } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Footer } from '../Footer';

// config モジュールをモック
vi.mock('@/config/social', () => {
  return {
    social: {
      twitter: {
        name: 'Twitter',
        url: 'https://twitter.com/example',
      },
      facebook: {
        name: 'Facebook',
        url: 'https://facebook.com/example',
      },
    },
  };
});

vi.mock('@/components/icons/social', async () => {
  const { createElement } = await import('react');
  return {
    TwitterIcon: () => createElement('span', { 'data-testid': 'twitter-icon' }, 'Twitter Icon'),
    FacebookIcon: () => createElement('span', { 'data-testid': 'facebook-icon' }, 'Facebook Icon'),
    InstagramIcon: () => null,
  };
});

vi.mock('@/config/paths', () => ({
  paths: {
    main: {
      home: {
        name: 'ホーム',
        getHref: () => '/',
      },
      about: {
        name: '協会について',
        getHref: () => '/about',
      },
    },
    sub: {
      news: {
        name: 'お知らせ',
        getHref: () => '/news',
      },
      contact: {
        name: 'お問い合わせ',
        getHref: () => '/contact',
      },
    },
    external: {
      jrfu: {
        name: '日本ライフル射撃協会',
        getHref: () => 'https://riflesports.jp',
      },
    },
  },
}));

vi.mock('@/config/app', () => ({
  app: {
    longName: '神奈川県ライフル射撃協会',
    shortName: 'KANAGAWA RIFLE',
  },
}));

describe('Footer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Structure', () => {
    it('renders footer element', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('renders two navigation sections', () => {
      render(<Footer />);
      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(2);
    });
  });

  describe('Social Links', () => {
    it('renders all social media buttons', () => {
      render(<Footer />);

      const twitterButton = screen.getByLabelText('Twitter');
      const facebookButton = screen.getByLabelText('Facebook');

      expect(twitterButton).toBeInTheDocument();
      expect(facebookButton).toBeInTheDocument();
    });

    it('social media buttons have correct hrefs', () => {
      render(<Footer />);

      const twitterButton = screen.getByLabelText('Twitter');
      const facebookButton = screen.getByLabelText('Facebook');

      expect(twitterButton).toHaveAttribute('href', 'https://twitter.com/example');
      expect(facebookButton).toHaveAttribute('href', 'https://facebook.com/example');
    });

    it('social media buttons open in new tab', () => {
      render(<Footer />);

      const twitterButton = screen.getByLabelText('Twitter');
      const facebookButton = screen.getByLabelText('Facebook');

      expect(twitterButton).toHaveAttribute('target', '_blank');
      expect(facebookButton).toHaveAttribute('target', '_blank');
    });

    it('displays tooltips on social media buttons', () => {
      render(<Footer />);

      // MUI Tooltip は aria-label として title を設定する
      expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('Facebook')).toBeInTheDocument();
    });
  });

  describe('Main Navigation Links', () => {
    it('renders main navigation links', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: '協会について' })).toBeInTheDocument();
    });

    it('main navigation links have correct hrefs', () => {
      render(<Footer />);

      const homeLink = screen.getByRole('link', { name: 'ホーム' });
      const aboutLink = screen.getByRole('link', { name: '協会について' });

      expect(homeLink).toHaveAttribute('href', '/');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('main navigation links do not open in new tab', () => {
      render(<Footer />);

      const homeLink = screen.getByRole('link', { name: 'ホーム' });
      expect(homeLink).not.toHaveAttribute('target', '_blank');
    });
  });

  describe('Sub Navigation Links', () => {
    it('renders sub navigation links', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: 'お知らせ' })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'お問い合わせ' })).toBeInTheDocument();
    });

    it('sub navigation links have correct hrefs', () => {
      render(<Footer />);

      const newsLink = screen.getByRole('link', { name: 'お知らせ' });
      const contactLink = screen.getByRole('link', { name: 'お問い合わせ' });

      expect(newsLink).toHaveAttribute('href', '/news');
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('External Links', () => {
    it('renders external links', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: /日本ライフル射撃協会/ })).toBeInTheDocument();
    });

    it('external links have correct hrefs', () => {
      render(<Footer />);

      const jrfuLink = screen.getByRole('link', { name: /日本ライフル射撃協会/ });
      expect(jrfuLink).toHaveAttribute('href', 'https://riflesports.jp');
    });

    it('external links open in new tab', () => {
      render(<Footer />);

      const jrfuLink = screen.getByRole('link', { name: /日本ライフル射撃協会/ });
      expect(jrfuLink).toHaveAttribute('target', '_blank');
    });

    it('external links display external link icon', () => {
      render(<Footer />);

      const jrfuLink = screen.getByRole('link', { name: /日本ライフル射撃協会/ });
      const listItemText = within(jrfuLink).getByText(/日本ライフル射撃協会/);

      expect(listItemText).toBeInTheDocument();
      // 外部リンクアイコンが存在することを確認
      expect(jrfuLink.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('App Information', () => {
    it('renders app long name', () => {
      render(<Footer />);

      const longNameLinks = screen.getAllByRole('link', { name: '神奈川県ライフル射撃協会' });
      expect(longNameLinks.length).toBeGreaterThan(0);
    });

    it('renders app short name in full-width characters', () => {
      render(<Footer />);

      // 全角文字に変換された "KANAGAWA RIFLE" を探す
      const shortNameElement = screen.getByText(/ＫＡＮＡＧＡＷＡ ＲＩＦＬＥ/);
      expect(shortNameElement).toBeInTheDocument();
    });

    it('app name links point to home', () => {
      render(<Footer />);

      const links = screen.getAllByRole('link', { name: '神奈川県ライフル射撃協会' });
      links.forEach((link) => {
        expect(link).toHaveAttribute('href', '/');
      });
    });

    it('applies correct font family to short name', () => {
      render(<Footer />);

      const shortNameElement = screen.getByText(/ＫＡＮＡＧＡＷＡ ＲＩＦＬＥ/);
      expect(shortNameElement).toHaveStyle({ fontFamily: 'Roboto' });
    });
  });

  describe('Styling', () => {
    it('applies correct background color', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('bg-muted');
    });

    it('applies border styling to navigation sections', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      const borderedSections = footer.querySelectorAll('.border-b.border-border');

      expect(borderedSections.length).toBeGreaterThan(0);
    });

    it('applies responsive grid layout', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      const gridContainer = footer.querySelector('.grid.grid-cols-1.md\\:grid-cols-3');

      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has semantic footer element', () => {
      render(<Footer />);

      const footer = screen.getByRole('contentinfo');
      expect(footer.tagName).toBe('FOOTER');
    });

    it('all interactive elements are accessible', () => {
      render(<Footer />);

      // MUIのIconButtonはhref付きなので<a>タグとしてレンダリングされる
      // そのため role="link" になる
      const links = screen.getAllByRole('link');

      expect(links.length).toBeGreaterThan(0);

      // すべてにaria-labelまたは表示テキストがある
      links.forEach((element) => {
        const hasAccessibleName = element.getAttribute('aria-label') || element.textContent?.trim();
        expect(hasAccessibleName).toBeTruthy();
      });
    });

    it('social media links have proper aria-labels', () => {
      render(<Footer />);

      // ソーシャルメディアリンクはaria-labelを持つ
      const twitterLink = screen.getByLabelText('Twitter');
      const facebookLink = screen.getByLabelText('Facebook');

      expect(twitterLink).toHaveAttribute('aria-label', 'Twitter');
      expect(facebookLink).toHaveAttribute('aria-label', 'Facebook');
    });

    it('navigation links have accessible text', () => {
      render(<Footer />);

      // ナビゲーションリンクは表示テキストでアクセス可能
      const homeLink = screen.getByRole('link', { name: 'ホーム' });
      const aboutLink = screen.getByRole('link', { name: '協会について' });

      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
    });

    it('navigation sections are properly marked up', () => {
      render(<Footer />);

      const navElements = screen.getAllByRole('navigation');
      expect(navElements).toHaveLength(2);
    });
  });

  describe('Snapshot', () => {
    it('matches snapshot', () => {
      const { container } = render(<Footer />);
      expect(container).toMatchSnapshot();
    });
  });
});
