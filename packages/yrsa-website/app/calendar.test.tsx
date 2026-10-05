import '@testing-library/jest-dom/vitest';
import type { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { GoogleCalendar } from './_components/google-calendar';
import { TerminalCalendar } from './projects/_components/terminal-calendar';
import { ModernCalendar } from './shooting-range/_components/modern-calendar';

const state = vi.hoisted(() => ({ options: {} as CalendarOptions }));
vi.mock('@fullcalendar/react', () => ({
  default: (options: CalendarOptions) => {
    state.options = options;
    return <div aria-label="calendar fixture" />;
  },
}));
vi.mock('@/lib/env', () => ({
  env: { GOOGLE_CALENDAR_API_KEY: 'fixture', GOOGLE_CALENDAR_ID_MAIN: 'main', GOOGLE_CALENDAR_ID_ANNUAL: 'annual' },
}));

describe.each([
  { label: 'home', Calendar: GoogleCalendar, close: /^閉じる$/, link: /Google カレンダー/ },
  { label: 'shooting range', Calendar: ModernCalendar, close: /^閉じる$/, link: /Google カレンダー/ },
  { label: 'annual plan', Calendar: TerminalCalendar, close: /Close \[Esc\]/, link: /Open in Calendar/ },
])('$label event details', ({ Calendar, close, link }) => {
  it.each([
    { label: 'all-day', start: new Date(2026, 3, 12), end: new Date(2026, 3, 14), allDay: true, lastDate: /4月13日/ },
    {
      label: 'same-day',
      start: new Date(2026, 3, 12, 9),
      end: new Date(2026, 3, 12, 11),
      allDay: false,
      lastDate: /11:00/,
    },
    {
      label: 'overnight',
      start: new Date(2026, 3, 12, 9),
      end: new Date(2026, 3, 13, 11),
      allDay: false,
      lastDate: /4月13日/,
    },
  ])('shows the $label event range and closes without navigating', ({ start, end, allDay, lastDate }) => {
    render(<Calendar />);
    const preventDefault = vi.fn();
    act(() => {
      state.options.eventClick!({
        jsEvent: { preventDefault },
        event: {
          title: 'Spring meeting',
          start,
          end,
          allDay,
          extendedProps: { location: 'Test range', description: '<p>Bring equipment</p>' },
          url: 'https://example.test/event',
        },
      } as unknown as EventClickArg);
    });
    expect(preventDefault).toHaveBeenCalledOnce();
    expect(screen.getByText('Spring meeting')).toBeVisible();
    expect(screen.getByText('Test range')).toBeVisible();
    expect(screen.getByText(lastDate)).toBeVisible();
    expect(screen.getByText('Bring equipment')).toBeVisible();
    expect(screen.getByRole('link', { name: link })).toHaveAttribute('href', 'https://example.test/event');
    fireEvent.click(screen.getAllByRole('button', { name: close })[0]!);
    expect(screen.queryByText('Spring meeting')).not.toBeInTheDocument();
  });
});
