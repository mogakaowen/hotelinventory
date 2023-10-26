import { Component, Input, Output, OnInit,OnChanges, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnDestroy } from '@angular/core';
import { Roomlist } from 'src/app/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges, OnDestroy{
  @Input() Rooms: Roomlist[] = [];
  @Input() title: string = '';

  @Output() selectedRoom = new EventEmitter<Roomlist>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges called');
    console.log(changes);
   if(changes['title']){
    this.title = changes['title'].currentValue.toUpperCase();
   }
  }

  ngOnInit(): void {
  }

  selectRoom(room: Roomlist) {
    this.selectedRoom.emit(room);
  }

  
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  } //called when the component is destroyed and removed from the DOM

}
