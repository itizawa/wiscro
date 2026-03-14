type Image = {
  url: string;
  height: number;
  width: number;
};

export interface PostLabel {
  id: string;
  name: string;
  color: string;
}

export interface Post {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  body: string;
  images: Image[];
  label: PostLabel | null;
}
