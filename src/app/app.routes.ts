import { Route } from '@angular/router';
import { AuthGuardService } from './shared/guard/auth.guard';


export const routes: Route[] = [
    {
        path: 'register',
        loadChildren: () =>
          import('./auth/auth.routes').then((m) => m.registerRoutes),
        
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./auth/auth.routes').then((m) => m.loginRoutes),
      },
    {
        path:'home',
        canActivate:[AuthGuardService],
        loadChildren: () =>
        import('./home/home.routes').then((m) => m.routes),

    },
    {
      path: 'user/:username',
      canActivate:[AuthGuardService],
      loadChildren: () =>
        import('./user/user.routes').then((m) => m.routes),
    },
    {
      path: 'bookInfo/:slug',
      canActivate:[AuthGuardService],
      loadChildren: () =>
        import('./bookInfo/bookInfo.routes').then((m) => m.routes),
    },
    {
      path: 'bookslib/:libraryId',
      canActivate:[AuthGuardService],
      loadChildren: () =>
        import('./booksByLibrary/booksByLibrary.routes').then((m) => m.routes),
    },
    {
      path: 'bookblog/:bookId',
      canActivate:[AuthGuardService],
      loadChildren: () =>
        import('./bookBlog/bookBlog.routes').then((m) => m.routes),
    },
];
