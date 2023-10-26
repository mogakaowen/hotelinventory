import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Roomlist } from 'src/app/room';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css']
})
export class RoomsAddComponent implements OnInit {
  room: Roomlist = {
    roomNumber: '',
    roomType: '',
    amenities: '',
    price: 0,
    photos: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating: 0,
  }

  successMessage: string = '';
  roomsList: Roomlist[] = [];

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
  
  }

  AddRoom(roomsForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe((data) => {
      this.successMessage = 'Room Added Successfully';
      roomsForm.resetForm({
        roomNumber: '',
        roomType: '',
        amenities: '',
        price: 0,
        photos: '',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        rating: 0,
      });
    });
  }
}
