const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const URLS = {
  TOP: '/',
  NOTE_NEW: '/notes/new',
  NOTE_DETAIL: (id: string) => `/notes/${id}`,
  LOGIN_TO_BACKEND: `${serverUrl}/auth/google`,
};
