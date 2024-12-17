import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly LOGIN_STATUS_KEY = 'isAuthenticated';  // Key to store login status in localStorage
  private apiUrl = 'https://localhost:7147/api/Authentication';  // Your .NET API URL
  private readonly TOKEN_KEY = 'authToken';

  constructor(private http: HttpClient) { }

  // Login method
  login(username: string, password: string): Observable<any> {
    const credentials = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }

  // On successful login, store JWT token and update login status
  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.LOGIN_STATUS_KEY, 'true');  // User is authenticated
  }

  // Logout method
  logout(): void {
    localStorage.removeItem(this.LOGIN_STATUS_KEY);  // Remove authentication status
    localStorage.removeItem(this.TOKEN_KEY);  // Remove the token from localStorage
  }

  // Check if the user is logged in by checking for the presence of the JWT token
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGIN_STATUS_KEY) === 'true';
  }

  // Get the stored JWT token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Set Authorization header with the JWT token for requests
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  // Attach token to requests
      });
    }
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  // Example of using the token for making authenticated API calls
  // You can modify your API calls to use this header when needed
  makeAuthenticatedRequest(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`, { headers: this.getHeaders() });
  }

  // Check login status on app start
  checkLogin(): boolean {
    return this.isLoggedIn(); // Here you can also check if token is expired
  }
}
