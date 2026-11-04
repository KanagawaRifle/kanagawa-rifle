import { NotebookPen } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button-styles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { COMPETITION_ENTRY_FORM_URL } from '@/features/competitions/entry';

import { EntryHelp } from './EntryHelp';

export function EntryInfoCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>各種大会 (当協会主管以外) 申込</CardTitle>
        <EntryHelp />
      </CardHeader>
      <CardContent>
        <a
          className={buttonVariants({ variant: 'outline' })}
          href={COMPETITION_ENTRY_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <NotebookPen className="mr-2 h-4 w-4" />
          日ラ等大会申込
        </a>
      </CardContent>
    </Card>
  );
}
