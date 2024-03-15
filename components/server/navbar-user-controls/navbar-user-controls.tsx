import React from 'react';
import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ThemeSwitcher } from '@/components/client/theme-switcher/theme-switcher';
import { LoginButtons } from '@/components/server/login-buttons/login-buttons';

interface NavbarUserControlsProps {
  user: any;
  className: string;
}

export function NavbarUserControls({
  user,
  className = '',
}: NavbarUserControlsProps) {
  const t = useTranslations('components.server.navbar-user-controls');

  return (
    <div className="flex space-x-1 justify-end">
      {/* Preferences popover */}
      <Popover>
        <PopoverTrigger asChild>
          {user ? (
            <Avatar className="cursor-pointer">
              <AvatarImage src={user.name} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <Button variant="ghost" size="icon">
              <PersonIcon className="block xl:hidden" />
              <GearIcon className="hidden xl:block" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-screen sm:w-80">
          {!user && (
            <Label className="block xl:hidden">
              {t('preferences-popover.get-started')}
              <div className="flex w-full justify-center p-2">
                <LoginButtons />
              </div>
            </Label>
          )}

          <Label>
            {t('preferences-popover.theme')}
            <div className="flex w-full justify-center p-2">
              <ThemeSwitcher />
            </div>
          </Label>
        </PopoverContent>
      </Popover>

      {/* Login/Registration buttons */}
      {!user && (
        <div className="hidden xl:block">
          <LoginButtons />
        </div>
      )}
    </div>
  );
}
