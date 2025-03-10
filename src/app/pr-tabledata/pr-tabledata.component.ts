import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PrSourceService } from '../pr-source.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LogInService } from '../log-in.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule } from '@angular/forms';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { animate, style, transition, trigger } from '@angular/animations';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-pr-tabledata',
  imports: [
    // BrowserModule,
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
    MatListModule,
    StaticHeaderComponent,
    MatSelectModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatCardModule
],
  templateUrl: './pr-tabledata.component.html',
  styleUrl: './pr-tabledata.component.css',
  animations: [
    trigger('clickAnimation', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('200ms ease-out', style({ transform: 'scale(1.1)', opacity: 1 })),
        animate('100ms ease-in', style({ transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class PrTabledataComponent implements OnInit {
// this.dataSource.sort = this.sort;
// this.dataSource.data = this.tableData;
// this.dataSource.paginator = this.paginator;
// this.dataSource.sort = this.sort;
// const savedData = this.prSourceService.getData();
// this.dataSource.data = savedData;

// createdDate: number = 0;
  lastModifiedId: number | null = null;
  item: string = '';
  value:any;
  section: string = '';
  element: any;
  usertype: any;
  autodelnquenceRankNo: any;
  unitid: any;
  unitTypeName: any;
  isEditButtonDisabled: boolean = true;
  pendingSequenceId:any;
  modifiedDate: any;
  createdDate: any;
  ifhrmsNo: any;
  rankname:any;
  presentWorkingPlace: any;
  delnquenceName: any;
  totalminprlist: any;
  filteredList: any;
  searchText: string = '';
  filteredListIfhrmsNo: any;
  totalminprifhrms: any;
  totalminprno: any;
  filteredListprno: any;
  totalminyear: any;
  delnquenceRankMaster:any;
  filteredListyear: any;
  delnquenceRankNo: any;
  totalminprRankNo: any;
  filteredRankList:any;
  selectedPunishment: any;
  filteredListprRankNo: any;
  ranklist: any;
  pendingSequenceNo: any;
  rankid: any;
  totalprminorsection: any;
  delnquenceRankMasterId: any;
  isClicked = false;
  constructor(private prSourceService: PrSourceService, private changeDetector: ChangeDetectorRef, public dialog: MatDialog, private route: ActivatedRoute, private loginService: LogInService, private router: Router) { }

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
   
 
  prNo: string = '';
  year: string = '';
  


  displayedColumns: string[] = [
    'SNo', 'prSectionNo', 'prNo',  'name', 'ifhrmsNo', 'rank', 'dob', 'doe', 'workingPlace',
     'mobileNo','currentPendingSequenceName' ,'actions'

  ];

  maxPrId: number = 0;


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.value = params['value'] || '';      
      this.usertype = params['usertypeId'];
      this.unitid = params['unitid'];
      this.unitTypeName = params['unitTypeName'];
      this.totalprminorsection = params['totalprminorsection'];

if(this.value===""){
    this.prSourceService.ranklist(this.selectedPunishment).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.ranklist = response;
        }
        else {
          // alert('Invalid credentials. Please try again.');
        }
      },

    );
  }else{
    this.selectedPunishment=this.value;
    this.prSourceService.ranklist(this.selectedPunishment).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.ranklist = response;
        }
        else {
          // alert('Invalid credentials. Please try again.');
        }
      },
    );
  }

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
      
      this.loginService.minprlist(this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
        (response) => {
          if (response) {
            this.totalminprlist=response;
            this.totalminprifhrms=response;
            this.totalminprno=response;
            this.totalminyear=response;
            this.totalminprRankNo=response;
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
            this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
            // Change detection trigger
            this.changeDetector.detectChanges();
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

    // const savedData = this.prSourceService.getData();
    // this.dataSource.data = savedData;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    // this.dataSource.data = this.tableData;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // const savedData = this.prSourceService.getData();
    // this.dataSource.data = savedData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

minlist(value: any) {

}
  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  // onEdit(minorPrIdss: any,prSectionNo:any): void {

  //   this.prSourceService.getEditFlowData(minorPrIdss,prSectionNo).subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.router.navigate([`/new-pr-generato/${minorPrIdss}`]);
  //     });
  // }


  onEdit(minorPrIdss: any, prSectionNo: any): void {
    if (!prSectionNo) {
      console.error('prSectionNo is required but was not provided');
      return; // Exit if prSectionNo is missing
    }

    this.prSourceService.getEdit(minorPrIdss).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate([`/new-pr-generato/${minorPrIdss}/${prSectionNo}`]);
      },

      (error) => {
        console.error('Error fetching edit flow data', error);
      }
    );

    this.prSourceService.getEditranklist(prSectionNo).subscribe(
      (response) => {
        console.log(response);
        // this.router.navigate([`/new-pr-generato/${minorPrIdss}`]);
      },
      (error) => {
        console.error('Error fetching edit flow data', error);
      }
    );
  }


  totalPRs(ifhrmsNo: any) {
    this.router.navigate([`/totalprs/${ifhrmsNo}`]);
  }

  onView(element: any): void {
    this.dialog.open(ViewDialogComponent, {
      width: '600px',
      data: element
    });
    console.log('View clicked', element);
  }


  onSearch(): void {
    this.isClicked = true;
    setTimeout(() => {
      this.isClicked = false;
    }, 300);
    this.delnquenceRankMaster = this.rankname
    this.prSourceService.getSearchdelnquenceRankMaster(this.delnquenceRankMaster,this.totalprminorsection).subscribe(
      (data) => {
        if(data){
        this.rankid=data.rankid;
        
        }else{
          // alert('No data found');
        }
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
    
   this.delnquenceRankMasterId=this.rankid;
      const searchCriteria = {
      prNo: this.prNo,
      year: this.year,
      pendingSequenceNo:this.pendingSequenceId,
      unitTypeId:this.usertype,  
      allUnitsId:this.unitid,
      userTypeName:this.unitTypeName,
      prSectionNo:this.value,
      delnquenceName:this.delnquenceName,
      ifhrmsNo:this.ifhrmsNo,
      delnquenceRankNo:this.delnquenceRankNo,
      delnquenceRankMasterId:this.delnquenceRankMasterId
    };
    this.prSourceService.getSearchResults(searchCriteria).subscribe(
      (data) => {
        if(data){
        this.dataSource.data = data;
        }else{
          // alert('No data found');
        }
      },
      (error) => {
        console.error('Error fetching search results:', error);
      }
    );
  }

  onFieldSelect(selectedValue: any) {
    this.pendingSequenceNo = selectedValue; 

    this.route.params.subscribe(params => {
      this.value = params['value'] || '';      
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
      }else if(this.unitTypeName==="City"){
        this.isEditButtonDisabled=true;
      }else if(this.unitTypeName==="CheifOffice Officers"){
        this.isEditButtonDisabled=false;
      }
       
      this.loginService.minprsearchpendingSequenceNo(this.pendingSequenceNo,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
        (response) => {
          if (response) {
            this.totalminprlist=response;
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
            this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
            this.changeDetector.detectChanges();
          }
          else {
            alert('Invalid credentials. Please try again.');
          }
        },
      );
    });
    


  }
  allList(){
    this.loginService.minprlist(this.value,this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
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
      // (error) => {
      //   console.error('Login failed:', error);
      //   alert('An error occurred during login. Please try again later.');
      // }
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

  filterList() {
  this.filteredList = this.totalminprlist
  .map((item: any) => item?.delnquenceName || '') // ✅ Extract 'name' property if object
  .filter((delnquenceName: string) => delnquenceName.toLowerCase().includes(this.delnquenceName.toLowerCase()));
}


selectItem(selectedValue: string) {
  this.route.params.subscribe(params => {
    this.value = params['value'] || '';      
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
    }else if(this.unitTypeName==="City"){
      this.isEditButtonDisabled=true;
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.isEditButtonDisabled=false;
    }
    this.loginService.minprsearchlists(selectedValue,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        if (response) {
          this.totalminprlist=response;
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
          this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
          this.changeDetector.detectChanges();
        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  });
}

// filterIfhrmsNo() {
//   debugger;
//   this.filteredList = this.totalminprlist
//     .filter((item: any) => 
//       item?.ifhrmsNo?.toString().includes(this.ifhrmsNo.toString())
//     );
// }

// filterIfhrmsNo() {
//   debugger
//   if (this.ifhrmsNo) {
//     debugger
//     this.filteredListIfhrmsNo = this.totalminprifhrms
//     .map((item: any) => item?.ifhrmsNo?.toString() || '') 
//     .filter((ifhrmsNo: string) => ifhrmsNo.includes(this.ifhrmsNo));
    
//   } else {
//     debugger
//     this.filteredListIfhrmsNo = [...this.totalminprifhrms]; // Input காலியாக இருந்தால் Original list-ஐ காட்டவும்
//   }
// }

filterIfhrmsNo() {
  if (this.ifhrmsNo && this.totalminprifhrms) {
    this.filteredListIfhrmsNo = this.totalminprifhrms.filter((item: any) =>
      item.ifhrmsNo.toString().toLowerCase().includes(this.ifhrmsNo.toLowerCase())
    );
  } else {
    this.filteredListIfhrmsNo = [...this.totalminprifhrms]; // Input காலியாக இருந்தால் Original list-ஐ காட்டவும்
  }
}





filterrank(rankname: string): void {
  if (!rankname) {
    this.filteredRankList = this.ranklist;
    return;
  }
  this.filteredRankList = this.ranklist.filter((item: any) => 
    item.rankname.toLowerCase().includes(rankname.toLowerCase())
  );
}

filterdelnquenceRankNo(){
  if (this.delnquenceRankNo && this.totalminprRankNo) {
    this.filteredListprRankNo = this.totalminprRankNo.filter((item: any) =>
      item.delnquenceRankNo.toString().toLowerCase().includes(this.delnquenceRankNo.toLowerCase())
    );
  } else {
    this.filteredListprRankNo = [...this.totalminprRankNo]; // Input காலியாக இருந்தால் Original list-ஐ காட்டவும்
  }
}


// filterdelnquenceRankNo(){
//   debugger
//   if (this.delnquenceRankNo && this.totalminprRankNo) {
//     debugger
//     this.filteredListprRankNo= this.totalminprRankNo
//     .map((item: any) => item?.prNo?.toString() || '') 
//     .filter((delnquenceRankNo: string) => delnquenceRankNo.includes(this.delnquenceRankNo));
//   } else {
//     this.filteredListprRankNo = [...this.totalminprRankNo];
//   }
// }


filterprno(){
  if (this.prNo && this.totalminprno) {
    this.filteredListprno= this.totalminprno
    .map((item: any) => item?.prNo?.toString() || '') 
    .filter((prNo: string) => prNo.includes(this.prNo));
  } else {
    this.filteredListIfhrmsNo = [...this.totalminprlist];
  }
}


filteryear() {
  if (this.year && this.totalminyear) {
    this.filteredListyear = this.totalminyear
      .filter((item: any) => item.year.toString().includes(this.year));
  } else {
    this.filteredListyear = [...this.totalminyear]; // Input காலியாக இருந்தால் Original list-ஐ காட்டவும்
  }
}


// filteryear(){
//   debugger
//   if (this.year && this.totalminyear) {
//     debugger
//     this.filteredListyear= this.totalminyear
//     .map((item: any) => item?.year?.toString() || '') 
//     .filter((year: string) => year.includes(this.year));
//   } else {
//     this.filteredListyear = [...this.totalminyear]; 
//   }
// }

selectItemprno(selectedValue: string) {
  this.prNo = selectedValue; 

  this.route.params.subscribe(params => {
    this.value = params['value'] || '';      
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
    }else if(this.unitTypeName==="City"){
      this.isEditButtonDisabled=true;
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.isEditButtonDisabled=false;
    }
    this.loginService.minprsearchprNolist(this.prNo,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        if (response) {
          this.totalminprlist=response;
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
          this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
          this.changeDetector.detectChanges();
        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  });

}

selectItemyear(selectedValue: string){
    this.year = selectedValue; 
    this.route.params.subscribe(params => {
    this.value = params['value'] || '';      
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
    }else if(this.unitTypeName==="City"){
      this.isEditButtonDisabled=true;
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.isEditButtonDisabled=false;
    }
    
    this.loginService.minprsearchlistyear(this.year,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        if (response) {
          this.totalminprlist=response;
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
          this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
          this.changeDetector.detectChanges();
        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  });
}


selectItempresentWorkingPlace(selectedValue: string) {
  this.presentWorkingPlace = selectedValue;

}

selectrank(selectedValue: string) {
    this.rankname = selectedValue; 
    this.route.params.subscribe(params => {
    this.value = params['value'] || '';      
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
    }else if(this.unitTypeName==="City"){
      this.isEditButtonDisabled=true;
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.isEditButtonDisabled=false;
    }

    this.loginService.minprsearchrank(this.rankname,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        if (response) {
          this.totalminprlist=response;
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
          this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
          this.changeDetector.detectChanges();
        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  });
  
}

selectItems(selectedValue: string) {
    this.ifhrmsNo = selectedValue; 
    this.route.params.subscribe(params => {
    this.value = params['value'] || '';      
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
    }else if(this.unitTypeName==="City"){
      this.isEditButtonDisabled=true;
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.isEditButtonDisabled=false;
    }

    this.loginService.minprsearchlist(this.ifhrmsNo,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        if (response) {
          this.totalminprlist=response;
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
          this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
          this.changeDetector.detectChanges();
        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  });
}
selectItemrankno(selectedValue: string) {
    this.delnquenceRankNo = selectedValue; 
    this.route.params.subscribe(params => {
    this.value = params['value'] || '';      
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
    }else if(this.unitTypeName==="City"){
      this.isEditButtonDisabled=true;
    }else if(this.unitTypeName==="CheifOffice Officers"){
      this.isEditButtonDisabled=false;
    }
    
    this.loginService.minprsearchrankno(this.delnquenceRankNo,this.value, this.usertype, this.unitid, this.unitTypeName).subscribe(
      (response) => {
        if (response) {
          this.totalminprlist=response;
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
          this.lastModifiedId = latestItem ? latestItem.minorPrId : null;
          this.changeDetector.detectChanges();
        }
        else {
          alert('Invalid credentials. Please try again.');
        }
      },
    );
  });
}
}