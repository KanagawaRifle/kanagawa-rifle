import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';
import { LuBox, LuCircleCheck } from 'react-icons/lu';

export function EntryFeeCard() {
  return (
    <Card>
      <CardHeader title="参加料" />
      <CardContent>
        <div className="mx-auto grid grid-cols-3 gap-0 text-center">
          <div></div>
          <div className="flex items-center justify-center gap-2 p-2 font-bold">
            <LuBox className="text-purple-400" aria-hidden="true" />
            一般
          </div>
          <div className="flex items-center justify-center gap-2 p-2 font-bold">
            <LuBox className="text-rose-400" aria-hidden="true" />
            高校生以下
          </div>
        </div>
        <div className="rounded-md border border-slate-300 bg-slate-50 p-2">全種目</div>
        <div className="grid grid-cols-3 gap-0 border-b border-slate-300 text-center text-left">
          <div className="p-2">G3 大会</div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Typography color="primary">
              <LuCircleCheck />
            </Typography>
            8,000円
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Typography color="primary">
              <LuCircleCheck />
            </Typography>
            4,000円
          </div>
        </div>
        <div className="grid grid-cols-3 gap-0 text-center text-left">
          <div className="p-2">G4 大会</div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Typography color="primary">
              <LuCircleCheck />
            </Typography>
            7,000円
          </div>
          <div className="flex items-center justify-center gap-2 p-2">
            <Typography color="primary">
              <LuCircleCheck />
            </Typography>
            3,500円
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div>
          ※ （令和7年度より）国スポ保険料の
          <strong className="underline">別途お振込みは不要です</strong>
          。保険料は参加料に含まれます。
        </div>
        <div>※ ハンドライフルは普及大会となります。</div>
        <div>※ （令和7年度より）すべての大会が参加賞付きとなります。</div>
        <div>
          ※
          （令和7年度より）これまでの参加料は、紙標的を使用した大会を前提に設定しておりましたが、このたび複雑な料金体系を整理し、より分かりやすい参加料に改定いたしました。
        </div>
      </CardContent>
    </Card>
  );
}
