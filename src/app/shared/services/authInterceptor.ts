import {HttpInterceptorFn} from '@angular/common/http'
import {inject} from '@angular/core'
import {PersistanceService} from './persistance.service'


export const authInterceptor: HttpInterceptorFn = (request, next) => {

  const persist = inject(PersistanceService)

  if(request.url.startsWith('https://www.googleapis.com/' || 'http://localhost/api/auth/login' || 'http://localhost/api/auth/register')){
    return next(request)
  } else {
    const token = persist.get('accessToken')
    request = request.clone({
      setHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
    return next(request)
  }
}