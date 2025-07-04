import { CHAT_GROUP_URL, CHAT_GROUP_USERS_URL } from '@/lib/apiEndPoints';

export async function fetchChatGroups(token: string) {
  const res = await fetch(CHAT_GROUP_URL, {
    headers: {
      Authorization: token,
    },
    next: {
      revalidate: 60 * 60,
      tags: ['dashboard'],
    },
  });

  if (!res.ok) {
    throw new Error('Falied to fetch data');
  }

  const response = await res.json();
  if (response?.data) {
    return response.data;
  } else {
    return [];
  }
}

export async function fetchChatGroup(id: string) {
  const res = await fetch(`${CHAT_GROUP_URL}/${id}`, {
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('Falied to fetch data');
  }

  const response = await res.json();
  if (response?.data) {
    return response.data;
  } else {
    return null;
  }
}

export async function fetchChatUsers(id: string, token: string) {
  const res = await fetch(`${CHAT_GROUP_USERS_URL}?group_id=${id}`, {
    cache: 'no-cache',
    headers: {
      Authorization: token,
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const response = await res.json();
  if (response?.data) {
    return response?.data;
  }
  return [];
}
