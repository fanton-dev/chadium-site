import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Home() {
  const t = await getTranslations('pages.home');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/assets/images/logo/logo.png"
        alt="CHADIUM Logo"
        width={800}
        height={800}
      />
    </main>
  );
}
