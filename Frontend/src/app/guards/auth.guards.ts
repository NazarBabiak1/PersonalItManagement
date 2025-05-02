import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.checkSession().pipe(
      tap((isValid) => {
        if (!isValid) {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        }
      }),
      catchError(() => {
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return of(false);
      })
    );
  }
}
