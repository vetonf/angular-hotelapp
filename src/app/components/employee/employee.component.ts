import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // create its own service instance instead of using the global one !!!
  providers: [RoomsService]
})
export class EmployeeComponent implements OnInit {

  employeeName: string = 'John Doe';
  
  // with "self" resolution identifier the service should be available at this level, raise ExeptionError otherwise if it's not listed under @Component.providers
  constructor(@Self() private roomsService: RoomsService) { }

  ngOnInit(): void {
  }

}
