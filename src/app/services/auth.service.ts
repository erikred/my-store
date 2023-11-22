import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.API_URL}/api/v1/auth`;
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string) {
    return this.http
      .post<Auth>(`https://api.escuelajs.co/api/v1/auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => this.tokenService.saveToken(response.access_token))
      );
  }

  profile() {
    //const headers = new HttpHeaders();
    //headers.set('Authorization', `Bearer ${token}`);
    // forma de personalizaer headers

    //return this.http.get<User>(`https://api.escuelajs.co/api/v1/auth/profile`, {
    // headers: {
    //   Authorization: `Bearer ${token}`
    // }
    //});

    return this.http
      .get<User>('https://api.escuelajs.co/api/v1/auth/profile')
      .pipe(
        tap((user) => this.user.next(user))
      );
  }
  loginAndGet(email: string, password: string) {
    return this.login(email, password).pipe(switchMap(() => this.profile()));
  }

  logout() {
    this.tokenService.removeToken();
  }
}
