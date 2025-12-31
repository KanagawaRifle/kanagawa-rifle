// packages/website/src/app/competitions/_components/EntryInfoCard.tsx

'use client';

import { CircleHelp, NotebookPen } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function EntryInfoCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>各種大会 (当協会主管以外) 申込</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="申込フォームの説明">
              <CircleHelp className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>このお申込みフォームについて</DialogTitle>
              <DialogDescription>
                当協会主管以外の各種大会 (日ラ等) および東日本選手権については本申込フォームよりお申し込みください。
                <br />
                <br />
                なお、国スポ予選および県選手権については下記に個別のお申込みフォームがございますのでそちらよりお申し込みください。
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">閉じる</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Button variant="outline" asChild>
          <a href="https://forms.gle/6XGY1qhEvr3gkasJ9" target="_blank" rel="noopener noreferrer">
            <NotebookPen className="mr-2 h-4 w-4" />
            日ラ等大会申込
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
