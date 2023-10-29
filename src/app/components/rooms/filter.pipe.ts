import { Pipe, PipeTransform } from '@angular/core';
import { Roomlist } from 'src/app/room';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(rooms: Roomlist[], price: number): Roomlist[] {
    return rooms.filter((room) => room.price >= price);
  }

}
