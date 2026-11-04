import { HeaderLogo } from '@/components/HeaderLogo';
import { MobileMenuButton, MoreMenuButton } from '@/components/HeaderMenus';
import { NavigationTabs } from '@/components/NavigationTabs';
import { ThemeToggle } from '@/components/ThemeToggle';
import { paths } from '@/config/paths';

const navigationItems = Object.values(paths.main).map(({ name, getHref }) => ({ name, href: getHref() }));

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-50">
      <div className="mx-auto flex h-12 w-full max-w-screen-md items-center px-2">
        <div className="flex md:hidden">
          <MobileMenuButton />
        </div>
        <div className="mr-4 flex-grow md:flex-grow-0">
          <HeaderLogo />
        </div>
        <NavigationTabs items={navigationItems} />
        <ThemeToggle />
        <MoreMenuButton />
      </div>
    </header>
  );
}
