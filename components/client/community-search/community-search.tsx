import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { ReactNode, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getCommunities } from '@/components/api-client/community';
import { InviteConfirmationDialog } from '@/components/client/community-search/components/invite-confirmation-dialog';

interface CommunitySearchProps {
  children: ReactNode;
}

interface Community {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export function CommunitySearch({ children }: CommunitySearchProps) {
  const t = useTranslations('components.client.community-search');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialog, setDialog] = useState<JSX.Element | undefined>();

  useEffect(() => {
    const fetchCommunities = async () => {
      const communities = await getCommunities();
      setCommunities(communities);
    };

    fetchCommunities();
  }, [isDialogOpen]);

  function openJoinConfirmation(community: Community) {
    // Close command dialog
    setIsDialogOpen(false);

    // Open invite confirmation dialog
    const currentDialog = (
      <InviteConfirmationDialog key={community.id} community={community} />
    );
    // TODO: remove dialog after closing
    setDialog(currentDialog);
  }

  return (
    <>
      <CommandDialog trigger={children}>
        <CommandInput placeholder={t('search-placeholder')} />
        <CommandList>
          <CommandEmpty>{t('no-results')}</CommandEmpty>
          <CommandGroup heading={t('available-communities')}>
            {communities.map((community) => (
              <CommandItem
                key={community.id}
                onSelect={() => openJoinConfirmation(community)}
              >
                <div className="mr-2">
                  <Avatar>
                    <AvatarImage
                      src={community.imageUrl}
                      alt={community.name}
                    />
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

      {dialog}
    </>
  );
}
