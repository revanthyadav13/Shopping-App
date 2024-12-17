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
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response && response.token) {
        // Store the token and mark as logged in
        this.authService.storeToken(response.token);
        console.log('Login successful!');

        // Navigate to items page after successful login
        this.router.navigate(['/item-list']);  // Redirect to items page
      } else {
        console.log('Login failed!');
      }
    }, error => {
      console.error('Login error', error);
    });
  }
}
