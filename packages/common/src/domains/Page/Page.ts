export class Page {
  _id: string;
  url: string;
  title: string;
  description: string;
  favicon?: string;
  image?: string;
  body?: string;
  siteName?: string;
  lineUser: string;
  constructor(init: Page) {
    this._id = init._id;
    this.url = init.url;
    this.title = init.title;
    this.description = init.description;
    this.favicon = init.favicon;
    this.image = init.image;
    this.body = init.body;
    this.siteName = init.siteName;
    this.lineUser = init.lineUser;
  }
}
