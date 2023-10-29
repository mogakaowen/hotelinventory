import { Component, OnInit } from '@angular/core';
import { CommentService } from './comment.service';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';
import { Comments } from './comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  comments$ = this.commentService.getComments(); // fetches data after component is loaded using commentService

  comment$ = this.route.data.pipe(pluck('comments')); // load data from the route resolver(fetches data before component is loaded)

  comments: Comments[] = [];

  constructor(private commentService: CommentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.data.subscribe(data => {
    //   console.log(data['comments']); // prefetched data
    // });

    this.route.data.subscribe(data => {
      this.comments = data['comments']
    }); // prefetched data
  }

}
