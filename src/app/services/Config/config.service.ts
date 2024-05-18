import { Inject, Injectable } from '@angular/core';
import { RouteConfig } from './routeConfig';
import { RouteConfigToken } from './routeConfig.service';

@Injectable({
  // 'any' creates several instances when the module, where it is used/injected, is lazy-loaded
  // e.g. here: app.component.ts creates one instance, room.component.ts and booking.component.ts create their own service instance when they're lazy-loaded
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) { 
    console.log('ConfigService initialized...');
    console.log('ConfigToken: ', this.configToken);
  }
}
