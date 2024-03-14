'use client';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Blobcho } from '@/components/server/blobcho/blobcho';

enum Selection {
  None,
  Strength,
  Knowledge,
  Consistency,
}

export default function DashboardPage() {
  // if (!await getUser()) {
  //   redirect('/login', RedirectType.replace);
  // }

  const [selection, setSelection] = useState(Selection.None);

  const t = useTranslations('pages.dashboard-page');
  const locale = useLocale();
  const images = [
    '/assets/images/gigachad/gigachad.webp',
    '/assets/images/gigachad/gigachad_strength.png',
    '/assets/images/gigachad/gigachad_knowledge.png',
    '/assets/images/gigachad/gigachad_consistency.png',
  ];

  function getColorFromSelection() {
    switch (selection) {
      case Selection.Strength:
        return 'blue';
      case Selection.Knowledge:
        return 'green';
      case Selection.Consistency:
        return 'yellow';
      default:
        return 'none';
    }
  }

  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute inset-0 flex justify-center items-end">
        <Blobcho color={getColorFromSelection()} />
      </div>

      {images.map((image, index) => (
        <div className="absolute inset-0 flex justify-center items-end">
          <Image
            key={image}
            src={image}
            alt="Gigachad Gosho"
            width={800}
            height={800}
            className={cn(
              'h-full pt-5 object-contain transition-opacity min-w-[800px]',
              selection === index ? 'opacity-100' : 'opacity-0',
            )}
          />
        </div>
      ))}

      <div className="absolute inset-0 flex justify-center items-end pb-[10vh]">
        <div className="flex flex-row gap-2">
          <Link
            href={`/${locale}/strength`}
            onMouseEnter={() => setSelection(Selection.Strength)}
            onMouseLeave={() => setSelection(Selection.None)}
          >
            <Card className="flex justify-center items-center h-32 w-48">
              <h2 className="text-2xl font-black">{t('strength')}</h2>
            </Card>
          </Link>

          <Link
            href={`/${locale}/knowledge`}
            onMouseEnter={() => setSelection(Selection.Knowledge)}
            onMouseLeave={() => setSelection(Selection.None)}
          >
            <Card className="flex justify-center items-center h-32 w-48">
              <h2 className="text-2xl font-black">{t('knowledge')}</h2>
            </Card>
          </Link>

          <Link
            href={`/${locale}/consistency`}
            onMouseEnter={() => setSelection(Selection.Consistency)}
            onMouseLeave={() => setSelection(Selection.None)}
          >
            <Card className="flex justify-center items-center h-32 w-48">
              <h2 className="text-2xl font-black">{t('consistency')}</h2>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
