import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/component/navbar/navbar.component';
import { NavLinkComponent } from './shared/component/navlink/navlink.component';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from './auth/store/reducers';
import { authActions } from './auth/store/actions';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, NavLinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  store = inject(Store)
  
  user$ = this.store.select(selectCurrentUser)
  
  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser())
  }



}
