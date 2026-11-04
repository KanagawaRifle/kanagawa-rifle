'use client';

import { CircleHelp } from 'lucide-react';

import { Button } from '@/components/ui/button';
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

export default function EntryHelpDialog() {
  return (
    <Dialog defaultOpen>
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
  );
}
