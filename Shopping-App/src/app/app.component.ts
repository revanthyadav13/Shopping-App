import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Shopping-App';

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    // Check if the user is already logged in when the app starts
    if (this.authService.checkLogin()) {
      // Redirect to item list if authenticated
      this.router.navigate(['/item-list']);
    } else {
      // Redirect to login page if not authenticated
      this.router.navigate(['/login']);
    }
  }
}
