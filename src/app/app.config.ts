import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import * as authEffects from './auth/store/effects'
import * as bookInfoEffects from './bookInfo/store/effects'
import * as booksEffect from './home/store/affects'
import * as linksEffect from './shared/component/navlink/store/effects'
import * as booksByLibEffect from './booksByLibrary/store/effects'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HomeService } from './home/service/home.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { authFeatureKey, authReducer } from './auth/store/reducers';
import { bookInfoFeatureKey, bookInfoReducer } from './bookInfo/store/reducers';
import { booksFeatureKey, booksReducer } from './home/store/reducers';

import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {provideStoreDevtools} from '@ngrx/store-devtools'

import { linksFeatureKey, linksReducer } from './shared/component/navlink/store/reducers';
import { authInterceptor } from './shared/services/authInterceptor';
import { booksByLibFeatureKey, booksByLibReducer } from './booksByLibrary/store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideClientHydration(),
    
    HomeService,
    provideState(authFeatureKey, authReducer),
    provideState(bookInfoFeatureKey, bookInfoReducer),
    provideState(booksFeatureKey, booksReducer),
    provideState(linksFeatureKey, linksReducer),
    provideState(booksByLibFeatureKey, booksByLibReducer),
    provideEffects(authEffects, bookInfoEffects, booksEffect, linksEffect, booksByLibEffect),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),

]
};
