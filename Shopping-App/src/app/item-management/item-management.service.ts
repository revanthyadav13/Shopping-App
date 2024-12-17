import { Injectable } from '@angular/core';
import { Item } from '../Item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  private readonly API_URL = 'https://localhost:7147/api/items';  // Change the URL based on your API base URL

  constructor(private http: HttpClient) { }

  // Helper method to get the headers with Authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  // Get token from localStorage
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Attach token to header
    }

    return headers;
  }

  private getUserIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        return parseInt(decodedToken.nameid, 10);
      } catch (error) {
        console.error('Error decoding token:', error);
        return 0;
      }
    }
    return 0;
  }

  public getUsernameFromToken(): string {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        return decodedToken.unique_name;
      } catch (error) {
        console.error('Error decoding token:', error);
        return '';
      }
    }
    return '';
  }

  // Get all non-deleted items from the API
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL, { headers: this.getHeaders() });
  }

  // Add a new item
  addItem(name: string, price: number): Observable<Item> {
    const userId = this.getUserIdFromToken();
    const newItem: Item = {
      id: 0,  // The server will assign the ID
      name,
      price,
      deleted: false,
      userId
    };

    return this.http.post<Item>(this.API_URL, newItem, { headers: this.getHeaders() });
  }

  // Delete an item (soft delete by marking it as deleted)
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, { headers: this.getHeaders() });
  }

  // Calculate the total price of all non-deleted items
  calculatePrice(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/calculatePrice`, { headers: this.getHeaders() });
  }
}
