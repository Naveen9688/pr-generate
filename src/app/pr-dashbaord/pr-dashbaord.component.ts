import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LogInService } from '../log-in.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-pr-dashbaord',
  imports: [
    MatCardModule,
    RouterModule,
    MatIconModule, NgIf,
    StaticHeaderComponent
],
  templateUrl: './pr-dashbaord.component.html',
  styleUrl: './pr-dashbaord.component.css',
  animations: [
    trigger('cardAnimation', [
      state('void', style({ transform: 'scale(0.9)', opacity: 0, 'will-change': 'transform, opacity' })),
      state('*', style({ transform: 'scale(1)', opacity: 1, 'will-change': 'transform, opacity' })),
      state('hover', style({ transform: 'scale(1.05)', 'will-change': 'transform' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out')),
      transition('* => hover', animate('200ms ease-in')),
      transition('hover => *', animate('200ms ease-out'))
    ])
  ]
})
export class PrDashbaordComponent {

  cardStates: { [key: string]: string } = {
    '3A': '*',
    '17A': '*',
    'TotalMinor': '*',
    '3B': '*',
    '17B': '*',
    'TotalMajor': '*'
  };

  userName!:any;
  totalPR3A = 0;
  totalPR3B = 0;
  totalPR17A = 0;
  totalPR17B = 0;
  usertype=0;
  totalMinorPrCount = 0;
  totalMajorPrCount =0;
  isRangeMaster:boolean=false;
  years!:any;
  currentYear!:any;
  onetime: boolean = true;
  constructor(private route: ActivatedRoute,private router: Router, private loginService: LogInService,private snackBar: MatSnackBar,
    private location: Location
  ) { }

  ngOnInit(): void {
    debugger
    this.userName = sessionStorage.getItem('username') ;
    this.route.params.subscribe(params => {
      const usertype = params['usertypeId'];
      const unitid = params['unitid'];
      const unitTypeName=params['unitTypeName'];
     
      console.log('Usertype:', usertype);
      console.log('Unit IDs:', unitid);
      console.log('Unit Type Name:', unitTypeName);

      debugger
      this.loginService.dashboard(usertype, unitid,unitTypeName).subscribe(
        (response) => {
          debugger
          this.currentYear = new Date().getFullYear();
          if (Array.isArray(response)) {  
            for (const item of response) { 
              if (item?.year === this.currentYear) {  
                this.onetime = false;
                break;  
              }else {
                this.onetime = true;
            }
            }
          }
          
          if (response && Array.isArray(response)) {
            debugger
            this.totalPR3A = response.filter((item) => item.prSectionNo === '3a').length;
            this.totalPR17A = response.filter((item) => item.prSectionNo === '17a').length;
            this.totalPR3B = response.filter((item) => item.prSectionNo === '3b').length;
            this.totalPR17B = response.filter((item) => item.prSectionNo === '17b').length;
           this.totalMinorPrCount = response.filter((item) => item.prSectionNo === '3a' || item.prSectionNo === '17a').length;
          // this.totalMinorPrCount = response.length
          }
        else {
          alert('Invalid credentials. Please try again.');
        }
        },
        // (error) => {
        //   console.error('Login failed:', error);
        //   alert('An error occurred during login. Please try again later.');
        // }
      );


    });
  }

  setHoverState(card: string, state: string) {
    this.cardStates[card] = state;
  }
  



  // onNavigate(){
  //   console.log('Navigating...');
  //   // this.router.navigate(['/pr-details']);
  // }

  // onNavigateOnetimeEntry(){
  //   console.log('Navigating...');
  //   this.router.navigate(['/one-time-entry']);
  // }

  // onNavigateExixting(){
  //   console.log('Navigating...');
  //   this.router.navigate(['/existing-pr']);
  // }

  
  navigateToTableData(value: string) {
    debugger
    const usertypeId = this.route.snapshot.params['usertypeId'];
    const unitid = this.route.snapshot.params['unitid'];
    const unitTypeName = this.route.snapshot.params['unitTypeName'];
    const totalprminorsection = "3a,17a";
    this.router.navigate(['/pr-tabledata', value, usertypeId, unitid,unitTypeName,totalprminorsection]);
  }


  totalPrlist(){
    debugger
    const usertypeId = this.route.snapshot.params['usertypeId'];
    const unitid = this.route.snapshot.params['unitid'];
    const unitTypeName = this.route.snapshot.params['unitTypeName']; 
    const totalprminorsection = "3a,17a";
    this.router.navigate(['/pr-tabledata', usertypeId, unitid,unitTypeName,totalprminorsection]);
  }
  

  onLogout(): void {
    this.router.navigate(['/log-in']);
    this.location.replaceState('/login');
    this.snackBar.open('Logout successful!', 'Close', {
      duration: 3000,
    });
    this.router.navigate(['/log-in']);
  }

}
