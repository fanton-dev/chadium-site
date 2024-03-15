import { redirect, RedirectType } from 'next/navigation';
import { useLocale } from 'next-intl';
import { loginDiscord } from '@/components/api-client/auth';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const locale = useLocale();

  await loginDiscord(code || '');

  // If the user is logged in successfully, the login page will redirect to the home page
  return redirect(`/${locale}/login`, RedirectType.replace);
}
