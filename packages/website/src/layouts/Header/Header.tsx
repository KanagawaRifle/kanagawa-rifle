import * as React from 'react';




import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useTheme} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
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

import Link from '@kanagawa-rifle/website/components/Link';

import styles from './Header.module.scss';

export type HeaderProps = {} & React.ComponentProps<'div'>;

const menuItems:Array<{name: string, href: string}> = [
  {name: '協会について', href: '/about'},
  {name: '入会案内', href: '/join'},
  {name: '大会', href: '/competitions'},
  {name: '推薦', href: '/recommendation'},
  {name: '事業計画', href: '/projects'},
]

const Header: React.FC<HeaderProps> = (props) => {
  const { className} = { ...props };
  const theme = useTheme();
  const pathname = '/' + usePathname()?.split('/')?.[1];

  const [anchorElMore, setAnchorElMore] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenMoreMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMore(event.currentTarget);
  };

  const handleCloseMoreMenu = () => {
    setAnchorElMore(null);
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const Logo: React.FC = () => {
    return (
      <Typography
        variant={'h6'}
        component={Link as React.ElementType}
        href="/"
        sx={{textAlign: 'center', textDecoration: 'none', fontFamily: 'Roboto', fontWeight: 900}}
      >
        <Box component={'span'} sx={{color: theme.palette.primary.main}}>Ｋ</Box>
        <Box component={'span'} sx={{color: theme.palette.secondary.main}}>Ｒ</Box>
        <Box component={'span'} sx={{color: "#4285f4"}}>Ａ</Box>
      </Typography>
    );
  }

  const DrawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton href={item.href} component={Link as React.ElementType}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
      <AppBar
        color={'inherit'}
        position="sticky"
        elevation={0}
        className={clsx(styles.module, className)}
        sx={{backgroundColor: '#fff'}}
      >
        <Toolbar variant="dense">
          <Box  sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="start"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: { xs: 1, md: 0 }, mr: 2}}>
            <Logo />
          </Box>
          <Box  sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Tabs value={pathname}>
              {menuItems.map((item,index) => {
                return <Tab
                  key={index}
                  className={'font-bold'}
                  component={Link as React.ElementType}
                  label={item.name}
                  href={item.href}
                  value={item.href}
                />
              })}
            </Tabs>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="その他">
              <IconButton
                onClick={handleOpenMoreMenu}
                edge="end"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '30px' }}
              anchorEl={anchorElMore}
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
              open={Boolean(anchorElMore ?? undefined)}
              onClose={handleCloseMoreMenu}
            >
              <MenuItem component={Link as React.ElementType} href={'/forms'}>様式</MenuItem>
              <MenuItem component={Link as React.ElementType} href={'/links'}>リンク</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          <AppBar
            color={'inherit'}
            position="sticky"
            elevation={0}
            className={clsx(styles.module, className)}
            sx={{backgroundColor: '#fff', borderBottom: '1px solid #dadce0'}}
          >
            <Toolbar variant="dense">
              <Box >
                <IconButton
                  edge="start"
                  color="inherit"
                >
                  <CloseIcon onClick={toggleDrawer(false)} />
                </IconButton>
              </Box>
              <Logo />
            </Toolbar>
          </AppBar>
          {DrawerContent}
        </Drawer>
      </AppBar>
  );
};

export default Header;
