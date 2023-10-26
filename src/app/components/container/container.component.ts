import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit, AfterContentInit {
    @ContentChild(EmployeeComponent) employee!: EmployeeComponent; //access the component

    constructor(private roomService: RoomsService) { }
  
    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
      console.log('ngAfterContentInit called')
      console.log(this.employee); //access the property
      this.employee.empName = 'Ramires'; //change the value of the property
    }
}
