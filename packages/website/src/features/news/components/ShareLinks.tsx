// packages/website/src/features/news/components/ShareLinks.tsx
'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import React, { useState } from 'react';
import { FaFacebook, FaLine, FaTwitter } from 'react-icons/fa';
import { LuClipboard, LuMail, LuShare2 } from 'react-icons/lu';

import { logger } from '@/lib/logger';

type Props = {
  url: string;
  title: string;
  loading?: boolean;
};

export default function ShareLinks({ url, title, loading = false }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const open = Boolean(anchorEl);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error' = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const fallbackCopyToClipboard = (text: string): boolean => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      // noinspection JSDeprecatedSymbols
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      logger.error('Fallback copy failed', { error: err instanceof Error ? err.message : String(err) });
      return false;
    }
  };

  const handleCopyToClipboard = async () => {
    let copySuccess;

    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        copySuccess = true;
      } catch (err) {
        logger.error('Clipboard API failed', { error: err instanceof Error ? err.message : String(err) });
        copySuccess = fallbackCopyToClipboard(url);
      }
    } else {
      copySuccess = fallbackCopyToClipboard(url);
    }

    if (copySuccess) {
      showSnackbar('リンクをクリップボードにコピーしました');
    } else {
      showSnackbar('リンクのコピーに失敗しました', 'error');
    }

    handleClose();
  };

  const handleExternalShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  const shareLinks = [
    {
      name: 'Facebook',
      label: 'Facebook でシェア',
      icon: <FaFacebook />,
      color: '#1877F2',
      onClick: () => handleExternalShare(`https://www.facebook.com/sharer/sharer.php?display=page&u=${encodedUrl}`),
    },
    {
      name: 'Twitter',
      label: 'Twitter でシェア',
      icon: <FaTwitter />,
      color: '#1DA1F2',
      onClick: () => handleExternalShare(`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`),
    },
    {
      name: 'LINE',
      label: 'LINE でシェア',
      icon: <FaLine />,
      color: '#00B900',
      onClick: () =>
        handleExternalShare(`https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`),
    },
    {
      name: 'メール',
      label: 'メールで送信',
      icon: <LuMail />,
      color: null,
      onClick: () => handleExternalShare(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`),
    },
    {
      name: 'リンクをコピー',
      label: 'リンクをコピー',
      color: null,
      icon: <LuClipboard />,
      onClick: handleCopyToClipboard,
    },
  ];

  return (
    <>
      <Button
        variant="text"
        startIcon={loading ? <CircularProgress size={'1rem'} /> : <LuShare2 />}
        onClick={handleClick}
        disabled={loading}
        aria-controls={open ? 'share-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        共有
      </Button>

      <Menu
        id="share-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: { 'aria-labelledby': 'share-button' },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {shareLinks.map((link) => (
          <MenuItem
            onClick={link.onClick}
            key={link.name}
            aria-label={link.label}
            sx={{
              display: 'flex',
              gap: 1,
              minWidth: 160,
              '& svg': {
                color: link.color ?? 'text.secondary',
                width: 20,
                height: 20,
              },
            }}
          >
            {link.icon}
            {link.name}
          </MenuItem>
        ))}
      </Menu>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert variant="filled" onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
