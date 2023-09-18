export class Question {
  _id: string;
  title: string;
  description: string;

  constructor(init: Question) {
    this._id = init._id;
    this.title = init.title;
    this.description = init.description;
  }
}
