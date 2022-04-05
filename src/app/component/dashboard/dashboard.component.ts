import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/model/login';
import { Note } from 'src/app/model/note';
import { NoteService } from 'src/app/service/note.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  noteDetail !: FormGroup;
  noteObject : Note = new Note();
  noteList : Note[] = [];
  
  constructor(private formBuilder : FormBuilder, private noteService : NoteService, private route : Router) { }

  ngOnInit(): void {
    this.fetchNotes();
    this.noteDetail = this.formBuilder.group({
      _id : [''],
    title : [''],
    note : [''],
    date : ['']
    })
  }

  logout(){
    localStorage.removeItem("token");
    this.route.navigate(['/']);
  }

  

  addNote(){
    //this.noteObject._id = this.noteDetail.value._id;
    this.noteObject.title = this.noteDetail.value.title;
    this.noteObject.note = this.noteDetail.value.note;
    this.noteObject.date = this.noteDetail.value.date;
    //this.noteObject.folder = this.noteDetail.value.folder;
    //this.noteObject.user_id = this.noteDetail.value.user_id;
  
    this.noteService.addNote(this.noteObject).subscribe(res=>{
      //console.log(res);
      this.fetchNotes();
    },err=>{
      //console.log(err);
      this.fetchNotes();
    });
  }

  editNote(note : Note){
    this.noteDetail.controls['_id'].setValue(note._id);
    this.noteDetail.controls['title'].setValue(note.title);
    this.noteDetail.controls['note'].setValue(note.note);
    this.noteDetail.controls['date'].setValue(note.date);
    //this.noteDetail.controls['folder'].setValue(note.folder);
    //this.noteDetail.controls['user_id'].setValue(note.user_id);
  }

  fetchNotes() {
    while(this.noteList.length > 0) {
      this.noteList.pop();
    }
    this.noteService.fetchNotes().subscribe((data: Note[]) => this.noteList = data)
  }

  updateNote(){
    this.noteObject._id = this.noteDetail.value._id;
    this.noteObject.title = this.noteDetail.value.title;
    this.noteObject.note = this.noteDetail.value.note;
    this.noteObject.date = this.noteDetail.value.date;
    //this.noteObject.folder = this.noteDetail.value.folder;
    //this.noteObject.user_id = this.noteDetail.value.user_id;

    this.noteService.updateNote(this.noteObject).subscribe(res=>{
      //console.log(res);
      this.fetchNotes();
    },err=>{
      //console.log(err);
      this.fetchNotes();
    });
    
  }

  deleteNote(note : Note) {
    this.noteObject._id = note._id;
    this.noteService.deleteNote(this.noteObject).subscribe(res=>{
      //console.log(res);
      this.fetchNotes();
    },err=>{
      //console.log(err);
      this.fetchNotes();
    });
  }

}
