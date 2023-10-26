import { OnInit, Component, ViewChild, ViewContainerRef, ElementRef, Optional, Inject } from '@angular/core';
import { RoomsComponent } from './components/rooms/rooms.component';
import { LoggerService } from './services/logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './services/init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hotelinventory';

  @ViewChild('name', { static: true }) name!: ElementRef; // @ViewChild decorator to get the reference of the element in the template

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router,
  ) {
    console.log(initService.config)
  } // @Optional() ignores the error if the service is not found

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event); 
    // });
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)).subscribe((event) => {
        console.log('NAVIGATION STARTED');
      });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
        console.log('NAVIGATION COMPLETED')
      });


    this.loggerService?.log('AppComponent initialized');
    console.log(this.name);
    this.name.nativeElement.innerText = 'Hotel Vlad Dracula Tepes';
    this.localStorage.setItem('name', 'Hotel Vlad Dracula Tepes II');
  }

  // loginTypes = ['Admin', 'User'];
  // role = 'Admin';
  // @ViewChild('user', { read: ViewContainerRef }) user!: ViewContainerRef; //load the component dynamically

  // ngAfterViewInit(): void {
  //     const componentRef = this.user.createComponent(RoomsComponent);
  //     componentRef.instance.rooms.availableRooms = 70;
  // }
}
