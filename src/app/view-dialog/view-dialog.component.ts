import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { LogInService } from '../log-in.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-dialog',
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './view-dialog.component.html',
  styleUrl: './view-dialog.component.css',
  providers:[LogInService]
})
export class ViewDialogComponent {


  elementData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private logInService:LogInService,private route: ActivatedRoute) {
    console.log('Received data:', this.data); // Debugging

    if(data){
debugger
      this.logInService.minprViewById(data).subscribe(
          
        res=>{
          debugger
              this.elementData=res;

        }


      );
    }


  }


ngOnInit(){

  
}
  
  
  // constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  fields = [

    { label: 'Name', key: 'delnquenceName' },
    { label: 'Section', key: 'prSectionNo' },
    { label: 'PR No', key: 'prNo' },
    { label: 'year', key: 'year' },
    { label: 'Rank No', key: 'delnquenceRankNo' },
    { label: 'Rank', key: 'delnquenceRankMaster' },
    { label: 'IFHRMS No', key: 'ifhrmsNo' },
    { label: 'Date of Birth', key: 'dateOfBirth' },
    { label: 'Date of Enlistment', key: 'dateOfEnlishment' },
    { label: 'Date of Retirement', key: 'dateOfRetiredment' },
    { label: 'Working Place', key: 'presentWorkingPlace' },
    { label: 'Joining Date', key: 'dateOfJoiningInPresentPost' },
    { label: 'Mobile No', key: 'mobileNo' },
    { label: 'No. of PR', key: 'noOfPRsofar' },
    { label: 'Date of Occurrence', key: 'dateOfOccurance' },
    { label: 'Place of Occurrence', key: 'placeOfOccurance' },
    { label: 'Count of Charges', key: 'countOfChargeslist' },
    { label: 'SCN Approved Date', key: 'sCNApprovedDate' },
    { label: 'SCN Approved Remarks', key: 'sCNApprovedDateRemark' },
    { label: 'SCN Approved Upload File', key: 'sCNApprovedDateFilename' },
    { label: 'SCN Acknowledge Date', key: 'sCNAckDate' },
    { label: 'SCN Acknowledge Remarks', key: 'sCNAckDateRemarks' },
    { label: 'sCNAckDateFile', key:'sCNAckDateFile' },
    { label: 'Date of Explanation', key: 'dateOfExplanation' },
    { label: 'Date of Explanation Remarks', key: 'dateOfExplanationRemarks' },
    { label: 'Date of Explanation Upload File', key: 'dateOfExplanationFileName' },
    { label: 'Date of Final Order', key: 'dateOfFinalOrder' },
    { label: 'Date of Final Remarks', key: 'dateOfFinalOrderRemarks' },
    { label: 'Date of Final Upload File', key: 'dateOfFinalOrderFileName' },
    { label: 'Details of Punishment', key: 'detailsOfPunishment' },
    { label: 'Details of Punishment Remarks', key: 'detailsOfPunishment' },
    { label: 'Details of Punishment Upload File', key: 'detailsOfPunishmentFileName' },
    { label: 'Remarks', key: 'remarks' }
  ];

  // formatValue(value: any, key?: string): string {
  //   if (!value) return 'N/A';
  
  //   // File name fields should not be formatted as dates
  //   const fileFields = [
  //     'sCNApprovedDateFilename',
  //     'sCNAckDateFile',
  //     'dateOfExplanationFileName',
  //     'dateOfFinalOrderFileName',
  //     'detailsOfPunishmentFileName'
  //   ];
    
  //   if (fileFields.includes(key!)) {
  //     return value; // Directly return filename (avoid date conversion)
  //   }
  
  //   // Check if value is a valid date
  //   if (typeof value === 'string' && value.includes('T')) {
  //     const date = new Date(value);
  //     if (isNaN(date.getTime())) return 'Invalid Date'; // Handle invalid date cases
  
  //     // Convert to "dd/MM/yyyy" format
  //     const day = String(date.getDate()).padStart(2, '0');
  //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  //     const year = date.getFullYear();
  
  //     return `${day}/${month}/${year}`;
  //   }
  
  //   return Array.isArray(value) ? value.join(', ') : value;
  // }  


  formatValue(value: any, key?: string): string {
    if (!value) return 'N/A';

    // Handle array of objects (e.g., countOfChargeslist)
    if (Array.isArray(value) && typeof value[0] === 'object') {
      return value.map((obj) => {
        return Object.entries(obj)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ');
      }).join(' | ');
    }

    // Handle file name fields
    const fileFields = [
      'sCNApprovedDateFilename',
      'sCNAckDateFile',
      'dateOfExplanationFileName',
      'dateOfFinalOrderFileName',
      'detailsOfPunishmentFileName',
    ];

    if (fileFields.includes(key!)) {
      return value;
    }

    // Check if value is a valid date
    if (typeof value === 'string' && value.includes('T')) {
      const date = new Date(value);
      if (isNaN(date.getTime())) return 'Invalid Date';

      // Convert to "dd/MM/yyyy" format
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    }

    return Array.isArray(value) ? value.join(', ') : value;
  }
  

}