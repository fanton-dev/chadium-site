'use server';

import { cookies } from 'next/headers';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { jwtDecode } from 'jwt-decode';

const locale = 'en';

export async function loginDiscord(code: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/auth/login/discord?code=${code}`,
    {
      method: 'GET',
      headers: {
        'Accept-Language': locale,
        Authorization: (await getBearerToken()) || '',
      },
    },
  );

  if (response.ok) {
    const { accessToken, refreshToken } = await response.json();
    const cookieStore = cookies();
    setTokens(cookieStore, accessToken, refreshToken);
  }

  return null;
}

export async function getAuth() {
  // Get access token from cookies
  const cookieStore = cookies();
  let accessToken = cookieStore.get('access_token');

  // Refresh existing access and refresh tokens if the access token is expired
  if (!accessToken) {
    // await refreshTokens();
    accessToken = cookieStore.get('access_token');
  }

  return accessToken;
}

export async function getBearerToken() {
  const accessToken = await getAuth();

  if (!accessToken) {
    return undefined;
  }

  return `Bearer ${accessToken.value}`;
}

export async function getUser() {
  // Get current authentication
  const bearerToken = await getBearerToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/api/users/current`,
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

function setTokens(
  cookieStore: ResponseCookies,
  accessToken: string,
  refreshToken: string,
) {
  const decodedAccessToken = jwtDecode(accessToken);
  const accessTokenExp = decodedAccessToken.exp;

  const decodedRefreshToken = jwtDecode(refreshToken);
  const refreshTokenExp = decodedRefreshToken.exp;

  cookieStore.set('access_token', accessToken, {
    expires: accessTokenExp ? accessTokenExp * 1000 : undefined,
  });
  cookieStore.set('refresh_token', refreshToken, {
    expires: refreshTokenExp ? refreshTokenExp * 1000 : undefined,
  });
}
