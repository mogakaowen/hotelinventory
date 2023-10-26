import { Injectable, Inject } from '@angular/core';
import { Roomlist } from '../room';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { AppConfig } from '../AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  roomsList: Roomlist[] = [
  ];

  constructor(@Inject(APP_SERVICE_CONFIG) private appConfig: AppConfig, private http: HttpClient) {
    console.log(this.appConfig.apiEndPoint);
    console.log('Rooms Service constructor called'); // @Inject decorator to inject the value of the token
  }

  // shareReplay operator is used to share the response of the Observable with multiple subscribers
  // headers = new HttpHeaders({
  //   'token': 'my-auth-token99998888777'
  // });
  getRooms$ = this.http.get<Roomlist[]>('/api/rooms').pipe(
    shareReplay(1)
  );  //$ is a naming convention to indicate that the variable is an Observable

  getRooms() {
    return this.http.get<Roomlist[]>('/api/rooms');
  }  // get method is READ

  addRoom(room: Roomlist) {
    return this.http.post<Roomlist[]>('/api/rooms', room);
  } // post method is CREATE

  // editRoom(room: Roomlist) {
  //   return this.http.put<Roomlist[]>('/api/rooms/' + room.roomNumber, room);

  editRoom(room: Roomlist) {
    return this.http.put<Roomlist[]>(`/api/rooms/${room.roomNumber}`, room);
  } // put method is UPDATE

  deleteRoom(id: string) {
    return this.http.delete<Roomlist[]>(`/api/rooms/${id}`);
  } // delete method is DELETE

  // deleteRoom(room: Roomlist) {
  //   return this.http.delete<Roomlist[]>(`/api/rooms/${room.roomNumber}`);
  // }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);

  }
}
