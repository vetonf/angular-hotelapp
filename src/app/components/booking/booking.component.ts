import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/Config/config.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {

  constructor( private configService: ConfigService) { }

  ngOnInit(): void {
  }

}
