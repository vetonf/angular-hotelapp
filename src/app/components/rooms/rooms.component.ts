import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './room';

import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from 'src/app/services/Config/config.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {

  hotelName = 'Hilton Hotel';
  numberOfRooms = 350;
  hideRooms = true;
  rooms: Room = {
    totalRooms: 55,
    availableRooms: 32,
    bookedRooms: 23
  };
  roomList: RoomList[] = [];
  selectedRoom!: RoomList;
  title = 'Room List';
  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();

  });
  totalBytes = 0;
  subscription!: Subscription;

  error$ = new Subject<string>();
  getError$ = this.error$.asObservable();


  rooms$ = this.roomsService.getRooms$.pipe(
    catchError(err => {

      this.error$.next(err.message);
      return of([]);
    })
  );

    roomsCount$ = this.roomsService.getRooms$.pipe(
    map(rooms => rooms.length)
  );

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;


  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  /** Instanciate a service by passing it as an argument to the constructor with the appropriate identifier
   *
   * never declare/instanciate a service like this:
   *    roomsService = new RoomsService();
   *
   * get the data from the service in ngOnInit
   *
   * @SkipSelf identifier skips the check of the existence of the service; removes it from the resolution tree
   *  usage: not necessary since Angular uses a "Bloom Filter" internally (which is alrealdy fast) to check if the service exists
  */
  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private configService: ConfigService
    ) { }

  ngOnInit(): void {

    this.stream.subscribe({
      next: (data) => console.log(data),
      error: (error) => console.log('stream error:', error),
      complete: () => console.log('stream complete')
    });


    this.roomsService.getPhotos().subscribe(event => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Fake JSON API request has been made.');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Fake JSON API request success.');
          break;
        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          console.log('Total Bytes', this.totalBytes);
          break;
        case HttpEventType.Response:
          console.log(event.body);
      }
    });
  }

  ngAfterViewInit(): void {
    console.log("Header:", this.headerComponent);
    console.log("HeaderChildren:", this.headerChildrenComponent);

    this.headerComponent.title = "Rooms View";

    this.headerChildrenComponent.last.title = 'Last Component Title';
    // this.headerChildrenComponent.forEach(c => c.title = 'xxx');
  }

  ngAfterViewChecked(): void {

  }

  ngDoCheck(): void {
    // console.log('doCheck called');
  }

  ngOnDestroy(): void {

    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggle(): void {
    this.hideRooms = !this.hideRooms;
  }

  selectRoom(room: RoomList): void {
    this.selectedRoom = room;
  }

  addRoom(): void {
    const room: RoomList = {
      roomType: 'Royal Room',
      roomNumber: '',
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 1499,
      photos: '/rooms/room-1.jpg',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('11-Dec-2022'),
      rating: 4.866,
    };

    this.title = 'Updated Room List';


    this.roomsService.addRoom(room).subscribe(data => this.roomList = data);
  }

  editRoom(): void {
    const room: RoomList = {
      roomType: 'Royal Room',
      roomNumber: '3',
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 1499,
      photos: '/rooms/room-1.jpg',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('11-Dec-2022'),
      rating: 4.866,
    };

    this.roomsService.editRoom(room).subscribe(data => this.roomList = data);
  }

  deleteRoom(id: string): void {
    this.roomsService.deleteRoom(id).subscribe(data => this.roomList = data);
  }
}
