export interface Answer {
  _id: string;
  url: string;
  createdUserId: string;
  questionId: string;
  title: string;
  description: string;
  favicon?: string;
  image?: string;
  body?: string;
  siteName?: string;
  createdAt: string;
  updatedAt: string;
}