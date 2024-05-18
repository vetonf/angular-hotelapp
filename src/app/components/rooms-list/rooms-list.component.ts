import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnDestroy } from '@angular/core';
import { RoomList } from '../rooms/room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, //OnPush strategy because the data doesn't get updated in this component
})
export class RoomsListComponent implements OnInit, OnDestroy {

  @Input() roomList: RoomList[] | null = [];
  @Input() title: string = '';
  @Output() selectedRoom = new EventEmitter<RoomList>();
  @Output() deletedRoom = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if(changes['title'] && changes['title'].previousValue) {

      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnDestroy(): void {
   
    console.log('onDestroy is called');
  }

  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  deleteRoom(id: string) {
    this.deletedRoom.emit(id);
  }
}
