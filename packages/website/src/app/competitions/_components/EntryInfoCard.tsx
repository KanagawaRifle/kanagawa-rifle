'use client';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React from 'react';
import { LuNotebookPen, LuMessageCircleQuestion } from 'react-icons/lu';

export function EntryInfoCard() {
  const [isDialogOpen, setDialogBeOpen] = React.useState(false);
  const handleOpenButtonClick = () => {
    setDialogBeOpen(true);
  };
  const handleCloseButtonClick = () => {
    setDialogBeOpen(false);
  };

  return (
    <Card>
      <CardHeader
        title={'各種大会 (当協会主管以外) 申込'}
        action={
          <IconButton aria-label="申込フォームの説明" onClick={handleOpenButtonClick}>
            <LuMessageCircleQuestion />
          </IconButton>
        }
      />
      <CardContent>
        <Button
          variant="outlined"
          startIcon={<LuNotebookPen />}
          href="https://forms.gle/6XGY1qhEvr3gkasJ9"
          target="_blank"
        >
          日ラ等大会申込
        </Button>
      </CardContent>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseButtonClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'このお申込みフォームについて'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            当協会主管以外の各種大会 (日ラ等) および東日本選手権については本申込フォームよりお申し込みください。
            <br />
            なお、国スポ予選および県選手権については下記に個別のお申込みフォームがございますのでそちらよりお申し込みください。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseButtonClick} autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
