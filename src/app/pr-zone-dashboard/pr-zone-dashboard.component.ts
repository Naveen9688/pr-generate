import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { CommonModule } from '@angular/common';
import { LogInService } from '../log-in.service';
import { ActivatedRoute,Router } from '@angular/router';
 

@Component({
  selector: 'app-pr-zone-dashboard',
  imports: [MatCardModule, StaticHeaderComponent,CommonModule],
  templateUrl: './pr-zone-dashboard.component.html',
  styleUrl: './pr-zone-dashboard.component.css',
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
export class PrZoneDashboardComponent{

  constructor(private loginService:LogInService ,private route:ActivatedRoute ,private router:Router,private cdr: ChangeDetectorRef) {}
  
  cardStates: { [key: string]: string } = {};
  totalPR3A = 0;
  totalPR3B = 0;
  totalPR17A = 0;
  totalPR17B = 0;
  totalMinorPrCount = 0;
  totalMajorPrCount =0;
  zoneMinorPRCount=0;
  rangeMinorPRCount=0;
  userZone: any[] = [1];
  userRange: any[] = [1];
  unitId:any;
  userName:any;
  userTypeId:any;
  unitTypeName:any;
  disUnitTypeId:any;
  distUnitId:any;
  districtgrid:boolean=false;
  rangeUnitId:any;
  viewerName:any;
  distviewerName:any;
  totalprViewer:any;
  selectedRangeId: any = null;
  selectedDistrictId: any = null;
  highlightData: boolean = false;
  highlightDistrictCards: boolean = false;

  totalprminorsection = '3a, 17a';

ngOnInit(){
  debugger
  this.route.params.subscribe(params=>{
    this.unitId=params['unitid'];
    this.userTypeId=params['usertypeId'];
    this.unitTypeName=params['unitTypeName'];
    
  })
  this.userName= sessionStorage.getItem('username') ;
  if(this.userName==='nz'){
    this.userName='North Zone';
  }else if(this.userName==='cz'){
    this.userName='Central Zone';
  }
  else if(this.userName==='sz'){
    this.userName='South Zone';
  }
  else if(this.userName==='wz'){
    this.userName='West Zone';
  }
   
  this.fetchUserDistricts(this.unitId,this.userTypeId,this.unitTypeName);
}
fetchUserDistricts(unitId:any,userTypeId:any,unitTypeName:any) {
  this.loginService.rangeDashboard(userTypeId, unitId,unitTypeName).subscribe(
    (response) => { 
     this.userZone=response;
     if (response && response.length > 0) {
       
      this.zoneMinorPRCount = response.reduce((total :any, item: any) => {
        return total + item.rangePrCount;  
      }, 0);
      this.totalPR3A = response.reduce((total :any, item: any) => {
        return total + item.minorPr3ACount;  
      }, 0);
      this.totalPR17A = response.reduce((total :any, item: any) => {
        return total + item.minorPr17ACount;  
      }, 0);
      this.totalMinorPrCount = this.totalPR3A + this.totalPR17A;
    } else {
      this.zoneMinorPRCount = 0;  
    }
     
    })
    
   
}

   zonetoTabledata(unitId:any,viewerName:any){
    this.selectedRangeId = unitId;  
    this.selectedDistrictId = null;  
    this.highlightData = false;  
    this.highlightDistrictCards = true;
    this.distUnitId=0;
    this.rangeUnitId=unitId;
    this.unitTypeName='Range Office';
    this.userTypeId=3;
    this.viewerName=viewerName+" " +"Range";
    this.totalprViewer=this.viewerName;
    this.distviewerName=viewerName;
    this.loginService.rangeDashboard(this.userTypeId, unitId,this.unitTypeName).subscribe(
      (response) => {
        if(response){
          this.districtgrid=true;
          this. userRange=response;
        }else{
          this.districtgrid=false;
        }
       if(response && response.length > 0){
        this.disUnitTypeId=response[0].unitTypeId;
       }
       if (response && response.length > 0) {
        
        this.rangeMinorPRCount = response.reduce((total :any, item: any) => {
          return total + item.distPrCount;  
        }, 0);
        this.totalPR3A = response.reduce((total :any, item: any) => {
          return total + item.minorPr3ACount;  
        }, 0);
        this.totalPR17A = response.reduce((total :any, item: any) => {
          return total + item.minorPr17ACount;  
        }, 0);
        this.totalMinorPrCount = this.totalPR3A + this.totalPR17A;
      } else {
        this.rangeMinorPRCount = 0;  
      }
       
      })
  }

  rangetoTabledata(unitId:any,viewerName:any){
    this.userRange.forEach(range => range.selected = false);
    const selectedRange = this.userRange.find(range => range.distId === unitId);
    if (selectedRange) {
    selectedRange.selected = true;
    } 
    this.selectedDistrictId = unitId;
    this.highlightData = true;
    this.cdr.detectChanges();
    this.distUnitId=unitId;
    this.rangeUnitId=0;
    this.unitTypeName='Dist'
    this.viewerName=viewerName+" " +"Dist";
    this.loginService.dashboard(this.disUnitTypeId, unitId,this.unitTypeName).subscribe(
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

  navigateToTableDataBasedOnSection(value:any){
    if(this.rangeUnitId > 0){
      this.unitTypeName='Range Office'
      this.unitId=this.rangeUnitId 
      this.router.navigate(['/pr-tabledata', value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection]);
    }

    else if(this.distUnitId> 0){
      this.unitTypeName='Dist Office'
      this.unitId=this.distUnitId
      this.router.navigate(['/pr-tabledata', value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection]);
    }else{
    const usertypeId = this.route.snapshot.params['usertypeId'];
    const unitid = this.route.snapshot.params['unitid'];
    const unitTypeName = this.route.snapshot.params['unitTypeName']; 
    
    this.router.navigate(['/pr-tabledata', value, usertypeId, unitid,unitTypeName,this.totalprminorsection]);
    }

  }

  totalPrlist(){
    if(this.rangeUnitId > 0){
      this.unitTypeName='Range Office'
      this.unitId=this.rangeUnitId 
      this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
    }
    else if(this.distUnitId> 0){
      this.unitTypeName='Dist Office'
      this.unitId=this.distUnitId
      this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else{
        const usertypeId = this.route.snapshot.params['usertypeId'];
      const unitid = this.route.snapshot.params['unitid'];
      const unitTypeName = this.route.snapshot.params['unitTypeName']; 
      this.router.navigate(['/pr-tabledata', usertypeId, unitid,unitTypeName,this.totalprminorsection]);
      }
  }


  setHoverState(card: string, state: string) { 
    this.cardStates[card] = state;
  }

  getCardClass(district: string): string {
    const colors: Record<string, string> = {
     
    };
    return colors[district] || 'card-default';
  }

}
