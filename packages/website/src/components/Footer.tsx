
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Link from 'next/link';
import * as React from 'react';
import {LuExternalLink} from "react-icons/lu";

import {social, paths, app} from "@/config";

export function Footer() {
  return (
    <footer>
      <Box className="bg-slate-50">
        <nav>
          <Box className="px-4 py-6 mt-2 max-w-screen-xl mx-auto border-b border-slate-200">
            <ButtonGroup>
              {Object.entries(social).map(([key, obj]) =>
                <Tooltip title={obj.name} key={key}>
                  <IconButton aria-label={obj.name} target="_blank" href={obj.url}>
                    {obj.icon}
                  </IconButton>
                </Tooltip>
              )}
            </ButtonGroup>
          </Box>
        </nav>
        <nav>
          <Box
            className="px-4 py-6 mt-2 max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-200">
            <List dense disablePadding>
              {Object.entries(paths.main).map(([key, obj]) =>
                <ListItemButton href={obj.getHref()} key={key} component={Link}>
                  <ListItemText>{obj.name}</ListItemText>
                </ListItemButton>
              )}
            </List>
            <List dense disablePadding>
              {Object.entries(paths.sub).map(([key, obj]) =>
                <ListItemButton href={obj.getHref()} key={key} component={Link}>
                  <ListItemText>{obj.name}</ListItemText>
                </ListItemButton>
              )}
            </List>
            <List dense disablePadding>
              {Object.entries(paths.external).map(([key, obj]) =>
                <ListItemButton href={obj.getHref()} key={key} component={Link} target="_blank">
                  <ListItemText><Box
                    className="flex items-center gap-1">{obj.name}<LuExternalLink/></Box></ListItemText>
                </ListItemButton>
              )}
            </List>
          </Box>
        </nav>
        <nav>
          <Box className="px-4 py-6 mt-2 max-w-screen-xl mx-auto text-slate-500">
            <Box><Link href={'/'} className="font-bold text-xs no-underline">{app.longName}</Link></Box>
            <Box>
              <Link href={'/'} className="text-xl no-underline font-black">
                <Box component="span"  sx={{fontFamily: 'Roboto'}}>
                  {app.shortName.replace(/[A-Za-z]/g, c => String.fromCharCode(c.charCodeAt(0) + 0xFEE0))}
                </Box>
              </Link>
            </Box>
          </Box>
        </nav>
      </Box>
    </footer>
  );
}
