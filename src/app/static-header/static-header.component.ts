import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-static-header',
  imports: [MatIconModule],
  templateUrl: './static-header.component.html',
  styleUrl: './static-header.component.css'
})
export class StaticHeaderComponent {

  constructor(private route: ActivatedRoute,private router: Router, private snackBar: MatSnackBar,private location: Location) { }
  
  userName!:any;

  ngOnInit(): void {
  this.userName = sessionStorage.getItem('username') ;
  }

  onLogout(): void {
    sessionStorage.clear;
    localStorage.clear;
    this.location.go('/login');
    this.location.replaceState('/login');
    this.snackBar.open('Logout successful!', 'Close', {
      duration: 3000,
    });
    this.router.navigate(['/log-in']);
  }

}
