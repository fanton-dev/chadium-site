import { ReactNode } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Logo } from '@/components/server/logo/logo';
import { NavbarUserControls } from '@/components/server/navbar-user-controls/navbar-user-controls';

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = useLocale();
  const user = null;

  return (
    <>
      <nav className="grid grid-cols-2 grid-flow-col sticky bg-white dark:bg-zinc-950 top-0 p-2 items-center z-40 w-full">
        <Link href={`/${locale}`} className="place-self-start">
          <Logo />
        </Link>

        <div className="flex flex-row align-middle gap-2 place-self-end h-12">
          <NavbarUserControls user={user} className="" />
        </div>
      </nav>
      <main className="min-h-[100vh] -mt-16">{children}</main>
    </>
  );
}
