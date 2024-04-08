import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import * as authEffects from './app/auth/store/effects'
import * as bookInfoEffects from './app/bookInfo/store/effects'
import * as booksEffect from './app/home/store/affects'
import * as linksEffect from './app/shared/component/navlink/store/effects'
import * as booksByLibEffect from './app/booksByLibrary/store/effects'

import * as bookBlogEffects from './app/bookBlog/store/effects'
import * as commentsEffects from './app/shared/component/comments/store/effects'

import { routes } from './app/app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HomeService } from './app/home/service/home.service';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { authFeatureKey, authReducer } from './app/auth/store/reducers';
import { bookInfoFeatureKey, bookInfoReducer } from './app/bookInfo/store/reducers';
import { booksFeatureKey, booksReducer } from './app/home/store/reducers';
import { bookBlogFeatureKey, bookBlogReducer } from './app/bookBlog/store/reducers';
import { commentsFeatureKey, commentsReducer } from './app/shared/component/comments/store/reducers';


import {provideRouterStore, routerReducer} from '@ngrx/router-store';
import {provideStoreDevtools} from '@ngrx/store-devtools'

import { linksFeatureKey, linksReducer } from './app/shared/component/navlink/store/reducers';
import { authInterceptor } from './app/shared/services/authInterceptor';
import { booksByLibFeatureKey, booksByLibReducer } from './app/booksByLibrary/store/reducers';


bootstrapApplication(AppComponent, {
  providers: [

    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    // provideClientHydration(),
    
    HomeService,

    provideState(authFeatureKey, authReducer),
    provideState(bookInfoFeatureKey, bookInfoReducer),
    provideState(booksFeatureKey, booksReducer),
    provideState(linksFeatureKey, linksReducer),
    provideState(booksByLibFeatureKey, booksByLibReducer),
    
    provideState(bookBlogFeatureKey, bookBlogReducer),
    provideState(commentsFeatureKey, commentsReducer),

    provideEffects(authEffects, bookInfoEffects, booksEffect, linksEffect, booksByLibEffect, bookBlogEffects, commentsEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),

]
})
  .catch((err) => console.error(err));
