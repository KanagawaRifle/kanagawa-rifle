import { Link, Tab, Tabs as MuiTabs } from '@mui/material';
import React from 'react';

export type TabsProps = {
  year: number;
};

export function Tabs({ year }: TabsProps) {
  return (
    <MuiTabs value={year} variant="scrollable" scrollButtons="auto" indicatorColor="secondary" textColor="inherit">
      {[2025, 2024, 2023, 2022].map((item) => {
        return (
          <Tab
            key={item}
            component={Link}
            label={item}
            href={`/competitions/${item === 2025 ? '' : item}`}
            value={item}
          />
        );
      })}
    </MuiTabs>
  );
}
