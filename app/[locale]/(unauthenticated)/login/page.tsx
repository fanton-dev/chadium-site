import { Logo } from '@/components/server/logo/logo';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { LoginForm } from '@/components/client/login-form/login-form';
import { Card } from '@/components/ui/card';
import { useLocale } from 'next-intl';

export default async function LoginPage() {
  // if (await getUser()) {
  //   redirect('/dashboard', RedirectType.replace);
  // }

  const t = await getTranslations('pages.login-page');
  const locale = useLocale();

  return (
    <div className="flex flex-col items-center justify-center w-full h-[100vh]">
      <Card className="grid min-h-[80vh] my-auto w-5/6 md:w-2/3 flex-col items-center justify-center xl:grid-cols-2 xl:px-0 overflow-hidden">
        <div className="hidden xl:flex h-full flex-col p-10 text-white bg-zinc-900">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
          </div>

          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">Stay connected with your community.</p>
              <footer className="text-sm">CHADIUM</footer>
            </blockquote>
          </div>
        </div>

        <div className="p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                {t('title')}
              </h1>
              <p className="text-sm text-muted-foreground">
                {t('description')}
              </p>
            </div>

            <LoginForm />

            <p className="px-4 text-center text-sm text-muted-foreground">
              {t('by-signing-in-you-agree-to-our')}{' '}
              <Link
                href={`/${locale}/terms-of-service`}
                target="_blank"
                className="underline underline-offset-4 hover:text-primary"
              >
                {t('terms-of-service')}
              </Link>
              .
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
