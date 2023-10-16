export interface Page {
  _id: string;
  url: string;
  createdUserId: string;
  noteId: string;
  title: string;
  description: string;
  favicon?: string;
  image?: string;
  body?: string;
  summary?: string;
  siteName?: string;
  createdAt: string;
  updatedAt: string;
  isFetching: boolean;
}
