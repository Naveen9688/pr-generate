import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { LogInService } from '../log-in.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
   
],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css',
  // standalone: true,

})
export class LogInComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LogInService, private router: Router,private snackBar: MatSnackBar) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      // alert('Please fill out both fields.');
      this.snackBar.open('Please fill out both fields.', 'Close', {
        duration: 1000, // Set duration to 5 seconds
       });
      return;
    }

    const loginData = {
      username: this.username,
      password: this.password
    };
debugger
    this.loginService.login(loginData).subscribe(
      (response: any) => {
        debugger

        if (response && response.username) {

        const usertypes = response.unitTypeId;
        
  debugger
        // Storing response values in session storage
        sessionStorage.setItem('unitTypeName', response.usertype);
        sessionStorage.setItem('usertype',usertypes);
        sessionStorage.setItem('username',this.username);
        sessionStorage.setItem('unitid', response.unitid);
        sessionStorage.setItem('loginUnitTypeName', response.usertype);

        // if (response && response.username) {
          
        //   const usertype =response.usertype;
        //   const unitid=response.unitid;

        //   alert('Login Successful');
        //   // this.router.navigate(['/pr-dashbaord'], { queryParams: { usertype, unitid } });

        //   this.router.navigate([/pr-dashboard/${usertype}/${unitid}]);
        // 
        // if (response && response.username) {
         
          const usertypeId = response.unitTypeId;
          const unitid = response.unitid;
          const unitTypeName = response.usertype;
          if(response.usertype==="Range Office"){
            this.router.navigate([`/pr-range-dashBoard/${usertypeId}/${unitid}/${unitTypeName}`]);
          }else if(response.usertype==="Zone Office"){
            this.router.navigate([`/pr-zone-dashboard/${usertypeId}/${unitid}/${unitTypeName}`]);
          }
          else if(response.usertype==="Dist" || response.usertype==="City"){
            this.router.navigate([`/pr-dashboard/${usertypeId}/${unitid}/${unitTypeName}`]); 
        
          }else if(response.usertype==="CheifOffice Officers"){
            this.router.navigate([`/chief-office-dashboard/${usertypeId}/${unitid}/${unitTypeName}`]);
          }
         this.snackBar.open('Login successful!', 'Close', {
          duration: 3000,
         });
        }else {
          alert('Invalid credentials. Please try again.');
        } 
        (error: any) => {
          debugger
          alert('An error occurred during login. Please try again.');
          console.error(error);
        }
          
 
        
      },
      (error: any) => {
        debugger
        this.snackBar.open('An error occurred during login. Please try again.', 'Close', {
          duration: 1000,
        });
      }
    );
  }
}
