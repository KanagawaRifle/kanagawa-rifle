import { Calendar } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import type { Competition } from '../schema';
import { CompetitionActions } from './CompetitionActions';
import { CompetitionDate } from './CompetitionDate';

export function HomeCompetitionNotices({ competitions }: { competitions: Competition[] }) {
  return competitions.map((competition) => (
    <Alert key={competition.name} variant="info">
      <AlertTitle>{competition.homeNotice?.title}</AlertTitle>
      <AlertDescription>
        {competition.date && (
          <div className="flex items-center gap-2 pb-3">
            <span className="text-primary">
              <Calendar className="h-5 w-5" />
            </span>
            <span>
              <CompetitionDate schedule={competition.date} rangeSeparator="～" />
              {competition.pet && (
                <>
                  （公式練習 <CompetitionDate schedule={competition.pet} />）
                </>
              )}
            </span>
          </div>
        )}
        <CompetitionActions actions={competition.actions} home />
      </AlertDescription>
    </Alert>
  ));
}
