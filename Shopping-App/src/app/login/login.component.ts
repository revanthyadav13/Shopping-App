import { Component } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // If login is successful, navigate to the item list
        console.log('Login successful:', response);
        localStorage.setItem('isAuthenticated', 'true');  // Optionally store the authentication status
        this.router.navigate(['/item-list']);  // Redirect to item list page
      },
      (error) => {
        // If there's an error, log it to the console and show an error message
        console.error('Login failed:', error);
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = 'An error occurred, please try again later';
        }
      }
    );
  }
}
