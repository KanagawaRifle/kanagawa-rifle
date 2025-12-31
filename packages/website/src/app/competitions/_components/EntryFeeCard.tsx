// packages/website/src/app/competitions/_components/EntryFeeCard.tsx

import { Box, CircleCheck } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function EntryFeeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>参加料</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mx-auto grid grid-cols-3 gap-0 text-center">
          <div></div>
          <div className="flex items-center justify-center gap-2 p-2 font-bold">
            <Box className="h-4 w-4 text-purple-400" aria-hidden="true" />
            一般
          </div>
          <div className="flex items-center justify-center gap-2 p-2 font-bold">
            <Box className="h-4 w-4 text-rose-400" aria-hidden="true" />
            高校生以下
          </div>
        </div>
        <div className="rounded-md border border-border bg-muted p-2">全種目</div>
        <div className="grid grid-cols-3 gap-0 border-b border-border text-center">
          <div className="p-2 text-left">G3 大会</div>
          <div className="flex items-center justify-center gap-2 p-2">
            <CircleCheck className="h-4 w-4 text-primary" />
            8,000円
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <CircleCheck className="h-4 w-4 text-primary" />
            4,000円
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0 text-center">
          <div className="p-2 text-left">G4 大会</div>
          <div className="flex items-center justify-center gap-2 p-2">
            <CircleCheck className="h-4 w-4 text-primary" />
            7,000円
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <CircleCheck className="h-4 w-4 text-primary" />
            3,500円
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-2 text-muted-foreground">
          <p>
            ※ （令和7年度より）国スポ保険料の<strong className="underline">別途お振込みは不要です</strong>
            。保険料は参加料に含まれます。
          </p>
          <p>※ ハンドライフルは普及大会となります。</p>
          <p>※ （令和7年度より）すべての大会が参加賞付きとなります。</p>
          <p>
            ※
            （令和7年度より）これまでの参加料は、紙標的を使用した大会を前提に設定しておりましたが、このたび複雑な料金体系を整理し、より分かりやすい参加料に改定いたしました。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
