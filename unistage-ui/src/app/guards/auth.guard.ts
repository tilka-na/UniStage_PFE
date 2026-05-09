import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // Check if the token is expired (exp is in seconds, Date.now() is in ms)
      const isExpired = Math.floor(Date.now() / 1000) >= payload.exp;
      if (isExpired) {
        localStorage.removeItem('token'); // Clean up the old token
        this.router.navigate(['/login']);
        return false;
      }

      const userRole = payload.role; // assuming JWT has role

      // Check route data
      const expectedRole = route.data['role'];
      if (expectedRole && expectedRole !== userRole) {
        this.router.navigate(['/']); // redirect if role doesn't match
        return false;
      }

      return true; // access allowed
    } catch (err) {
      console.error('Invalid token', err);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
