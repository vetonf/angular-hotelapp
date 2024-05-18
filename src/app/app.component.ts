import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';

import { RoomsComponent } from './components/rooms/rooms.component';
import { LoggerService } from './services/Logger/logger.service';
// import { setTheme } from 'ngx-bootstrap/utils';

import { LocalStorageToken } from './localstorage.token';
import { InitService } from './services/Init/init.service';
import { ConfigService } from './services/Config/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit {
  title = 'angular-hotel-inventory';
  role = 'Admin';

  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
    ) {
    // setTheme('bs5');

    console.log("InitService Config:", initService.config);
  }

  // type ElementRef because it's a normal HTML tag element; accessable in ngOnInit because of {static: true}
  @ViewChild('wrapper', {static: true}) wrapper!: ElementRef;

  // {static: false}, default value so it's only available in ngAfterViewInit life cycle
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  ngAfterViewInit(): void {
    // creates the references instance dynamically
    const componentRef = this.vcr.createComponent(RoomsComponent);

    componentRef.instance.numberOfRooms = 50;
  }

  ngOnInit(): void {
    this.wrapper.nativeElement.innerText = 'Hotel Hilton';

    // "?" checks if loggerService is available, then executes the method
    // in this case it isn't registered in root or app.module.ts under providers, so log method doesn't get exucuted
    this.loggerService?.log('AppComponent.ngOnInit()')

    this.localStorage.setItem('name', 'Hilton Hotel');

    // route guards
    /**
     * 
    this.router.events.subscribe(event => {
        console.log('Route Event: ', event);
      }
    )
    */
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => console.log('NavigationStart: ', event));
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => console.log('NavigationEnd: ', event));
  }

}
