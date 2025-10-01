'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
  useTheme,
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
} from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback, useState } from 'react';

import { paths } from '@/config';

const DRAWER_WIDTH = 250;

// ロゴコンポーネント
const Logo: React.FC = React.memo(() => {
  const theme = useTheme();

  return (
    <Link href="/" className="text-center text-xl font-black no-underline" style={{ fontFamily: 'Roboto' }}>
      <Box component="span" sx={{ color: theme.palette.primary.main }}>
        Ｋ
      </Box>
      <Box component="span" sx={{ color: theme.palette.secondary.main }}>
        Ｒ
      </Box>
      <Box component="span" sx={{ color: '#4285f4' }}>
        Ａ
      </Box>
    </Link>
  );
});

Logo.displayName = 'Logo';

// ドロワーコンテンツコンポーネント
type DrawerContentProps = {
  onClose: () => void;
};

const DrawerContent: React.FC<DrawerContentProps> = React.memo(({ onClose }) => (
  <Box sx={{ width: DRAWER_WIDTH }} role="presentation" onClick={onClose}>
    <List>
      {Object.entries(paths.main).map(([key, obj]) => (
        <ListItem key={key} disablePadding>
          <ListItemButton href={obj.getHref()} component={Link}>
            <ListItemText primary={obj.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
));

DrawerContent.displayName = 'DrawerContent';

const NavigationTabs: React.FC = React.memo(() => {
  const pathname = usePathname() ?? '/';
  const matchedPath =
    Object.values(paths.main)
      .find((obj) => pathname.startsWith(obj.getHref()))
      ?.getHref() ?? false;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Tabs value={matchedPath}>
        {Object.entries(paths.main).map(([key, obj]) => (
          <Tab
            key={key}
            sx={{ fontWeight: '700' }}
            component={Link}
            label={obj.name}
            href={obj.getHref()}
            value={obj.getHref()}
          />
        ))}
      </Tabs>
    </Box>
  );
});

NavigationTabs.displayName = 'NavigationTabs';

// その他メニューコンポーネント
const MoreMenu: React.FC = React.memo(() => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const isOpen = Boolean(anchorEl);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="その他">
        <IconButton onClick={handleOpen} edge="end" color="inherit">
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '30px' }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        elevation={1}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isOpen}
        onClose={handleClose}
      >
        {Object.entries(paths.sub).map(([key, obj]) => (
          <MenuItem key={key} component={Link} href={obj.getHref()} onClick={handleClose}>
            {obj.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
});

MoreMenu.displayName = 'MoreMenu';

// モバイルドロワーコンポーネント
interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

const MobileDrawer: React.FC<MobileDrawerProps> = React.memo(({ open, onClose, className }) => (
  <Drawer open={open} onClose={onClose}>
    <AppBar
      color="inherit"
      position="sticky"
      elevation={0}
      className={clsx(className)}
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #dadce0',
      }}
    >
      <Toolbar variant="dense">
        <IconButton edge="start" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Logo />
      </Toolbar>
    </AppBar>
    <DrawerContent onClose={onClose} />
  </Drawer>
));

MobileDrawer.displayName = 'MobileDrawer';

// メインコンポーネント
export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (open: boolean) => () => {
      setDrawerOpen(open);
    },
    [],
  );

  return (
    <AppBar color="inherit" position="sticky" elevation={0} sx={{ backgroundColor: '#fff' }}>
      <Toolbar variant="dense" className="mx-auto w-full max-w-screen-md">
        {/* モバイルメニューボタン */}
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          <IconButton onClick={handleDrawerToggle(true)} edge="start" color="inherit" aria-label="メニューを開く">
            <MenuIcon />
          </IconButton>
        </Box>

        {/* ロゴ */}
        <Box sx={{ flexGrow: { xs: 1, md: 0 }, mr: 2 }}>
          <Logo />
        </Box>

        {/* デスクトップナビゲーション */}
        <NavigationTabs />

        {/* その他メニュー */}
        <MoreMenu />
      </Toolbar>

      {/* モバイルドロワー */}
      <MobileDrawer open={drawerOpen} onClose={handleDrawerToggle(false)} />
    </AppBar>
  );
}
