// packages/website/src/features/news/components/ListItem.tsx

import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Stack,
  Skeleton as MuiSkeleton,
  Chip,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { LuCalendar, LuImage, LuHash } from 'react-icons/lu';

type Props = {
  slug: string;
  title: string;
  published: Date | string;
  tags?: string[];
  excerpt?: string;
  isLast: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const dateFormatter = new Intl.DateTimeFormat('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });

function formatPublishedDate(published: Date | string): { dateTime: string; display: string } {
  const date = typeof published === 'string' ? new Date(published) : published;
  return {
    dateTime: date.toISOString(),
    display: dateFormatter.format(date),
  };
}

export function Skeleton({ isLast }: { isLast: boolean }) {
  return (
    <ListItem alignItems="flex-start" divider={!isLast}>
      <ListItemAvatar>
        <MuiSkeleton variant="circular" width={40} height={40} />
      </ListItemAvatar>
      <ListItemText>
        <Stack spacing={1}>
          <Typography variant="h6" component="div">
            <MuiSkeleton />
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            <MuiSkeleton />
            <MuiSkeleton width="60%" />
          </Typography>
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Chip label={<MuiSkeleton width="4rem" />} icon={<LuCalendar />} variant="outlined" />
            {[...Array(2).keys()].map((_, index) => (
              <Chip
                key={index}
                label={<MuiSkeleton width="2rem" />}
                icon={<LuHash />}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        </Stack>
      </ListItemText>
    </ListItem>
  );
}

export function ListNewsItem({ slug, title, published, tags, excerpt, isLast, onMouseEnter }: Props) {
  const { dateTime, display } = formatPublishedDate(published);

  return (
    <ListItemButton
      alignItems="flex-start"
      component={Link}
      href={`/news/${slug}`}
      divider={!isLast}
      onMouseEnter={onMouseEnter}
      aria-label={`${title} - ${display}公開`}
    >
      <ListItemAvatar>
        <Avatar aria-hidden="true">
          <LuImage aria-hidden="true" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText>
        <Stack spacing={1}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {excerpt && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {excerpt}
            </Typography>
          )}
          <Stack direction="row" spacing={1} sx={{ pt: 1 }}>
            <Chip
              label={
                <time dateTime={dateTime} suppressHydrationWarning>
                  {display}
                </time>
              }
              icon={<LuCalendar />}
              variant="outlined"
            />
            {tags &&
              tags.length > 0 &&
              tags.map((tag) => <Chip key={tag} label={tag} icon={<LuHash />} variant="outlined" color="primary" />)}
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
