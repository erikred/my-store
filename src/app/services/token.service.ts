import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    const token = localStorage.getItem('token');
    //const token = localStorage['token'];// otra forma
    return token;
  }
  removeToken() {
    localStorage.removeItem('token');
  }
}
