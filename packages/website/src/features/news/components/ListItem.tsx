import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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
} from "@mui/material";
import {format} from "date-fns";
import {ja} from "date-fns/locale";
import Link from 'next/link';
import React from "react";
import {LuCalendar, LuImage,LuHash} from "react-icons/lu";

type Props = {
  slug: string;
  title: string;
  published: Date;
  tags?: string[];
  excerpt?: string;
  isLast: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function Skeleton({isLast}: Pick<Props, "isLast">) {
  return (
    <ListItem alignItems="flex-start" divider={!isLast}>
      <ListItemAvatar>
        <MuiSkeleton variant="circular" width={40} height={40}/>
      </ListItemAvatar>
      <ListItemText>
        <Stack spacing={1}>
          <Typography variant="h6" component="div"><MuiSkeleton/></Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            <MuiSkeleton/>
            <MuiSkeleton width="60%"/>
          </Typography>
          <Stack direction="row" spacing={1} sx={{pt: 1}}>
            <Chip label={<MuiSkeleton width="4rem"/>} icon={<LuCalendar/>} variant="outlined"/>
            {[...Array(2).keys()].map((_, index) => (
              <Chip key={index} label={<MuiSkeleton width="2rem"/>} icon={<LuHash />} variant="outlined" color="primary"/>
            ))}
          </Stack>
        </Stack>
      </ListItemText>
    </ListItem>
  );
}

export function ListNewsItem({slug, title, published, tags, excerpt, isLast, onMouseEnter}: Props) {
  return (
    <ListItemButton
      alignItems="flex-start"
      component={Link}
      href={`/news/${slug}`}
      divider={!isLast}
      onMouseEnter={onMouseEnter}
    >
      <ListItemAvatar>
        <Avatar><LuImage/></Avatar>
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
          <Stack direction="row" spacing={1} sx={{pt: 1}}>
            <Chip
              label={
                <time dateTime={(new Date(published)).toISOString()}>
                  {format(new Date(published), 'yyyy年M月d日', {locale: ja})}
                </time>
              }
              icon={<CalendarTodayIcon/>}
              variant="outlined"
            />
            {tags && tags.length > 0 &&
              tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  icon={<LuHash />}
                  variant="outlined"
                  color="primary"
                />
              ))}
          </Stack>
        </Stack>
      </ListItemText>
    </ListItemButton>
  );
}
