import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  // providers: [RoomsService] // local instance of the service
})
export class EmployeeComponent implements  OnInit {
  empName: string = 'Naingolan';

  // constructor(@Self() private roomsService: RoomsService) { } // @Self() decorator to tell angular to look for the service in the local instance
  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
  }

}
