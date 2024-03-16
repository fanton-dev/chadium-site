'use client';

import { ReactNode, useState } from 'react';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import { FaPersonCirclePlus } from 'react-icons/fa6';
import { MdAddHomeWork } from 'react-icons/md';
import { CommunitySearch } from '@/components/client/community-search/community-search';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CreateCommunityForm } from '@/components/client/create-community-form/create-community-form';

interface NewCommunityDialogProps {
  children: ReactNode;
}

export function NewCommunityDialog({ children }: NewCommunityDialogProps) {
  const t = useTranslations('components.client.new-community-dialog');
  const [isCreateCommunity, setIsCreateCommunity] = useState<boolean>(false);
  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className={cn(isCreateCommunity ? 'h-5/6' : 'h-1/2')}>
        {!isCreateCommunity && (
          <div className="flex flex-row justify-center items-center w-full h-full gap-2 text-center">
            <CommunitySearch>
              <Button asChild>
                <Card className="h-2/3 lg:h-3/5 aspect-square flex flex-col justify-center items-center p-2">
                  <FaPersonCirclePlus className="w-16 h-16" />
                  <p className="text-lg text-semibold">{t('join-community')}</p>
                </Card>
              </Button>
            </CommunitySearch>
            <Button asChild onClick={() => setIsCreateCommunity(true)}>
              <Card className="h-2/3 lg:h-3/5 aspect-square flex flex-col justify-center items-center p-2">
                <MdAddHomeWork className="w-16 h-16" />
                <p className="text-lg text-semibold">{t('create-community')}</p>
              </Card>
            </Button>
          </div>
        )}

        {isCreateCommunity && (
          <CreateCommunityForm onCancel={() => setIsCreateCommunity(false)} />
        )}
      </DrawerContent>
    </Drawer>
  );
}
