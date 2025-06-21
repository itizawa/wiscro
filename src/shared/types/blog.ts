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