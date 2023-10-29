import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comments } from './comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments() {
    return this.http.get<Comments[]>('http://jsonplaceholder.typicode.com/comments');
    // return this.http.get<Comments[]>('http://jsonplaceholder.typicode.com/commentsghghasghasghasgh'); // for ErrorHandler testing

  }
}
