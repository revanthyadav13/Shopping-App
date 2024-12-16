import { Injectable } from '@angular/core';
import { Item } from '../Item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ItemManagementService {

  private readonly API_URL = 'https://localhost:7147/api/items';  // Change the URL based on your API base URL

  constructor(private http: HttpClient) { }

  // Get all non-deleted items from the API
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL);
  }

  // Add a new item
  addItem(name: string, price: number): Observable<Item> {
    const newItem: Item = {
      id: 0,  // The server will assign the ID
      name,
      price,
      deleted: false
    };
    return this.http.post<Item>(this.API_URL, newItem);
  }

  // Delete an item (soft delete by marking it as deleted)
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

  // Calculate the total price of all non-deleted items
  calculatePrice(): Observable<number> {
    return this.http.get<number>(`${this.API_URL}/calculatePrice`);
  }
}
