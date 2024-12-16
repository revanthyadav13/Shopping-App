import { Component, OnInit } from '@angular/core';
import { ItemManagementService } from '../item-management/item-management.service';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
import { Item } from '../Item';

@Component({
  selector: 'app-item-list',
  standalone: false,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  totalPrice: number = 0;
  c: string = "₹";

  constructor(
    private itemService: ItemManagementService,
    public authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Check if the user is logged in, if not redirect to the login page
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    } else {
      // Fetch items and calculate total price on component initialization
      this.loadItems();
      this.calculateTotalPrice();
    }
  }

  // Method to load items from the API
  loadItems(): void {
    this.itemService.getItems().subscribe(
      (data: Item[]) => {
        this.items = data;  // Assign the fetched items to the list
      },
      (error) => {
        console.error('Error loading items', error);
      }
    );
  }

  // Method to calculate the total price of all non-deleted items
  calculateTotalPrice(): void {
    this.itemService.calculatePrice().subscribe(
      (price: number) => {
        this.totalPrice = price;  // Update the total price
      },
      (error) => {
        console.error('Error calculating total price', error);
      }
    );
  }

  // Method to add a new item
  addItem(name: string, price: number): void {
    this.itemService.addItem(name, price).subscribe(
      (newItem: Item) => {
        this.items.push(newItem);  // Add the newly created item to the list
        this.calculateTotalPrice();  // Recalculate the total price after adding
      },
      (error) => {
        console.error('Error adding item', error);
      }
    );
  }

  // Method to delete an item
  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(
      () => {
        this.items = this.items.filter(item => item.id !== id);  // Remove the deleted item from the list
        this.calculateTotalPrice();  // Recalculate the total price after deletion
      },
      (error) => {
        console.error('Error deleting item', error);
      }
    );
  }

  // Method to handle logout functionality
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }

  // Method to confirm the logout action
  confirmLogout(): void {
    if (confirm("Are you sure you want to log out?")) {
      this.logout();
    }
  }
}
