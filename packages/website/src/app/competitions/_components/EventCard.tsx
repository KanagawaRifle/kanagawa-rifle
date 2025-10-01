import {
  Link,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import React, { ReactNode } from 'react';
import { LuAlarmClock, LuCalendar, LuDumbbell, LuMapPin } from 'react-icons/lu';

import 'dayjs/locale/ja';
import { Event, DateValue } from '../_types';

dayjs.locale('ja');

interface ItemProps {
  icon: ReactNode;
  title: string;
  text: ReactNode;
  divider?: boolean;
}

function Item({ icon, title, text, divider = false }: ItemProps) {
  return (
    <ListItem divider={divider}>
      <ListItemText>
        <Box className="flex items-center gap-2">
          <Typography color="primary" component="span">
            {icon}
          </Typography>
          {title}：{text}
        </Box>
      </ListItemText>
    </ListItem>
  );
}

const formatDate = (date: Date): string => dayjs(date).format('M月D日（ddd）');

function dateToElement(date: DateValue): ReactNode {
  if (typeof date === 'string') {
    return date;
  }

  if (date instanceof Date) {
    return formatDate(date);
  }

  if (React.isValidElement(date)) {
    return date;
  }

  // EventDateの型ガード
  if (date && typeof date === 'object' && 'from' in date && 'to' in date) {
    const eventDate = date;
    return `${formatDate(eventDate.from)} ― ${formatDate(eventDate.to)}`;
  }

  return 'undefined';
}

function convertHrefToString(href: string | URL | undefined): string {
  if (href instanceof URL) {
    return href.toString();
  }
  return String(href);
}

export function EventCard({ name, grade, actions, date, pet, deadline, venue }: Event) {
  return (
    <Card>
      <CardHeader subheader={`${grade}大会`} title={name} />
      <CardContent>
        <ButtonGroup variant="outlined">
          {actions.map((action, index) => (
            <Button
              key={index}
              href={convertHrefToString(action.href)}
              disabled={action.disabled ?? false}
              aria-label={action.name}
              rel={action.target === '_blank' ? 'noopener noreferrer' : undefined}
              target={action.target ?? '_blank'}
            >
              {action.name}
            </Button>
          ))}
        </ButtonGroup>
      </CardContent>
      <List dense>
        <Item icon={<LuCalendar size="1.3rem" />} title="期日" text={dateToElement(date)} divider />
        {pet && <Item icon={<LuDumbbell size="1.3rem" />} title="公式練習" text={dateToElement(pet)} divider />}
        {deadline && (
          <Item icon={<LuAlarmClock size="1.3rem" />} title="申込締切" text={dateToElement(deadline)} divider />
        )}
        <Item
          icon={<LuMapPin size="1.3rem" />}
          title="会場"
          text={
            <Link href={convertHrefToString(venue.href)} target="_blank" rel="noopener noreferrer">
              {venue.name}
            </Link>
          }
        />
      </List>
    </Card>
  );
}
