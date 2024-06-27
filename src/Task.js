import { randomUUID } from 'node:crypto'

export class Task {
  _id
  _title
  _description
  _completed_at
  _created_at
  _update_at



  constructor(title, description) {
    this._id = randomUUID()
    this._title = title;
    this._description = description;
    this._created_at = new Date();
    this._completed_at = null
    this._update_at = null
  }
  set id(id) {
    this._id = id;
  }

  set title(title) {
    this._title = title;
  }

  set description(description) {
    this._description = description;
  }

  set completed_at(completed_at) {
    this._completed_at = completed_at;
  }

  set created_at(create_at) {
    this._created_at = create_at;
  }

  set update_at(update_at) {
    this._update_at = update_at;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get description() {
    return this._description;
  }

  get completed_at() {
    return this._completed_at;
  }

  get create_at() {
    return this._create_at;
  }

  get update_at() {
    return this._update_at;
  }





  completedTeak() {
    this._completed_at = new Date();
  }

  updateTask() {
    this._update_at = new Date();
  }

}