import {Box, Breadcrumbs, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import React from 'react';
import {LuChevronRight} from "react-icons/lu";

type Props = {
  title?: string;
  description?: string;
  breadcrumbs?: Array<{ name: string, path: string }>;
  children: React.ReactNode;
  withStack?: boolean;
}

export function PageLayout({title, description, breadcrumbs, children, withStack = true}: Props) {

  return (
    <Box>
      {
        breadcrumbs && <Toolbar variant="dense" className="max-w-screen-md w-full mx-auto">

          <Breadcrumbs aria-label="breadcrumb">
            {
              breadcrumbs.map((breadcrumb, index) => {
                return index < breadcrumbs.length - 1
                  ? <Link key={index} className="hover:underline flex items-center gap-2" color="inherit"
                          href={breadcrumb.path}>{index === 0 && <LuChevronRight/>}{breadcrumb.name}</Link>
                  : <Typography key={index} color="text.primary">{breadcrumb.name}</Typography>
              })
            }
          </Breadcrumbs>
        </Toolbar>
      }
      <Box className="container mx-auto max-w-screen-sm w-full px-4 flex flex-col gap-4 py-8">
        {
          title && <Box>
            <Typography variant="h1">
              <Box className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {title}
              </Box>
            </Typography>
          </Box>
        }
        {
          description && <Box>
            <Typography variant="body1" color="text.secondary">
                {description}
            </Typography>
          </Box>
        }
        {
          withStack ? <Stack spacing={2}>{children}</Stack> : <Box>{children}</Box>
        }
      </Box>
    </Box>


  )
}
