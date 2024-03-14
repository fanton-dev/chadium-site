import { getTranslations } from 'next-intl/server';
import { ThemeSwitcher } from '@/components/client/theme-switcher/theme-switcher';

export default async function Home() {
  const t = await getTranslations('pages.home');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      gosho
      <ThemeSwitcher />
    </main>
  );
}
