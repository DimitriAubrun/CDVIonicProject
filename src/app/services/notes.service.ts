import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from "@angular/fire/compat/database";

export class Note{
  key?: string | null;
  title?: string;
  dateBegin?: Date;
  dateEnd?: Date;
  desc?: string;
  private _latitude?: number;
  private _longitude?: number;


  get latitude(): number {
    return <number>this._latitude;
  }


  get longitude(): number {
    return <number>this._longitude;
  }

  isValid(){
    return this.dateBegin && this.dateEnd && this.title && this.desc && this._latitude && this._longitude;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private collectionPath = '/notes';
  private noteRef !:AngularFireList<Note>;
  constructor(private db: AngularFireDatabase) {
    this.noteRef = this.db.list(this.collectionPath);
  }

  getAll(){
    return this.noteRef;
  }

  create(data: Note){
    return this.noteRef.push(data);
  }

  update( key: string, data: any){
    return this.noteRef.update(key, data);
  }

  delete(key: string){
    return this.noteRef.remove(key);
  }

}
