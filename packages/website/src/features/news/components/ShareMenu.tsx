'use client';

import { Clipboard, Loader2, Mail, Share2 } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

import { FacebookIcon, LineIcon, TwitterIcon } from '@/components/icons/social';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logger } from '@/lib/logger';

type Props = {
  url: string;
  title: string;
  loading?: boolean;
};

export default function ShareMenu({ url, title, loading = false }: Props) {
  const [open, setOpen] = useState(true);

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

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
      toast.success('リンクをクリップボードにコピーしました');
    } else {
      toast.error('リンクのコピーに失敗しました');
    }

    setOpen(false);
  };

  const handleExternalShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  const shareLinks = [
    {
      name: 'Facebook',
      label: 'Facebook でシェア',
      icon: <FacebookIcon className="h-5 w-5 text-[#1877F2]" />,
      onClick: () => handleExternalShare(`https://www.facebook.com/sharer/sharer.php?display=page&u=${encodedUrl}`),
    },
    {
      name: 'X (Twitter)',
      label: 'X でシェア',
      icon: <TwitterIcon className="h-5 w-5" />,
      onClick: () => handleExternalShare(`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`),
    },
    {
      name: 'LINE',
      label: 'LINE でシェア',
      icon: <LineIcon className="h-5 w-5 text-[#00B900]" />,
      onClick: () =>
        handleExternalShare(`https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`),
    },
    {
      name: 'メール',
      label: 'メールで送信',
      icon: <Mail className="h-5 w-5" />,
      onClick: () => handleExternalShare(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`),
    },
    {
      name: 'リンクをコピー',
      label: 'リンクをコピー',
      icon: <Clipboard className="h-5 w-5" />,
      onClick: handleCopyToClipboard,
    },
  ];

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" disabled={loading} aria-label="共有メニューを開く">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Share2 className="mr-2 h-4 w-4" />}
            共有
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {shareLinks.map((link) => (
            <DropdownMenuItem key={link.name} onClick={link.onClick} aria-label={link.label} className="gap-2">
              {link.icon}
              {link.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
