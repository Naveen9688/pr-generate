import { Component } from '@angular/core';
import { StaticHeaderComponent } from '../static-header/static-header.component';
import { CommonModule} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {animate,state,style,transition,trigger,} from '@angular/animations';
import { ActivatedRoute,Router  } from '@angular/router';
import { LogInService } from '../log-in.service';


@Component({
  selector: 'app-chief-office-dashboard',
  imports: [CommonModule, MatCardModule, StaticHeaderComponent],
  templateUrl: './chief-office-dashboard.component.html',
  styleUrl: './chief-office-dashboard.component.css',
  animations: [
    trigger('cardAnimation', [
      state('void', style({ transform: 'scale(0.9)', opacity: 0 })),
      state('*', style({ transform: 'scale(1)', opacity: 1 })),
      state('hover', style({ transform: 'scale(1.05)' })),
      transition('void => *', animate('300ms ease-in')),
      transition('* => void', animate('300ms ease-out')),
      transition('* => hover', animate('200ms ease-in')),
      transition('hover => *', animate('200ms ease-out')),
    ]),
  ],
})

export class ChiefOfficeDashboardComponent {

  
  cardStates: { [key: string]: string } = {};
  totalPR3A = 0;
  totalPR3B = 0;
  totalPR17A = 0;
  totalPR17B = 0;
  totalMinorPrCount = 0;
  totalMajorPrCount = 0;
  distUnitId:any;
  districtPRCount = 0;
  cityMinorPRCount = 0;
  specialMinorPRCount = 0;
  rangeUnitId:any;
  userZone: any;
  userRange: any;
  userDistrict: any;
  zoneMinorPRCount = 0;
  rangeMinorPRCount = 0;
  districtMinorPRCount = 0;
  unitId: any;
  userTypeId:any;
  unitTypeName: any;
  disUnitTypeId:any;
  zones: any[] = [];
  ranges: any[] = [];
  districts: any[] = [];
  cities: any[] = [];
  zoneGrid: boolean = false;
  rangeGrid: boolean = false;
  distGrid: boolean = false;
  cityGrid: boolean = false;
  OverallZoneUnitId:any;
  zoneUnitId:any;
  cityUnitId:any;
  overAllCityId:any;
  zoneName:any;
  rangeName:any;
  distName:any;
  userNames:any;
  selectedZone: any = null;
  selectedCity: any = null;
  selectedZones: any = null;
  selecteddistricts: any = null;
  isDistrictSelected: boolean = false;
  isZonesSelected: boolean = false;
  isOverviewDistrictSelected: boolean = false;
  isPrCountsSelected: boolean = false;
  isCitySelected: boolean = false;

  totalprminorsection = '3a, 17a';


  constructor(private route:ActivatedRoute,private loginService:LogInService,private router:Router) {}

