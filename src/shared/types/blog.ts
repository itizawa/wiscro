export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  author: string;
  thumbnail?: string;
  published: boolean;
  content: string;
}

export interface BlogMatter {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  author: string;
  thumbnail?: string;
  published?: boolean;
}

type Image = {
  url: string;
  height: number;
  width: number;
};
export interface Blog {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  summary: string;
  content: string;
  eyecatch: Image;
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    name: string;
    icon: Image;
  };
}
