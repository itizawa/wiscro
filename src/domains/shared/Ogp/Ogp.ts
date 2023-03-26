export class Ogp {
  readonly url: string;
  readonly title?: string;
  readonly image?: string;
  readonly description?: string;
  readonly siteName?: string;

  constructor(init: Ogp) {
    this.url = init.url;
    this.title = init.title;
    this.image = init.image;
    this.description = init.description;
    this.siteName = init.siteName;
  }
}
