import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { LogInService } from '../log-in.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-major-view-dialog',
  imports: [
    MatDialogModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './major-view-dialog.component.html',
  styleUrl: './major-view-dialog.component.css'
})
export class MajorViewDialogComponent {
  elementData: any;
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private logInService:LogInService,private route: ActivatedRoute) {
      console.log('Received data:', this.data); // Debugging
  
      if(data){
  debugger
        this.logInService.majorprViewById(data).subscribe(
          res=>{
            debugger
            console.log('Received data:', res); // Debugging
                this.elementData=res;
                debugger
          }
        );
      }
    }
  
  ngOnInit(){ 
  }
    
    fields = [
      { label: 'PR No', key: 'prNo' },
      { label: 'Section', key: 'prSectionNo' },
      { label: 'Name', key: 'delnquenceName' },
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

      { label: 'Charge Memo Approved Date', key: 'chargeMemoApprovedDate' },
      { label: 'Charge Memo Approved Date Remarks', key: 'chargeMemoApprovedDateRemarks' },
      { label: 'Charge Memo Approved Date Upload File', key: 'chargeMemoApprovedDateUploadFileName' },

      { label: 'Charge Memo Acknowledged Date', key: 'chargeMemoAcknowledgedDate' },
      { label: 'Charge Memo Acknowledged Date Remarks', key: 'chargeMemoAcknowledgedDateRemarks' },
      { label: 'Charge Memo Acknowledged Date Upload File', key: 'chargeMemoAcknowledgedDateuploadFileName' },

      { label: 'Date of Defence Statement', key: 'dateOfDefenceStatement' },
      { label: 'Date of Defence Statement Remarks', key: 'dateOfDefenceStatementRemarks' },
      { label: 'Date of Defence Statement Upload File', key: 'dateOfDefenceStatementuploadFileName' },

      { label: 'Date of Appointment Of Enquiry Officer', key: 'dateOfAppointmentOfEnquiryOfficer' },
      { label: 'Date of Appointment Of Enquiry Officer Remarks', key: 'dateOfAppointmentOfEnquiryOfficerRemarks' },
      { label: 'Date of Appointment Of Enquiry Officer Upload File', key: 'dateOfAppointmentOfEnquiryOfficeruploadFileName' },

      { label: 'Date of Enquiry Officer', key: 'dateOfEnquiryOfficer' },
      { label: 'Date of Enquiry Officer Remarks', key: 'dateOfEnquiryOfficerRemarks' },
      { label: 'Date of Enquiry Officer Upload File', key: 'dateOfEnquiryOfficeruploadFileName' },

      { label: 'Date of Minutes Drawn', key: 'dateOfMinutesDrawn' },
      { label: 'Date of Minutes Drawn Remarks', key: 'dateOfMinutesDrawnRemarks' },
      { label: 'Date of Minutes Drawn Upload File', key: 'dateOfMinutesDrawnuploadFileName' },

      { label: 'Date of FR Calling Memo Along With Minute', key: 'dateOfFrCallingMemoAlongWithMinute' },
      { label: 'Date of FR Calling Memo Along With Minute Remarks', key: 'dateOfFrCallingMemoAlongWithMinuteRemarks' },
      { label: 'Date of FR Calling Memo Along With Minute Upload File', key: 'dateOfFrCallingMemoAlongWithMinuteuploadFileName' },

      { label: 'Date of Serving of Minute', key: 'dateOfServingOfMinute' },
      { label: 'Date of Serving of Minute Remarks', key: 'dateOfServingOfMinuteRemarks' },
      { label: 'Date of Serving of Minute Upload File', key: 'dateOfServingOfMinuteuploadFileName' },

      { label: 'Date of FR Furnished', key: 'dateOfFrFurnished' },
      { label: 'Date of FR Furnished Remarks', key: 'dateOfFrFurnishedRemarks' },
      { label: 'Date of FR Furnished Upload File', key: 'dateOfFrFurnisheduploadFileName' },
      
      { label: 'Date of Final Order', key: 'dateOfFinalOrder' },
      { label: 'Date of Final Order Remarks', key: 'dateOfFinalOrderRemarks' },
      { label: 'Date of Final Order Upload File', key: 'dateOfFinalOrderuploadFileName' },

      { label: 'Details of Punishment', key: 'detailsOfPunishment' },
      { label: 'Details of Punishment Remarks', key: 'detailsOfPunishmentRemarks' },
      { label: 'Details of Punishment Upload File', key: 'detailsOfPunishmentUploadFileName' },
      { label: 'Remarks', key: 'remarks' }
    ];
  

    formatValue(value: any, key?: string) {
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
        'chargeMemoApprovedDateUploadFileName',
        'chargeMemoAcknowledgedDateuploadFileName',
        'dateOfDefenceStatementuploadFileName',
        'dateOfEnquiryOfficeruploadFileName',
        'dateOfMinutesDrawnuploadFileName',
        'dateOfFrCallingMemoAlongWithMinuteuploadFileName',
        'dateOfServingOfMinuteuploadFileName',
        'dateOfFrFurnisheduploadFileName',
        'dateOfFinalOrderuploadFileName',
        'detailsOfPunishmentUploadFileName',
        'dateOfAppointmentOfEnquiryOfficeruploadFileName',
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
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = date.getFullYear();
  
        return `${day}/${month}/${year}`;
      }

      return Array.isArray(value) ? value.join(', ') : value;
  }
}
