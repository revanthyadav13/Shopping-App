import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOGIN_STATUS_KEY = 'isAuthenticated';  // Key to store login status in localStorage
  private apiUrl = 'https://localhost:7147/api/Authentication';  // Your .NET API URL

  constructor(private http: HttpClient) { }

  // Login method
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.LOGIN_STATUS_KEY);  // Remove authentication status
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGIN_STATUS_KEY) === 'true';
  }
}
