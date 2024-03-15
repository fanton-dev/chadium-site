import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface LoginButtonsProps {
  // eslint-disable-next-line react/require-default-props
  className?: string;
}

export function LoginButtons({ className = '' }: LoginButtonsProps) {
  const t = useTranslations('components.server.login-buttons');
  const locale = useLocale();

  return (
    <div className={cn('flex gap-x-1', className)}>
      <Button className="w-full xl:w-auto" asChild>
        <Link href={`/${locale}/login`}>{t('get-started')}</Link>
      </Button>
    </div>
  );
}
