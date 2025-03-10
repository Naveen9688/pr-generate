import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { PrSourceService } from '../pr-source.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-totalprs',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    StaticHeaderComponent,NgIf
],
  templateUrl: './totalprs.component.html',
  styleUrl: './totalprs.component.css'
})
export class TotalprsComponent {

  @ViewChild(MatPaginator) minorPaginator!: MatPaginator;
  @ViewChild(MatPaginator) majorPaginator!: MatPaginator;
  elementData: any;
  delnquenceRankMaster: any;
  usertype: any;
  unitid: any;
  unitTypeName: any;
  name: any;
  prSectionNo: any;

  constructor(private cd: ChangeDetectorRef,private prSourceService: PrSourceService,private route: ActivatedRoute,public dialog: MatDialog, private router: Router) {}

  minorDataSource = new MatTableDataSource<any>([]);
  majorDataSource = new MatTableDataSource<any>([]);
  dataSource = new MatTableDataSource<any>([]);
  
  // minorDisplayedColumns: string[] = ['SNo', 'prNo', 'section', 'unitShortcode','name', 'action'];
  // majorDisplayedColumns: string[] = ['SNo', 'prNo', 'section', 'unitShortcode','name', 'action'];

  minorDisplayedColumns: string[] = ['SNo', 'prNo', 'year', 'unitShortcode', 'currentPendingSequenceName', 'action'];
  majorDisplayedColumns: string[] = ['SNo','prNo','year', 'unitShortcode','rankNo', 'action'];

  ngOnInit(): void {
    // this.minorDataSource.data = this.getMinorMockData();
    // this.majorDataSource.data = this.getMajorMockData();

    this.minorDataSource.paginator = this.minorPaginator;
    this.majorDataSource.paginator = this.majorPaginator;

    this.route.params.subscribe(params => {
      const ifhrmsNo = params['ifhrmsNo'] || '';       // Retrieve the 'value' parameter
      

      debugger
      this.prSourceService.totalprview(ifhrmsNo).subscribe(
        (response) => {
          if (response && Array.isArray(response) && response.length > 0) {
            debugger;
            this.elementData = response;
            const hasRankNo = response.some(e => e.delnquenceRankNo);
      if (hasRankNo && !this.minorDisplayedColumns.includes('rankNo')) {
        this.minorDisplayedColumns.splice(this.minorDisplayedColumns.length - 1, 0, 'rankNo');
      }
            
            const lastIndex = this.elementData.length - 1; 
            this.name = this.elementData[lastIndex].delnquenceName;
            this.prSectionNo = this.elementData[lastIndex].prSectionNo;
            this.delnquenceRankMaster = this.elementData[lastIndex].delnquenceRankMaster;
            this.prSectionNo = this.elementData[lastIndex].prSectionNo;
            this.cd.detectChanges();
          }
          else {
            alert('Invalid credentials. Please try again.');
          }
        },
      );
    });
  }

  onView(element: any): void {
    debugger;
    this.dialog.open(ViewDialogComponent, {
      width: '600px',
      data: element, // Pass the row data to the dialog
    });
    console.log('View clicked', element); // Log to verify
  }
  
  // View action handler
  viewDetails(row: any) {
    console.log('View details for: ', row);
  }

  goBack() {
  //   this.usertype=sessionStorage.getItem('usertype');
  //     this.unitid=sessionStorage.getItem('unitid');
  //     this.unitTypeName=sessionStorage.getItem('loginUnitTypeName');
  //   // this.router.navigate([`/pr-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
  //   if(this.unitTypeName==="Range Office"){
  //     this.router.navigate([`/pr-range-dashBoard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
  //   }else{
  //     this.router.navigate([`/pr-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]); 
  //   }
  // }
  this.usertype=sessionStorage.getItem('usertype');
      this.unitid=sessionStorage.getItem('unitid');
      this.unitTypeName=sessionStorage.getItem('loginUnitTypeName');
    // this.router.navigate([`/pr-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
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
