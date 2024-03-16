import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Home() {
  const t = await getTranslations('pages.home');
  return (
    <div className="relative flex h-screen flex-col items-center justify-between -mt-14">
      <Image
        src="/assets/images/logo/chadium_poster.png"
        alt="CHADIUM Banner"
        width={1920}
        height={468}
        className="absolute inset-0 object-cover w-full h-full"
      />

      <div className="absolute inset-0  flex w-full h-full justify-center items-center">
        <Image
          src="/assets/images/logo/logo.png"
          alt="CHADIUM Logo"
          width={800}
          height={800}
          className="h-2/3 w-auto"
        />
      </div>
    </div>
  );
}
