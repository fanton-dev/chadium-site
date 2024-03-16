import { ReactNode } from 'react';
import { useLocale } from 'next-intl';
import { NavbarUserControls } from '@/components/server/navbar-user-controls/navbar-user-controls';
import { NavbarLinks } from '@/components/server/navbar-links/navbar-links';
import Link from 'next/link';
import { Logo } from '@/components/server/logo/logo';

export default async function CommunityLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { id: string };
}>) {
  const locale = useLocale();
  const user = null;

  return (
    <>
      <nav className="grid grid-cols-3 grid-flow-col sticky bg-white dark:bg-zinc-950 top-0 p-2 items-center z-40 w-full">
        <NavbarLinks
          communityId={params.id}
          className="block xl:hidden place-self-start"
          variant="mobile"
        />

        <Link
          href={`/${locale}/communities`}
          className="place-self-center xl:place-self-start"
        >
          <Logo />
        </Link>

        <NavbarLinks
          communityId={params.id}
          className="hidden xl:flex justify-center place-self-center"
          variant="desktop"
        />

        <div className="flex flex-row align-middle gap-2 place-self-end">
          <NavbarUserControls user={user} className="" />
        </div>
      </nav>
      <main className="min-h-[100vh] -mt-16">{children}</main>
    </>
  );
}
