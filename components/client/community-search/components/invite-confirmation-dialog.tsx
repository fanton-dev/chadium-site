'use client';

import React, { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { getBearerToken } from '@/components/api-client/auth';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface InviteButtonProps {
  community: { id: number; name: string };
}

export function InviteConfirmationDialog({ community }: InviteButtonProps) {
  const { toast } = useToast();
  const t = useTranslations('site.users-search.invite-confirmation-dialog');
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(true);

  async function joinCommunity() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/communities/${community.id}/join`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: await getBearerToken(),
          'Accept-Language': locale,
        },
      },
    );

    setIsOpen(false);

    // Handle success
    if (response.ok) {
      toast({
        variant: 'default',
        title: t('invite-sent'),
      });
      return;
    }

    // Handle errors
    const json = await response.json();
    toast({
      variant: 'destructive',
      title: json.message || t('error-occurred'),
      description: t('try-again'),
    });
  }

  return (
    <>
      <Toaster />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>
              {t('description', {
                name: community.name,
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>{t('cancel')}</DialogClose>
            <Button onClick={() => joinCommunity()}>
              {t('join-community')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
