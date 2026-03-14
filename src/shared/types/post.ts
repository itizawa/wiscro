type Image = {
  url: string;
  height: number;
  width: number;
};

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  body: string;
  images: Image[];
}
