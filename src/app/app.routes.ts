import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { ShoppingComponent } from './shopping/shopping.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'shopping', component: ShoppingComponent}
];
