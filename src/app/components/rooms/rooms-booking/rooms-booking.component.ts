import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.css']
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;

  // id$ = this.router.params.pipe(
  //   map((params) => params['id'])
  // );

  id$ = this.router.paramMap.pipe(map((params) => params.get('id')));

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.router.snapshot.params['id']; // snapshot is a static image of the route information shortly after the component was created

    // this.router.params.subscribe((params) => { this.id = params['id'] }); // subscribing causes memory leak when the component is destroyed
  }
}
