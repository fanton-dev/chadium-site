'use server';
import { getBearerToken } from '@/components/api-client/auth';

const locale = 'en';

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

export async function createCommunity(
  name: string,
  description: string,
  color: string,
  image: string,
) {
  const bearerToken = await getBearerToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/communities`,
    {
      method: 'POST',
      headers: {
        'Accept-Language': locale,
        Authorization: bearerToken || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, color, image }),
    },
  );

  return await response.json();
}

export async function getCommunity(id: string) {
  const bearerToken = await getBearerToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/communities/${id}`,
    {
      method: 'GET',
      headers: {
        'Accept-Language': locale,
        Authorization: bearerToken || '',
      },
    },
  );

  return await response.json();
}
