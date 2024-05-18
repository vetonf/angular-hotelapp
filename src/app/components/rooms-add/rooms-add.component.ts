import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RoomList } from '../rooms/room';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss']
})
export class RoomsAddComponent implements OnInit {

  room: RoomList = {
    roomType: '',
    roomNumber: '',
    amenities: '',
    photos: '',
    price: 0,
    rating: 0,
    checkinTime: new Date(),
    checkoutTime: new Date(),
  };
  successMessage: string = '';

  constructor(private roomsService: RoomsService) { }

  ngOnInit(): void {
  }

  AddRoom(roomsForm: NgForm) {
    this.roomsService.addRoom(this.room).subscribe(data => {
      this.successMessage = 'Room Added Successfully';
      roomsForm.reset();
    });
  }

}
