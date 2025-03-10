import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { CommonModule } from '@angular/common';
import { PrSourceService } from '../pr-source.service';
import { LogInService } from '../log-in.service';

@Component({
  selector: 'app-pr-range',
  imports: [MatCardModule, StaticHeaderComponent,CommonModule],
  templateUrl: './pr-range.component.html',
  styleUrl: './pr-range.component.css',
  animations: [
    trigger('cardAnimation', [
      state('void', style({ transform: 'scale(0.9)', opacity: 0 })),
      state('*', style({ transform: 'scale(1)', opacity: 1 })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out')),
      transition('* => hover', animate('200ms ease-in')),
      transition('hover => *', animate('200ms ease-out'))
    ])
  ]
})
export class PrRangeComponent {
 

  cardStates: { [key: string]: string } = {};
  userDistricts: any[] = [];

  totalPR3A = 0;
  totalPR3B = 0;
  totalPR17A = 0;
  totalPR17B = 0;
  totalMinorPrCount = 0;
  totalMajorPrCount =0;
  unitid:any;
  userName:any;
  DistricttotalMajorPR =0;
  unitId:any;
  userTypeId:any;
  unitTypeName:any;
  allUnitsId:any;
  disUnitTypeId=0;
  distUnitId:any
  rangeMinorPRCount=0;
  selectedDistId: any = null;
  

  allDistricts = [
    { name: 'Kancheepuram', value: 0 },
    { name: 'Trichy', value: 0 },
    { name: 'Madurai', value: 0 },
    { name: 'Coimbatore', value: 0 },
    { name: 'Chennai', value: 0 },
    // { name: 'Villupuram', value: 0 },
    // { name: 'Salem', value: 0 },
    // { name: 'Vellore', value: 0 },
  ];

  constructor(private route: ActivatedRoute, private router: Router, private prSourceService:PrSourceService,private loginService:LogInService ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.unitId=params['unitid'];
      this.userTypeId=params['usertypeId'];
      this.unitTypeName=params['unitTypeName'];

    })
    this.userName = sessionStorage.getItem('username') ;
    this.userName=this.userName.split('_')[1].toUpperCase();
    this.loginService.dashboard(this.disUnitTypeId, this.unitId,this.unitTypeName).subscribe(
      (response) => {
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
      })
    this.fetchUserDistricts(this.unitId,this.userTypeId,this.unitTypeName);
  }

  fetchUserDistricts(unitId:any,userTypeId:any,unitTypeName:any) {
    this.loginService.rangeDashboard(userTypeId, unitId,unitTypeName).subscribe(
      (response) => {
       this. userDistricts=response;
       if(response && response.length > 0){
        this.disUnitTypeId=response[0].unitTypeId;
       }
       if (response && response.length > 0) {
        
        this.rangeMinorPRCount = response.reduce((total :any, item: any) => {
          return total + item.distPrCount;  
        }, 0);
      } else {
        this.rangeMinorPRCount = 0;  
      }
       
      })
      
     
  }

  setHoverState(card: string, state: string) { 
    this.cardStates[card] = state;
  }

  navigateToTableData(unitid: any) {
    this.selectedDistId = unitid;
    this.distUnitId=unitid;
    this.unitTypeName='Dist'
    this.loginService.dashboard(this.disUnitTypeId, unitid,this.unitTypeName).subscribe(
      (response) => {
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
      })
  }

  totalPrlist(){
    if(this.distUnitId){
    this.unitTypeName='Dist Office'
    this.unitid=this.distUnitId
    this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitid,this.unitTypeName])
    }else{
      const usertypeId = this.route.snapshot.params['usertypeId'];
    const unitid = this.route.snapshot.params['unitid'];
    const unitTypeName = this.route.snapshot.params['unitTypeName']; 
    this.router.navigate(['/pr-tabledata', usertypeId, unitid,unitTypeName]);
    }
  }

  MinorPRData(){  //Overa all range based minor PR data
    const usertypeId = this.route.snapshot.params['usertypeId'];
    const unitid = this.route.snapshot.params['unitid'];
    const unitTypeName = this.route.snapshot.params['unitTypeName']; 
    this.router.navigate(['/pr-tabledata', usertypeId, unitid,unitTypeName]);
  }

  MajorPRData(){

  }
  navigateToTableDataBasedOnSection(value:any){
    if(this.distUnitId){
      this.unitTypeName='Dist Office'
      this.unitid=this.distUnitId
      this.router.navigate(['/pr-tabledata', value, this.disUnitTypeId, this.unitid,this.unitTypeName]);
    }else{
    const usertypeId = this.route.snapshot.params['usertypeId'];
    const unitid = this.route.snapshot.params['unitid'];
    const unitTypeName = this.route.snapshot.params['unitTypeName']; 
    
    this.router.navigate(['/pr-tabledata', value, usertypeId, unitid,unitTypeName]);
    }
  }

  getCardClass(district: string): string {
    const colors: Record<string, string> = {
      Kancheepuram: 'card-kancheepuram',
      Trichy: 'card-trichy',
      Madurai: 'card-madurai',
      Coimbatore: 'card-coimbatore',
      Chennai: 'card-chennai',
      // Villupuram: 'card-villupuram',
      // Salem: 'card-salem',
      // Vellore: 'card-Vellore',
    };
    return colors[district] || 'card-default';
  }
}
