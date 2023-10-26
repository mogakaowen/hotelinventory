import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, Roomlist } from 'src/app/room';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from 'src/app/services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  hotelName = 'Hotel Transylvania';
  hideRooms = true;

  selectedRoom!: Roomlist;
  Title = 'List of Available Rooms';

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 5,
    bookedRooms: 15
  }

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent; // @ViewChild decorator to get the reference of the HeaderComponent component in the RoomsComponent component

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>; // create an instance of HeaderComponent component for each element in the template

  roomsList: Roomlist[] = [];
  error: string = '';

  totalBytes = 0;

  subscription!: Subscription

  error$ : Subject<string> = new Subject<string>; // Subject is a type of Observable that allows values to be multicasted to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

  getError$ = this.error$.asObservable(); // convert the Subject to an Observable

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      console.log('Error occured');
      console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(
    map((rooms) => rooms.length)
  ); // map operator is used to transform the data emitted by the Observable

  stream = new Observable<any>(observer => {
    observer.next('User1');
    observer.next('User2');
    observer.next('User3');
    observer.complete();
    observer.error('Error');
  });

  constructor(@SkipSelf() private roomsService: RoomsService, private configService: ConfigService) { } // @SkipSelf skips the current component and looks for the service in the parent component

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made')
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!')
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded
          break;
        }
        case HttpEventType.Response: {
          console.log('Request completed!', event.body);
          break;
        }
      }
    })

    // console.log(this.headerComponent)
    this.stream.subscribe((data) => console.log(data));


    this.stream.subscribe({
      next: (data) => console.log(data),
      complete: () => console.log('Completed'),
      error: (err) => console.log(err)
    });

    // this.roomsService.getRooms().subscribe(rooms => {
    //   this.roomsList = rooms;
    // });
    // this.subscription = this.roomsService.getRooms$.subscribe(rooms => {
    //   this.roomsList = rooms;
    // });
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  } // called everytime change detection runs

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    this.headerComponent.title = 'Hotel Transylvania'; // accessing the HeaderComponent component's title property and assigning a value to it

    // this.headerChildrenComponent.last.title = "Vlad Dracula Tepes Hotel";
    // this.headerChildrenComponent.get(0).title = "First Title";

    console.log(this.headerChildrenComponent);
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
    // throw new Error('Method not implemented.');
  }


  // ngOnDestroy() not needed as we are using the async pipe in the template
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    } // unsubscribe the subscription to avoid memory leaks
  } // when the component is destroyed, the subscription is also destroyed

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.Title = "Rooms List"
  }

  roomSelect(room: Roomlist) {
    this.selectedRoom = room;
  }

  addRoom() {
    const room: Roomlist = {
      roomNumber: '6',
      roomType: 'Double',
      amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen",
      price: 200,
      photos: 'https://source.unsplash.com/1600x900/?hotel',
      checkinTime: new Date('2023-11-01T08:45'),
      checkoutTime: new Date('2023-11-02T18:45'),
      rating: 4.68
    }
    // this.roomsList.push(room);
    // this.roomsList = [...this.roomsList, room]; // create a new array and add the new room to it and assign it to the roomsList instead of pushing the new room to the existing array(immutable way)

    this.roomsService.addRoom(room).subscribe((rooms) => {
      this.roomsList = rooms;
    });
  }

  editRoom() {
    const room: Roomlist = {
      roomNumber: '2',
      roomType: 'Deluxe',
      amenities: "Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen, Balcony",
      price: 200,
      photos: 'https://source.unsplash.com/1600x900/?hotel',
      checkinTime: new Date('2023-11-01T08:45'),
      checkoutTime: new Date('2023-11-02T18:45'),
      rating: 4.68,
    }
    // this.roomsList.push(room);
    // this.roomsList = [...this.roomsList, room]; // create a new array and add the new room to it and assign it to the roomsList instead of pushing the new room to the existing array(immutable way)

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomsList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('1').subscribe((data) => {
      this.roomsList = data;
    });
  }

}
