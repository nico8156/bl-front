import {HttpInterceptorFn} from '@angular/common/http'
import {inject} from '@angular/core'
import {PersistanceService} from './persistance.service'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const persistanceService = inject(PersistanceService)
  const token = persistanceService.get('accessToken')
  if(request.url.startsWith('https://www.googleapis.com/')){
    return next(request)
  }

  if (request.url.includes('http://localhost:8080/api/auth/user')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }
  if (request.url.includes('/api/auth/update')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }

  if (!request.url.includes('/api/auth')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }
  if (request.url.includes('http://localhost:8080/api/library/save')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }
  if (request.url.includes('http://localhost:8080/api/library')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }
  if (request.url.includes('http://localhost:8080/api/book/')) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  
  }
  return next(request);
}