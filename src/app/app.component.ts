import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/component/navbar/navbar.component';
import { NavLinkComponent } from './shared/component/navlink/navlink.component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from './auth/store/reducers';
import { authActions } from './auth/store/actions';
import { PersistanceService } from './shared/services/persistance.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, NavLinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  store = inject(Store)
  persist = inject(PersistanceService)
  user$ = this.store.select(selectCurrentUser)
  
  ngOnInit(): void {

  }
}
