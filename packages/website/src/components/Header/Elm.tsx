'use client';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useTheme} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from "@mui/material/Toolbar";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import {useCallback,useState} from "react";
import * as React from 'react';

import styles from '@kanagawa-rifle/website/components/Header/Elm.module.scss';


type MenuItemType = {
  name: string;
  href: string;
}

// 定数
const MENU_ITEMS: MenuItemType[] = [
  { name: '協会について', href: '/about' },
  { name: '入会案内', href: '/join' },
  { name: '大会', href: '/competitions' },
  { name: '推薦', href: '/recommendation' },
  { name: '事業計画', href: '/projects' },
];

const MORE_MENU_ITEMS: MenuItemType[] = [
  { name: '様式', href: '/forms' },
  { name: 'リンク', href: '/links' },
];

const DRAWER_WIDTH = 250;

// ロゴコンポーネント
const Logo: React.FC = React.memo(() => {
  const theme = useTheme();

  return (
    <Typography
      variant="h6"
      component={Link}
      href="/"
      sx={{
        textAlign: 'center',
        textDecoration: 'none',
        fontFamily: 'Roboto',
        fontWeight: 900,
      }}
    >
      <Box component="span" sx={{ color: theme.palette.primary.main }}>
        Ｋ
      </Box>
      <Box component="span" sx={{ color: theme.palette.secondary.main }}>
        Ｒ
      </Box>
      <Box component="span" sx={{ color: '#4285f4' }}>
        Ａ
      </Box>
    </Typography>
  );
});

Logo.displayName = 'Logo';

// ドロワーコンテンツコンポーネント
interface DrawerContentProps {
  onClose: () => void;
}

const DrawerContent: React.FC<DrawerContentProps> = React.memo(({ onClose }) => (
  <Box sx={{ width: DRAWER_WIDTH }} role="presentation" onClick={onClose}>
    <List>
      {MENU_ITEMS.map((item) => (
        <ListItem key={item.href} disablePadding>
          <ListItemButton href={item.href} component={Link}>
            <ListItemText primary={item.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Box>
));

DrawerContent.displayName = 'DrawerContent';

const NavigationTabs: React.FC = React.memo(() => {

  const pathname = usePathname() || '/';
  const matchedPath = MENU_ITEMS.find(item => pathname.startsWith(item.href))?.href || false;

  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Tabs value={matchedPath}>
        {MENU_ITEMS.map((item) => (
          <Tab
            key={item.href}
            sx={{ fontWeight: '700' }}
            component={Link}
            label={item.name}
            href={item.href}
            value={item.href}
          />
        ))}
      </Tabs>
    </Box>
  )
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
        {MORE_MENU_ITEMS.map((item) => (
          <MenuItem
            key={item.href}
            component={Link}
            href={item.href}
            onClick={handleClose}
          >
            {item.name}
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

const MobileDrawer: React.FC<MobileDrawerProps> = React.memo(({
  open,
  onClose,
  className,
}) => (
  <Drawer open={open} onClose={onClose}>
    <AppBar
      color="inherit"
      position="sticky"
      elevation={0}
      className={clsx(styles.module, className)}
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
const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = useCallback((open: boolean) => () => {
    setDrawerOpen(open);
  }, []);

  return (
    <AppBar
      color="inherit"
      position="sticky"
      elevation={0}
      className={clsx(styles.module)}
      sx={{ backgroundColor: '#fff' }}
    >
      <Toolbar variant="dense" className="max-w-screen-md w-full mx-auto">
        {/* モバイルメニューボタン */}
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            onClick={handleDrawerToggle(true)}
            edge="start"
            color="inherit"
            aria-label="メニューを開く"
          >
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
      <MobileDrawer
        open={drawerOpen}
        onClose={handleDrawerToggle(false)}
      />
    </AppBar>
  );
};

export default Header;
