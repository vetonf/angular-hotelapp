import { Inject, Injectable } from '@angular/core';
import { Photos, RoomList } from '../room';
import { environment } from 'src/environments/environment';
import { APP_SERVICE_CONFIG } from 'src/app/services/AppConfig/appconfig.service';
import { AppConfig } from 'src/app/services/AppConfig/appconfig.interface';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

@Injectable({
  /** 'root' means it gets registered in app.module.ts in 'providers' for us as a SINGLE global instance that can be used across the application
   * 
   * to use and create a new service instance you can pass the service as a value of the 'providers' property in the components decorator:
   * providers: [NameService]
   */
  providedIn: 'root'
})
export class RoomsService {
  // move component logic into a service

  // hard coded database
  /* 
  roomList: RoomList[] = [
    {
      roomType: 'Deluxe Room',
      roomNumber: 1,
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 999,
      photos: '/rooms/room-1.jpg',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('11-Dez-2022'),
      rating: 4.6252,
    },
    {
      roomType: 'Normal Room',
      roomNumber: 2,
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 470,
      photos: '/rooms/room-2.jpg',
      checkinTime: new Date('01-Sep-2022'),
      checkoutTime: new Date('25-Okt-2022'),
      rating: 4.245,
    },
    {
      roomType: 'Limited Room',
      roomNumber: 3,
      amenities: 'Air Condition, Free Wi-Fi, Kitchen, Bathroom',
      price: 640,
      photos: '/rooms/room-3.jpg',
      checkinTime: new Date('01-Jan-2022'),
      checkoutTime: new Date('30-Dez-2022'),
      rating: 4.8,
    },
  ];
  */

  // database from backend server
  roomList: RoomList[] = [];

  /** ShareReplay RxJs Operators: http response saved to cache and shared through the app => less requests, more performant
   * a stream can't be modified once subscribed; a stream can be modified inside a function known as "pipe"
   * shareReplay(1): shares the last received record
   * 
   * $-notation at the end of a property name stands for a "stream"
  */
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

  /**
   * @Inject as a value provider from a service (appconfig.service.ts) instead of accessing the value directly from the environment file 
   */
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
    ) {
      console.log('Rooms Service initialized...');
      console.log('Environment:', this.config.apiEndpoint);
      // console.log('Environment:', environment.apiEndpoint);
  }

  getRooms() {
    // get from hardcoded database
    // return this.roomList;

    // http interceptor; with "append" method you can add several header key-value pairs
    const headers = new HttpHeaders({
      'token': '135jk35hlk5o3j5'
    });

    // get from backend API (proxy.config.json sets up the API source); transform data object into "RoomList[]" type
    return this.http.get<RoomList[]>('./api/rooms', {
      headers: headers,
    });
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest('GET', `https://jsonplaceholder.typicode.com/photos`, {
      reportProgress: true,
    });
    return this.http.request<Photos>(request);
  }
}
