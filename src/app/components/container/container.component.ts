import { AfterContentInit, Component, ContentChild, Host, OnInit } from '@angular/core';

import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  /**
   * providers: [RoomsService] creates its own service instance
   * with @Host identifier/decorator all child components of this container are going to use this instance instead of the one on root level
   * 
   */
  // constructor(@Host() private roomsService: RoomsService) { }
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log(this.employee);

    this.employee.employeeName = 'Rick Johnes';
  }

}
