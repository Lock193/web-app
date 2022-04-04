import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from 'src/app/model/note';
import { Login } from 'src/app/model/login';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    user_id: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  addNoteURL : string;
  fetchNotesURL : string;
  updateNoteURL: string;
  deleteNoteURL: string;
  userLogin : Login;

  constructor(private http:HttpClient) { 
    this.addNoteURL = 'http://192.168.86.249:8081/create'
    this.fetchNotesURL = 'http://192.168.86.249:8081/fetch';
    this.updateNoteURL = 'http://192.168.86.249:8081/update';
    this.deleteNoteURL = 'http://192.168.86.249:8081/delete';
    this.userLogin = new Login();
    this.userLogin.user_id = '623cad1351a855dc0a2eee2e';

  }

  addNote(note: Note): Observable<Note> {
    httpOptions.headers = httpOptions.headers.set('title', note.title);
    httpOptions.headers = httpOptions.headers.set('req-date', note.date);
    httpOptions.headers = httpOptions.headers.set('note', note.note);
    httpOptions.headers = httpOptions.headers.set('user_id', '623cad1351a855dc0a2eee2e');
    httpOptions.headers = httpOptions.headers.set('folder', '1');
    return this.http.post<Note>(this.addNoteURL,null,httpOptions);
  }

  fetchNotes() : Observable<Note[]>{
    console.log(this.userLogin);
    httpOptions.headers = httpOptions.headers.set('user_id', '623cad1351a855dc0a2eee2e');
    return this.http.post<Note[]>(this.fetchNotesURL,null,httpOptions);
  }

  updateNote(note: Note): Observable<Note> {
    httpOptions.headers = httpOptions.headers.set('title', note.title);
    httpOptions.headers = httpOptions.headers.set('req-date', note.date);
    httpOptions.headers = httpOptions.headers.set('note', note.note);
    httpOptions.headers = httpOptions.headers.set('user_id', '623cad1351a855dc0a2eee2e');
    httpOptions.headers = httpOptions.headers.set('folder', '1');
    httpOptions.headers = httpOptions.headers.set('id', note._id);
    return this.http.post<Note>(this.updateNoteURL,null,httpOptions);
  }

  deleteNote(note: Note): Observable<Note> {
    httpOptions.headers = httpOptions.headers.set('id', note._id);
    httpOptions.headers = httpOptions.headers.set('user_id', '623cad1351a855dc0a2eee2e');
    return this.http.post<Note>(this.deleteNoteURL,null,httpOptions);
  }
}
