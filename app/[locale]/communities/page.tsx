'use client';
import { useLocale, useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaPlusCircle } from 'react-icons/fa';
import { NewCommunityDialog } from '@/components/client/new-community-dialog/new-community-dialog';

export default function DashboardPage() {
  // if (!await getUser()) {
  //   redirect('/login', RedirectType.replace);
  // }

  const [selection, setSelection] = useState<number | null>(null);

  const t = useTranslations('pages.dashboard-page');
  const locale = useLocale();
  const communities = [
    {
      id: 1,
      name: 'бл. 133, ж.к. Хаджи Димитър',
      description: 'Съседи, които се грижат един за друг',
      imageUrl:
        'https://oaidalleapiprodscus.blob.core.windows.net/private/org-aE6VLTBdXztK5QXI3exGkpUu/user-QlS47PuyIJBL12N5PjIz0H4J/img-MQ3raGUdAkkss5Jv0p5gn2Ti.png?st=2024-03-14T18%3A44%3A31Z&se=2024-03-14T20%3A44%3A31Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image%2Fpng&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-14T14%3A01%3A15Z&ske=2024-03-15T14%3A01%3A15Z&sks=b&skv=2021-08-06&sig=1Va9IPPYN5ys7%2BWwuodygw%2FPzssB1j6%2FZCjf1W10zRQ%3D',
    },
  ];

  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute inset-0 flex justify-center items-end">
        {communities.map((community, index) => (
          <div className="absolute inset-0 flex justify-center items-center overflow-hidden">
            <img
              key={community.name}
              src={community.imageUrl}
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
                href={`/${locale}/${community.id}`}
                onMouseEnter={() => setSelection(index)}
                onMouseLeave={() => setSelection(null)}
              >
                <Card className="flex flex-col justify-center items-center p-8 max-w-60 gap-2">
                  <Avatar className="h-36 w-36">
                    <AvatarImage
                      src={community.imageUrl}
                      alt={community.name}
                      className="object-cover w-full h-full"
                    />
                    <AvatarFallback>{community.name[0]}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl text-center font-black">
                    {community.name}
                  </h2>
                </Card>
              </Link>
            ))}

            <NewCommunityDialog>
              <Card className="flex flex-col justify-center items-center p-8 max-w-60 gap-2">
                <div className="h-36 w-36">
                  <FaPlusCircle className="h-36 w-36 text-6xl text-primary" />
                </div>
                <h2 className="text-xl text-center font-black">
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
