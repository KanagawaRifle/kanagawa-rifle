// packages/website/src/components/Footer.tsx
import { ListItem } from '@mui/material';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import * as React from 'react';
import { LuExternalLink } from 'react-icons/lu';

import { social, paths, app } from '@/config';

export function Footer() {
  return (
    <footer>
      <Box className="bg-slate-50">
        <nav>
          <Box className="mx-auto mt-2 max-w-screen-xl border-b border-slate-200 px-4 py-6">
            <ButtonGroup>
              {Object.entries(social).map(([key, obj]) => (
                <Tooltip title={obj.name} key={key}>
                  <IconButton aria-label={obj.name} target="_blank" href={obj.url}>
                    {obj.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </ButtonGroup>
          </Box>
        </nav>
        <nav>
          <Box className="mx-auto mt-2 grid max-w-screen-xl grid-cols-1 gap-4 border-b border-slate-200 px-4 py-6 md:grid-cols-3">
            <List dense disablePadding>
              {Object.entries(paths.main).map(([key, obj]) => (
                <ListItem key={key}>
                  <ListItemButton href={obj.getHref()} component={Link}>
                    <ListItemText>{obj.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List dense disablePadding>
              {Object.entries(paths.sub).map(([key, obj]) => (
                <ListItem key={key}>
                  <ListItemButton href={obj.getHref()} component={Link}>
                    <ListItemText>{obj.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <List dense disablePadding>
              {Object.entries(paths.external).map(([key, obj]) => (
                <ListItem key={key}>
                  <ListItemButton href={obj.getHref()} component={Link} target="_blank">
                    <ListItemText>
                      <Box className="flex items-center gap-1">
                        {obj.name}
                        <LuExternalLink />
                      </Box>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </nav>
        <nav>
          <Box className="mx-auto mt-2 max-w-screen-xl px-4 py-6 text-slate-500">
            <Box>
              <Link href={'/'} className="text-xs font-bold no-underline">
                {app.longName}
              </Link>
            </Box>
            <Box>
              <Link href={'/'} className="text-xl font-black no-underline">
                <Box component="span" sx={{ fontFamily: 'Roboto' }}>
                  {app.shortName.replace(/[A-Za-z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0xfee0))}
                </Box>
              </Link>
            </Box>
          </Box>
        </nav>
      </Box>
    </footer>
  );
}
