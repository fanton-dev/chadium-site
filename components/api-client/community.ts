'use server';
import { getBearerToken } from '@/components/api-client/auth';
import { useLocale } from 'next-intl';

const locale = useLocale();

export async function getCommunities() {
  // Get current authentication
  const bearerToken = await getBearerToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/communities`,
    {
      method: 'GET',
      headers: {
        'Accept-Language': locale,
        Authorization: bearerToken || '',
      },
    },
  );

  if (response.ok) {
    return await response.json();
  }

  return undefined;
}

export async function createCommunity(name: string, description: string) {
  const bearerToken = await getBearerToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/communities`,
    {
      method: 'POST',
      headers: {
        'Accept-Language': locale,
        Authorization: bearerToken || '',
      },
      body: JSON.stringify({ name, description }),
    },
  );

  return await response.json();
}
