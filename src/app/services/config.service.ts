import { Inject, Injectable } from '@angular/core';
import { RouteConfig } from './routeConfig';
import { RouteConfigToken } from './routeConfig.service';

@Injectable({
  providedIn: 'any' // any indicates that this service will create one instance for the entire application and then separate instances for each lazy loaded module
})
export class ConfigService {  

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log('ConfigService Initialized...');
    console.log(this.configToken);
   }
}
