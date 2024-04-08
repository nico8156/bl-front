import {Injectable, inject} from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {

  router =inject(Router)
  set(key: string, data: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error saving to local storage', e)
    }
  }

  get(key: string): unknown {
    try {
      const localStorageItem = localStorage.getItem(key)
      return localStorageItem ? JSON.parse(localStorageItem) : null
    } catch (e) {
      console.error('Error getting from local storage', e)
      return null
    }
  }
}