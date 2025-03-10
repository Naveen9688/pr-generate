import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MajorViewDialogComponent } from '../major-view-dialog/major-view-dialog.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { StaticHeaderComponent } from '../static-header/static-header.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LogInService } from '../log-in.service';
import { MajorPrSourceService } from '../major-pr-source.service';

@Component({
  selector: 'app-major-pr-tabledata',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    StaticHeaderComponent,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './major-pr-tabledata.component.html',
  styleUrl: './major-pr-tabledata.component.css'
})
export class MajorPrTabledataComponent implements OnInit {

  section: string = '';
  element: any;
  usertype: any;
  unitid: any;
  unitTypeName: any;
  isEditButtonDisabled: boolean = true;
  pendingSequenceId:any;
  value:any;
  lastModifiedId: any;
  modifiedDate: any;
  createdDate: any;
  selectedPunishment: any;
  ranklist: any;
  totalmajorprlist: any;
  totalmajorprifhrms: any;
  totalmajorprno: any;
  totalmajoryear: any;
  totalmajorprRankNo: any;
  delnquenceName: any;
  ifhrmsNo: any;

  constructor(private majorPrSourceService: MajorPrSourceService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog, private route: ActivatedRoute, private loginService: LogInService, private router: Router) { }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);

  prNo: string = '';
  year: string = '';


  displayedColumns: string[] = [
    'SNo', 'prSectionNo', 'prNo', 'year', 'shortcode', 'name', 'ifhrmsNo', 'rank', 'rankNo', 'dob', 'doe', 'dor', 'workingPlace',
    'joiningDate', 'mobileNo', 'noOfPR', 'dateOfOccurrence', 'placeOfOccurrence','currentPendingSequenceName' ,'actions'

  ];

  maxPrId: number = 0;

  ngOnInit(): void {
    debugger

    this.majorPrSourceService.ranklist(this.selectedPunishment).subscribe(
      (response) => {
debugger
        if (response && response.length > 0) {
          this.ranklist = response;


        }
        else {
          // alert('Invalid credentials. Please try again.');
        }
      },

    );
  
    this.route.params.subscribe(params => {
      const value = params['value'] || '';       
      this.usertype = params['usertypeId'];
      this.unitid = params['unitid'];
      this.unitTypeName = params['unitTypeName'];


      if(this.unitTypeName==="Range Office"){
        this.isEditButtonDisabled=false;
      }else if(this.unitTypeName==="Dist"){
        this.isEditButtonDisabled=true;
      }else if(this.unitTypeName==="Zone Office"){
        this.isEditButtonDisabled=false;
      }else if(this.unitTypeName==="Dist Office"){
        this.unitTypeName="Dist";
        this.isEditButtonDisabled=false;
      }else if(this.unitTypeName==="City Office"){
        this.unitTypeName="City";
        this.isEditButtonDisabled=false;
      }else if(this.unitTypeName==="CheifOffice Officers"){
        this.isEditButtonDisabled=false;
      }else if(this.unitTypeName==="City"){
        this.isEditButtonDisabled=true;
      }else if(this.unitTypeName==="Chief All Zone Office"){
        this.isEditButtonDisabled=false;
      }else if(this.unitTypeName==="OverAllCity"){
        this.isEditButtonDisabled=false;
      }

      this.loginService.majorprlist(this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
        (response) => {
          debugger

          if (response) {
            this.totalmajorprlist=response;
            this.totalmajorprifhrms=response;
            this.totalmajorprno=response;
            this.totalmajoryear=response;
            this.totalmajorprRankNo=response;
            this.section = response.prSectionNo;
            this.dataSource.data = response;
            this.section = response.prSectionNo;
            const latestItem = this.dataSource.data.reduce((prev, current) => {
              const prevDate = Math.max(
                new Date(prev.createdDate).getTime(),  
                new Date(prev.modifiedDate).getTime()  
              );
              const currentDate = Math.max(
                new Date(current.createdDate).getTime(),  
                new Date(current.modifiedDate).getTime() 
              );
          
              return prevDate > currentDate ? prev : current; 
            });

            this.lastModifiedId = latestItem ? latestItem.majorPrId : null;

            // Change detection trigger
            this.changeDetector.detectChanges();

          }
          else {
            alert('Invalid credentials. Please try again.');
          }
        },
      );


    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  isArray(value: any): boolean {
    return Array.isArray(value);
  }


  onEdit(majorPrIdss: any, prSectionNo: any): void {
    debugger
    if (!prSectionNo) {
      console.error('prSectionNo is required but was not provided');
      return; // Exit if prSectionNo is missing
    }

    this.majorPrSourceService.getEdit(majorPrIdss).subscribe(
      (response) => {
        debugger
        console.log(response);
        this.router.navigate([`/major-pr-generate/${majorPrIdss}/${prSectionNo}`]);
      },




      (error) => {
        console.error('Error fetching edit flow data', error);
      }
    );

    this.majorPrSourceService.getEditranklist(prSectionNo).subscribe(
      (response) => {
        debugger
        console.log(response);
      },


      (error) => {
        console.error('Error fetching edit flow data', error);
      }
    );
  }


  totalPRs(ifhrmsNo: any) {
    this.router.navigate([`/totalprs/${ifhrmsNo}`]);
  }

  onMajorView(element: any): void {
    this.dialog.open(MajorViewDialogComponent, {
      width: '600px',
      data: element
    });
    console.log('View clicked', element);
  }


  onSearch(): void {
    debugger
    const searchCriteria = {
      prNo: this.prNo,
      year: this.year,
      pendingSequenceNo:this.pendingSequenceId,
      unitTypeId:this.usertype,  
      allUnitsId:this.unitid,
      userTypeName:this.unitTypeName,
      prSectionNo:this.value,
      delnquenceName:this.delnquenceName,
      ifhrmsNo:this.ifhrmsNo 
    };

    this.majorPrSourceService.getSearchResults(searchCriteria).subscribe(
      (data) => {
        if(data){
        this.dataSource.data = data;
      }else{
        alert('No data found');
      }
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  onFieldSelect(value: any) {
 
  }
  allList(){
    this.loginService.majorprlist(this.value,this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        debugger

        if (response) {
          this.section = response.prSectionNo;
          this.dataSource.data = response;


          this.section = response.prSectionNo;

          // Change detection trigger
          this.changeDetector.detectChanges();

        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  }

  isRecentlyModified(modifiedDate: any): boolean {
    if (!modifiedDate) return false;
  
    const modifiedTime = new Date(modifiedDate).getTime();
    const currentTime = new Date().getTime();
    const diffInMinutes = (currentTime - modifiedTime) / (1000 * 60); // Minutes conversion
  
    return diffInMinutes <= 5; // Only highlight if modified in the last 5 minutes
  }

  goBack() {
    this.usertype=sessionStorage.getItem('usertype');
      this.unitid=sessionStorage.getItem('unitid');
      this.unitTypeName=sessionStorage.getItem('loginUnitTypeName');
    if(this.unitTypeName==="Range Office"){
      this.router.navigate([`/pr-range-dashBoard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
    }else if (this.unitTypeName==="Dist" || this.unitTypeName==="City"){
      this.router.navigate([`/pr-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
    }else if(this.unitTypeName==="Zone Office"){
      this.router.navigate([`/pr-zone-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.router.navigate([`/chief-office-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
    }
    
    // else{
    //   this.router.navigate([`/pr-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]); 
  
    // }
  }
}
