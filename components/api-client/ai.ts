'use server';

import { getBearerToken } from '@/components/api-client/auth';

export async function getCommunityBanner(description: string) {
  const bearerToken = await getBearerToken();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/api/ai/generate-image`,
      {
        method: 'POST',
        headers: {
          Authorization: bearerToken || '',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ model: 'dall-e-3', prompt: description, n: 1 }),
      },
    );

    const json = await response.json();
    return json.data[0].url;
  } catch (error) {
    return null;
  }
}
