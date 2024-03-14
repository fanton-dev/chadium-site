import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface CommunitySearchProps {
  children: ReactNode;
}

export function CommunitySearch({ children }: CommunitySearchProps) {
  const t = useTranslations('components.client.community-search');

  const communities = [
    {
      id: 1,
      name: 'бл. 133, ж.к. Хаджи Димитър',
      description: 'Съседи, които се грижат един за друг',
      imageUrl:
        'https://oaidalleapiprodscus.blob.core.windows.net/private/org-aE6VLTBdXztK5QXI3exGkpUu/user-QlS47PuyIJBL12N5PjIz0H4J/img-MQ3raGUdAkkss5Jv0p5gn2Ti.png?st=2024-03-14T18%3A44%3A31Z&se=2024-03-14T20%3A44%3A31Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image%2Fpng&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-14T14%3A01%3A15Z&ske=2024-03-15T14%3A01%3A15Z&sks=b&skv=2021-08-06&sig=1Va9IPPYN5ys7%2BWwuodygw%2FPzssB1j6%2FZCjf1W10zRQ%3D',
    },
    {
      id: 2,
      name: 'бл. 132, ж.к. Хаджи Димитър',
      description: 'Съседи, които се грижат един за друг',
      imageUrl:
        'https://oaidalleapiprodscus.blob.core.windows.net/private/org-aE6VLTBdXztK5QXI3exGkpUu/user-QlS47PuyIJBL12N5PjIz0H4J/img-MQ3raGUdAkkss5Jv0p5gn2Ti.png?st=2024-03-14T18%3A44%3A31Z&se=2024-03-14T20%3A44%3A31Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image%2Fpng&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-14T14%3A01%3A15Z&ske=2024-03-15T14%3A01%3A15Z&sks=b&skv=2021-08-06&sig=1Va9IPPYN5ys7%2BWwuodygw%2FPzssB1j6%2FZCjf1W10zRQ%3D',
    },
    {
      id: 1,
      name: 'бл. 131, ж.к. Хаджи Димитър',
      description: 'Съседи, които се грижат един за друг',
      imageUrl:
        'https://oaidalleapiprodscus.blob.core.windows.net/private/org-aE6VLTBdXztK5QXI3exGkpUu/user-QlS47PuyIJBL12N5PjIz0H4J/img-MQ3raGUdAkkss5Jv0p5gn2Ti.png?st=2024-03-14T18%3A44%3A31Z&se=2024-03-14T20%3A44%3A31Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image%2Fpng&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-03-14T14%3A01%3A15Z&ske=2024-03-15T14%3A01%3A15Z&sks=b&skv=2021-08-06&sig=1Va9IPPYN5ys7%2BWwuodygw%2FPzssB1j6%2FZCjf1W10zRQ%3D',
    },
  ];

  return (
    <CommandDialog trigger={children}>
      <CommandInput placeholder={t('search-placeholder')} />
      <CommandList>
        <CommandEmpty>{t('no-results')}</CommandEmpty>
        <CommandGroup heading={t('available-communities')}>
          {communities.map((community) => (
            <CommandItem key={community.id}>
              <div className="mr-2">
                <Avatar>
                  <AvatarImage src={community.imageUrl} alt={community.name} />
                  <AvatarFallback>{community.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="font-semibold">{community.name}</p>
                <p>{community.description}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
