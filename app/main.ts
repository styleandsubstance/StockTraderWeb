/**
 * Created by sdoshi on 5/4/2016.
 */
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { HTTP_PROVIDERS } from '@angular/http';

// Add all operators to Observable
import 'rxjs/Rx';

import { AppComponent } from './app.component';

//bootstrap(AppComponent);
bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);