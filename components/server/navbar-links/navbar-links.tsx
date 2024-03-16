import { useLocale, useTranslations } from 'next-intl';
import { NavbarLinksDesktop } from './components/navbar-links-desktop';
import { NavbarLinksMobile } from './components/navbar-links-mobile';

interface NavbarLinksProps {
  communityId: string;
  variant: 'desktop' | 'mobile';
  className: string;
}
export function NavbarLinks({
  communityId,
  variant,
  className,
}: NavbarLinksProps) {
  const locale = useLocale();
  const t = useTranslations('components.server.navbar-links');

  const links = [
    {
      title: t('home'),
      href: `/${locale}/communities/${communityId}`,
    },
    {
      title: t('tasks'),
      href: `/${locale}/communities/${communityId}/tasks`,
    },
    {
      title: t('posts'),
      href: `/${locale}/communities/${communityId}/posts`,
    },
  ];

  if (variant === 'desktop') {
    return <NavbarLinksDesktop className={className} links={links} />;
  }

  if (variant === 'mobile') {
    return <NavbarLinksMobile className={className} links={links} />;
  }
}
