const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
export const URLS = {
  TOP: '/',
  QUESTION_NEW: '/questions/new',
  QUESTION_DETAIL: (id: string) => `/questions/${id}`,
  LOGIN_TO_BACKEND: `${serverUrl}/auth/google`,
};
