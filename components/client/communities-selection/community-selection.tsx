'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NewCommunityDialog } from '@/components/client/new-community-dialog/new-community-dialog';
import { FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Community {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface CommunitySelectionProps {
  communities: Community[];
}

export function CommunitySelection({ communities }: CommunitySelectionProps) {
  const locale = useLocale();
  const [selection, setSelection] = useState<number | null>(null);
  const t = useTranslations('pages.dashboard-page');
  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute inset-0 flex justify-center items-end">
        {communities.map((community, index) => (
          <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
            <img
              key={community.name}
              src={community.image}
              alt={community.name}
              width={800}
              height={800}
              className={cn(
                'h-full w-full pt-5 object-cover transition-opacity blur-sm scale-110',
                selection === index ? 'opacity-100' : 'opacity-0',
              )}
            />
          </div>
        ))}

        <div className="absolute inset-0 flex justify-center items-center">
          <div className="flex flex-row gap-2">
            {communities.map((community, index) => (
              <Link
                href={`/${locale}/communities/${community.id}`}
                onMouseEnter={() => setSelection(index)}
                onMouseLeave={() => setSelection(null)}
              >
                <Card className="flex flex-col justify-center items-center p-8 max-w-60 gap-2">
                  <Avatar className="h-36 w-36">
                    <AvatarImage
                      src={community.image}
                      alt={community.name}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>{community.name[0]}</AvatarFallback>
                  </Avatar>
                  <ScrollArea className="h-16 w-full">
                    <h2 className="text-xl text-center font-black">
                      {community.name}
                    </h2>
                  </ScrollArea>
                </Card>
              </Link>
            ))}

            <NewCommunityDialog>
              <Card className="flex flex-col justify-center items-center p-8 max-w-60 gap-2">
                <div className="h-36 w-36">
                  <FaPlusCircle className="h-36 w-36 text-6xl text-primary" />
                </div>
                <h2 className="text-xl text-center font-black h-16">
                  {t('add-new-community')}
                </h2>
              </Card>
            </NewCommunityDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