  ngOnInit(){
    this.route.params.subscribe(params=>{
      this.unitId=params['unitid'];
      this.userTypeId=params['usertypeId'];
      this.unitTypeName=params['unitTypeName'];

    })

    this.fetchUserDistricts(this.unitId,this.userTypeId,this.unitTypeName);
  }
  fetchUserDistricts(unitId:any,userTypeId:any,unitTypeName:any) {
    this.loginService.cheifOfficeDashboard(userTypeId, unitId,unitTypeName).subscribe(
      (response) => { 
        this.districtPRCount=response.distPrCount;
        this.totalPR3A=response.minorPr3ACount;
        this.totalPR17A=response.minorPr17ACount;
        this.totalMinorPrCount=this.totalPR3A+this.totalPR17A;
        this.cityMinorPRCount=response.cityPrCount;
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
  zoneClick(){
    this.isDistrictSelected = true;
    this.selectedZone = null;
    this.selectedCity = null;
    this.selectedZones = null;
    this.selecteddistricts = null;
    this.isPrCountsSelected = false;
    this.isCitySelected = false;
    this.zoneGrid=true;
    this.cityGrid = false;
    this.rangeGrid=false;
    this.distGrid=false;
    this.unitTypeName='Zone Office';
    this.unitId=0;
    this.userTypeId=1;
    this.OverallZoneUnitId=1;
    this.userNames='';
    this.loginService.cheifOfficeDashboard(this.userTypeId,this.unitId,this.unitTypeName).subscribe(
      (response) => { 
        this.zones=response;
        if (response && response.length > 0) {
        this.totalPR3A = response.reduce((total :any, item: any) => {
          return total + item.minorPr3ACount;  
        }, 0);
        this.totalPR17A = response.reduce((total :any, item: any) => {
          return total + item.minorPr17ACount;  
        }, 0);
        this.zoneMinorPRCount = response.reduce((total :any, item: any) => {
          return total + item.zonePrCount;  
        }, 0);
        this.totalMinorPrCount = this.totalPR3A + this.totalPR17A;
      }else{

      }
      })
  }
  zonetoRangeTabledata(zoneId: any,zoneName: any) {
    this.selectedZone = zoneId; 
    this.isDistrictSelected = true;
    this.isZonesSelected = true;
    this.selectedZones = null;
    this.isPrCountsSelected = false;
    this.selecteddistricts = null;
    this.zoneGrid=true;
    this.cityGrid = false;
    this.rangeGrid=true;
    this.distGrid=false;
    this.unitTypeName='Range Office';
    this.unitId=zoneId;
    this.userTypeId=3;
    this.zoneUnitId=zoneId;
    this.OverallZoneUnitId=0;
    if( zoneName==='nz'){
      this.userNames='North Zone';
      this.zoneName='North Zone';
    }else if(zoneName==='cz'){
      this.userNames='Central Zone';
      this.zoneName='Central Zone';
    }
    else if(zoneName==='sz'){
      this.userNames='South Zone';
      this.zoneName='South Zone';
    }
    else if(zoneName==='wz'){
      this.userNames='West Zone';
      this.zoneName='West Zone';
    }
    // this.userNames=zoneName;
    this.loginService.cheifOfficeDashboard(this.userTypeId,this.unitId,this.unitTypeName).subscribe(
      (response) => { 
        this.ranges=response;
     if (response && response.length > 0) {
       
      this.rangeMinorPRCount = response.reduce((total :any, item: any) => {
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

    rangetoDistrictTabledata(rangeId:any,rangeName:any){
      this.selectedZones = rangeId;
      this.isOverviewDistrictSelected = true;
      this.isPrCountsSelected = false;
    this.zoneGrid=true;
    this.cityGrid = false;
    this.rangeGrid=true;
    this.distGrid=true;
    this.unitTypeName='Range Office';
    this.unitId=rangeId;
    this.userTypeId=3;
    this.zoneUnitId=0;
    this.OverallZoneUnitId=0;
    this.rangeUnitId=rangeId;
    this.userNames=rangeName+" " +"Range";
    this.rangeName=rangeName+" " +"Range";
      this.loginService.rangeDashboard(this.userTypeId, this.unitId,this.unitTypeName).subscribe(
        (response) => {
           if(response){
            this.districts=response;
           }
         if(response && response.length > 0){
          this.disUnitTypeId=response[0].unitTypeId;
         }
         if (response && response.length > 0) {
          
          this.districtMinorPRCount = response.reduce((total :any, item: any) => {
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
    disttoTabledata(distid:any,disName:any){
      this.isPrCountsSelected = true;
      this.zoneGrid=true;
      this.selecteddistricts=distid;
    this.cityGrid = false;
    this.rangeGrid=true;
    this.distGrid=true;
      this.unitId=distid;
      this.zoneUnitId=0;
    this.OverallZoneUnitId=0;
    this.rangeUnitId=0;
    this.distUnitId=distid;
    this.userNames=disName+" " +"Dist";
    this.distName=disName+" " +"Dist";
      this.unitTypeName='Dist'
      // this.viewerName=viewerName+" " +"Dist";
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
    }
    cityTabledata(cityId:any,cityName:any){
      this.isPrCountsSelected = true;
      this.selectedCity=cityId;
      this.isCitySelected = true;
      this.unitTypeName='City'
      this.zoneUnitId=0;
    this.OverallZoneUnitId=0;
    this.rangeUnitId=0;
    this.distUnitId=0;
    this.overAllCityId=0;
      this.cityUnitId=cityId;
      this.disUnitTypeId=6;
      this.unitId=cityId;
      this.userNames=cityName;
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
    
    }
  navigateToTableDataBasedOnSection(value: any) {
    debugger
    if(this.rangeUnitId > 0){
      this.unitTypeName='Range Office'
      this.unitId=this.rangeUnitId 
      this.router.navigate(['/pr-tabledata', value,this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
    }
    else if(this.distUnitId> 0){
      this.unitTypeName='Dist Office'
      this.unitId=this.distUnitId
      this.router.navigate(['/pr-tabledata',value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else if(this.OverallZoneUnitId > 0){
        this.unitTypeName='Chief All Zone Office'
        this.unitId=0;
        this.disUnitTypeId=0;
        this.router.navigate(['/pr-tabledata',value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else if(this.zoneUnitId > 0){
        this.unitTypeName='Zone Office'
        this.unitId=this.zoneUnitId
        this.disUnitTypeId=0;
        this.router.navigate(['/pr-tabledata',value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else if(this.overAllCityId > 0){
        this.unitTypeName='OverAllCity'
        this.unitId=0;
        this.disUnitTypeId=0;
        this.router.navigate(['/pr-tabledata',value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])

      }else if(this.cityUnitId > 0){
        this.unitTypeName='OverAllCity'
        this.unitId=this.cityUnitId
        this.disUnitTypeId=6;
        this.router.navigate(['/pr-tabledata',value, this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      } 
      else{
        const usertypeId = this.route.snapshot.params['usertypeId'];
      const unitid = this.route.snapshot.params['unitid'];
      const unitTypeName = this.route.snapshot.params['unitTypeName']; 
      this.router.navigate(['/pr-tabledata', value,usertypeId, unitid,unitTypeName,this.totalprminorsection]);
      }
  }

  totalPrlist() {

    if(this.rangeUnitId > 0){
      this.unitTypeName='Range Office'
      this.unitId=this.rangeUnitId 
      this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
    }
    else if(this.distUnitId> 0){
      this.unitTypeName='Dist Office'
      this.unitId=this.distUnitId
      this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else if(this.OverallZoneUnitId > 0){
        this.unitTypeName='Chief All Zone Office'
        this.unitId=0;
        this.disUnitTypeId=0;
        this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else if(this.zoneUnitId > 0){
        this.unitTypeName='Zone Office'
        this.unitId=this.zoneUnitId
        this.disUnitTypeId=0;
        this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }else if(this.overAllCityId > 0){
        this.unitTypeName='OverAllCity'
        this.unitId=0;
        this.disUnitTypeId=0;
        this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])

      }else if(this.cityUnitId > 0){
        this.unitTypeName='City Office'
        this.unitId=this.cityUnitId
        this.disUnitTypeId=6;
        this.router.navigate(['/pr-tabledata', this.disUnitTypeId, this.unitId,this.unitTypeName,this.totalprminorsection])
      }
      else{
        const usertypeId = this.route.snapshot.params['usertypeId'];
      const unitid = this.route.snapshot.params['unitid'];
      const unitTypeName = this.route.snapshot.params['unitTypeName']; 
      this.router.navigate(['/pr-tabledata', usertypeId, unitid,unitTypeName,this.totalprminorsection]);
      }

  }

  setHoverState(card: string, state: string) {
    this.cardStates[card] = state;
  }

  cityclick() {
    this.isCitySelected = true;
    this.selectedZone=null;
    this.selectedZones=null;
    this.isDistrictSelected =false;
    this.isPrCountsSelected = false;
    this.zoneGrid=false;
    this.cityGrid = true;
    this.rangeGrid=false;
    this.distGrid=false;
    this.unitTypeName='City'
    this.overAllCityId=1;
    this.userNames='';
    // this.totalMinorPrCount=this.cityMinorPRCount;
    this.loginService.cheifOfficeDashboard(this.userTypeId,this.unitId,this.unitTypeName).subscribe(
      (response) => { 
        this.cities=response;
        if (response && response.length > 0) {
          
          this.cityMinorPRCount = response.reduce((total :any, item: any) => {
            return total + item.cityPrCount;  
          }, 0);
          this.totalPR3A = response.reduce((total :any, item: any) => {
            return total + item.minorPr3ACount;  
          }, 0);
          this.totalPR17A = response.reduce((total :any, item: any) => {
            return total + item.minorPr17ACount;  
          }, 0);
          this.totalMinorPrCount = this.totalPR3A + this.totalPR17A;
        }
      })
  }
}
