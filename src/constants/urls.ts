const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const URLS = {
  TOP: '/',
  QUESTION_NEW: '/notes/new',
  QUESTION_DETAIL: (id: string) => `/notes/${id}`,
  LOGIN_TO_BACKEND: `${serverUrl}/auth/google`,
};
