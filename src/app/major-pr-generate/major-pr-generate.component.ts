import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MajorPrSourceService } from '../major-pr-source.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { StaticHeaderComponent } from "../static-header/static-header.component";

@Component({
  selector: 'app-major-pr-generate',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatTooltipModule,
    StaticHeaderComponent
],
  templateUrl: './major-pr-generate.component.html',
  styleUrl: './major-pr-generate.component.css'
})
export class MajorPrGenerateComponent {

  isReadonly: boolean = false;
  @ViewChild('stepper') stepper!: MatStepper;
  delinquentFormGroup!: FormGroup;
  updateSequenceFormGroup: FormGroup;
  prForm: FormGroup;
  delinquencyDetailInput = new FormControl<string>('', [Validators.required,Validators.maxLength(300)]);
  selectedField: string = '';
  selectedPunishment!: string;
  RankselectedField: string='';
  RankNameId: any;
  mobileNo:any;
  StationSelect:any;
  detailsOfPunishmentUploadFile!:File | null;
  dateOfFinalOrderuploadFile!:File | null;
  dateOfFrFurnisheduploadFile!:File | null;
  dateOfServingOfMinuteuploadFile!:File | null;
  dateOfFrCallingMemoAlongWithMinuteuploadFile!:File | null;
  dateOfMinutesDrawnuploadFile!:File | null;
  dateOfEnquiryOfficeruploadFile!:File | null;
  dateOfAppointmentOfEnquiryOfficeruploadFile!:File | null;
  dateOfDefenceStatementuploadFile!:File | null;
  chargeMemoAcknowledgedDateuploadFile!:File | null;
  chargeMemoApprovedDateUploadFile!:File | null;
  appealOrderFile!: File | null;
  prNo: string = '';
  exPr: string ='';  
  crNo: string ='';  
  punishmentType:String ='';
  sectionType:String ='';
  delnquenceRankMaster: string = '';
  showAdditionalFields: boolean = false;
  uploadedFileNames: { [key: string]: string } = {};
  usertypeId: any;
  unitId:any;
  stationList: any[] = [];
  ranklist: any[] = [];
  noOfPRsofar: any;
  majorPrId:any;
  majorPrIdss:any;
  delnquenceName:any;
  isEditing:boolean=false;
  editingCountIndex: number | null = null;
  prSectionNo: any;
  // uploadedFileNames: { [key: string]: string } = {};
  fileUploadError: string | null = null;
  dateOfBirth: any;
  dateOfEnlishment: any;
  delnquenceRankMasterId: any;
  chargeMemoApprovedDate!: Date;
  minDate!: Date;
  minEnlistmentDate: Date | null = null;
  minJoiningDate: Date ;
  occuranceDate!: Date ;
  dateOfBirthSelected: any;
  yearFromPrNo: number | null = null;
  minOccDate!: Date;
  maxOccDate!: Date;
  maxJoiningDate!: Date;
  maxRetirementDate: Date | null = null;
  minRetirementDate: Date | null = null;
  maxEnlishmentDatess!: Date;
  unitTypeName!: any;
  maxDate!: Date;
  download1: any;
  download2: any;
  download3: any;
  download4: any;
  download5: any;
  download6: any;
  download7: any;
  download8: any;
  download9: any;
  download10: any;
  download11: any;
  createdDate: any;
  prYear: any;
  minchargeMemoApprovedSelectDate!: Date;
  maxchargeMemoApprovedSelectDate!: Date;
  mindateOfDefenceStatementSelectDate!: Date;
  maxdateOfDefenceStatementSelectDate!: Date;
  mindateOfAppointmentOfEnquiryOfficerSelectDate!: Date;
  maxdateOfAppointmentOfEnquiryOfficerSelectDate!: Date;
  mindateOfEnquiryOfficerSelectDate!: Date;
  maxdateOfEnquiryOfficerSelectDate!: Date;
  mindateOfMinutesDrawnSelectDate!: Date;
  maxdateOfMinutesDrawnSelectDate!: Date;
  mindateOfFrCallingMemoAlongWithMinuteSelectDate!: Date;
  maxdateOfFrCallingMemoAlongWithMinuteSelectDate!: Date;
  mindateOfServingOfMinuteSelectDate!: Date;
  maxdateOfServingOfMinuteSelectDate!: Date;
  mindateOfFrFurnishedSelectDate!: Date;
  maxdateOfFrFurnishedSelectDate!: Date;
  mindateOfFinalOrderSelectDate!: Date;
  maxdateOfFinalOrderSelectDate!: Date;
  mindateOfPunishmentSelectDate!: Date;
  maxdateOfPunishmentSelectDate!: Date;
  minchargeMemoAcknowledgedDateSelectDate!: Date;
  maxchargeMemoAcknowledgedDateSelectDate!: Date;
  prsection: any;
  action: any;
  showRankNo: boolean = false;
  showRankType: boolean = false;
  isFormDirty: any;
  

    constructor(private fb: FormBuilder, private majorPrSourceService: MajorPrSourceService, private router: Router,
        private route: ActivatedRoute,private cdr: ChangeDetectorRef, private snackBar: MatSnackBar, public dialog: MatDialog) { 
    
        this.delinquentFormGroup = this.fb.group({
          delnquenceName: ['', Validators.required],
          delnquenceRankMasterId: ['', Validators.required],
          delnquenceRankMaster: ['', Validators.required],
          delnquenceRankNo: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern('^(?!0+$)[0-9]{3,5}$') ]],
          ifhrmsNo: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
          dateOfBirth: [null, Validators.required],
          dateOfEnlishment: [null, Validators.required],
          dateOfRetiredment: [null, Validators.required],
          policeStationId: ['', Validators.required],
          dateOfJoiningInPresentPost: [null, Validators.required],
          mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
          noOfPRsofar: ['', Validators.required],
          dateOfOccurance: ['', Validators.required],
          placeOfOccurance: ['', Validators.required],
          prchargesList: this.fb.array([], this.minLengthArray(1)),
        });

        this.updateSequenceFormGroup = this.fb.group({
          // chargeMemoApprovedDate: ['', Validators.required],
          // chargeMemoApprovedDateRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // chargeMemoApprovedDateUploadFile: ['', Validators.required],
          // chargeMemoAcknowledgedDate: ['', Validators.required],
          // chargeMemoAcknowledgedDateRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // chargeMemoAcknowledgedDateuploadFile: ['', Validators.required],
          // dateOfDefenceStatement: ['', Validators.required],
          // dateOfDefenceStatementRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfDefenceStatementuploadFile: ['', Validators.required],
          // dateOfAppointmentOfEnquiryOfficer: ['', Validators.required],
          // dateOfAppointmentOfEnquiryOfficerRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfAppointmentOfEnquiryOfficeruploadFile: ['', Validators.required],
          // dateOfEnquiryOfficer: ['', Validators.required],
          // dateOfEnquiryOfficerRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfEnquiryOfficeruploadFile: ['', Validators.required],
          // dateOfMinutesDrawn: ['', Validators.required],
          // dateOfMinutesDrawnRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfMinutesDrawnuploadFile: ['', Validators.required],
          // dateOfFrCallingMemoAlongWithMinute: ['', Validators.required],
          // dateOfFrCallingMemoAlongWithMinuteRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfFrCallingMemoAlongWithMinuteuploadFile: ['', Validators.required],
          // dateOfServingOfMinute: ['', Validators.required],
          // dateOfServingOfMinuteRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfServingOfMinuteuploadFile: ['', Validators.required],
          // dateOfFrFurnished: ['', Validators.required],
          // dateOfFrFurnishedRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfFrFurnisheduploadFile: ['', Validators.required],
          // dateOfFinalOrder: ['', Validators.required],
          // dateOfFinalOrderRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // dateOfFinalOrderuploadFile: ['', Validators.required],
          // detailsOfPunishment: ['', Validators.required],
          // detailsOfPunishmentRemarks: ['', [Validators.required,Validators.maxLength(500)]],
          // detailsOfPunishmentUploadFile: ['', Validators.required],
          // createdDate: [''],

          chargeMemoApprovedDate: [''],
          chargeMemoApprovedDateRemarks: [''],
          chargeMemoApprovedDateUploadFile: [''],
          chargeMemoAcknowledgedDate: [''],
          chargeMemoAcknowledgedDateRemarks: [''],
          chargeMemoAcknowledgedDateuploadFile: [''],
          dateOfDefenceStatement: [''],
          dateOfDefenceStatementRemarks: [''],
          dateOfDefenceStatementuploadFile: [''],
          dateOfAppointmentOfEnquiryOfficer: [''],
          dateOfAppointmentOfEnquiryOfficerRemarks: [''],
          dateOfAppointmentOfEnquiryOfficeruploadFile: [''],
          dateOfEnquiryOfficer: [''],
          dateOfEnquiryOfficerRemarks: [''],
          dateOfEnquiryOfficeruploadFile: [''],
          dateOfMinutesDrawn: [''],
          dateOfMinutesDrawnRemarks: [''],
          dateOfMinutesDrawnuploadFile: [''],
          dateOfFrCallingMemoAlongWithMinute: [''],
          dateOfFrCallingMemoAlongWithMinuteRemarks: [''],
          dateOfFrCallingMemoAlongWithMinuteuploadFile: [''],
          dateOfServingOfMinute: [''],
          dateOfServingOfMinuteRemarks: [''],
          dateOfServingOfMinuteuploadFile: [''],
          dateOfFrFurnished: [''],
          dateOfFrFurnishedRemarks: [''],
          dateOfFrFurnisheduploadFile: [''],
          dateOfFinalOrder: [''],
          dateOfFinalOrderRemarks: [''],
          dateOfFinalOrderuploadFile: [''],
          detailsOfPunishment: [''],
          detailsOfPunishmentRemarks: [''],
          detailsOfPunishmentUploadFile: [''],
          createdDate: [''],


        });

        this.prForm = this.fb.group({
          remarks: ['', [Validators.required,Validators.maxLength(500)]],
        });
        this.minJoiningDate = new Date()

        this.delinquentFormGroup.valueChanges.subscribe(() => {
          this.isFormDirty = this.delinquentFormGroup.dirty;
        });
        this.updateSequenceFormGroup.valueChanges.subscribe(() => {
          this.isFormDirty = this.updateSequenceFormGroup.dirty;
        });
        this.prForm.valueChanges.subscribe(() => {
        this.isFormDirty = this.prForm.dirty;
        });
}

ngOnInit(): void {

  this.route.params.subscribe(params => {
    
    this.majorPrIdss = params['majorPrIdss']; 
    this.prSectionNo = params['prSectionNo'];
    if(this.majorPrIdss){
      this.isEditing = true;
      this.editPRMethod();
      this.editranklist();
    }

      
  });

    this.usertypeId = sessionStorage.getItem('usertype') ;
    this.unitId = sessionStorage.getItem('unitid');
    this.unitTypeName = sessionStorage.getItem('unitTypeName')

    this.majorPrSourceService.stationlist(this.usertypeId, this.unitId).subscribe(

      (response) => {
        if (response && response.length > 0) {
          this.stationList = response; // Assign the response to stationList
        } else {
          alert('Invalid credentials. Please try again.');
        }
      }),

      this.route.queryParams.subscribe(params => {

        this.prNo = params['prNo'] || '';
        this.exPr = params['exPr'] || '';
        this.crNo = params['crNo'] || '';
        this.punishmentType = params['punishmentType'] || '';
        this.selectedPunishment = params['punishment'];
        this.action = params['action'];
    
    if (null != this.selectedPunishment) {
    
      this.majorPrSourceService.ranklist(this.selectedPunishment).subscribe(
        (response) => {
          if (response && response.length > 0) {
            this.ranklist = response;
          }
          else {
            alert('Invalid credentials. Please try again.');
          }
        },
      );
    }
  });

  if (this.exPr) {
    this.prYear = this.exPr.split('/')[1];
  }
  if (this.prNo) {
    this.prYear = this.prNo.split('/')[1];
  }
  if (this.crNo) {
    this.prYear = this.crNo.split('/')[1];
  }
  const today = new Date(this.prYear);
  this.maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
  this.maxDate.setMonth(11);
  this.maxDate.setDate(31);

  const todayForMinDate = new Date(this.prYear);


  this.minDate = new Date(todayForMinDate.setFullYear(todayForMinDate.getFullYear() - 60));


  const existingDateOfBirth = this.delinquentFormGroup.get('dateOfBirth')?.value;
  if (existingDateOfBirth) {
    this.onDateOfBirthChange({ value: existingDateOfBirth });
  }

}


  dateFilter = (date: Date | null): boolean => {
    if (!date) return false;

    const selectedDate = new Date(date);


     // Check that the selected date is within the range of minDate (60 years ago) and maxDate (18 years ago)
     if (selectedDate < this.minDate || selectedDate > this.maxDate) {
      return false;
    }

    return true;
  };

  onDateOfBirthChange(event: any): void {
    this.dateOfBirthSelected = !!event.value;
    

    if (this.dateOfBirthSelected) {
    
      const dateOfBirth = event.value;
      // Calculate 18 years after the selected date of birth
      this.minEnlistmentDate = new Date(dateOfBirth);
      const maxEnlishmentDates = new Date(this.dateOfBirth);
      this.minEnlistmentDate.setFullYear(this.minEnlistmentDate.getFullYear() + 18);
      maxEnlishmentDates.setFullYear(maxEnlishmentDates.getFullYear() + 40);
      if (maxEnlishmentDates < new Date()) {
        this.maxEnlishmentDatess = maxEnlishmentDates;
      } else {
        // maxEnlishmentDates.setFullYear(maxEnlishmentDates.getFullYear() + new Date());
        this.maxEnlishmentDatess = new Date();
      }
      this.calculateRetirementDate();
    }

  }

  calculateRetirementDate() {
    if (this.dateOfBirth) {
      // Calculate the date that is 60 years after the date of birth
      const retirementDate = new Date(this.dateOfBirth);
      retirementDate.setFullYear(retirementDate.getFullYear() + 60);
      this.maxRetirementDate = retirementDate;
      this.maxRetirementDate.setDate(31);
      this.minRetirementDate = this.dateOfBirth;

    }
  }

  onDateOfEnlistmentChange(event: any) {
    const dateOfEnlistment = event.value;
    if (dateOfEnlistment) {
      this.minJoiningDate = new Date(dateOfEnlistment);
      this.minJoiningDate.setDate(this.minJoiningDate.getDate() + 1);
      this.minJoiningDate.setHours(0, 0, 0, 0); 
      if (this.exPr) {
        this.prYear = this.exPr.split('/')[1];
      }
      if (this.prNo) {
        this.prYear = this.prNo.split('/')[1];
      }
      if (this.crNo) {
        this.prYear = this.crNo.split('/')[1];
      }
      const currentYear = new Date().getFullYear().toString();
      if (this.prYear === currentYear) {
        this.maxJoiningDate = new Date(); // Set maxJoiningDate to the current date
      } else {
        // Set maxJoiningDate to the end of prYear (31st December)
        this.maxJoiningDate = new Date(this.prYear, 11, 31); // December 31 of prYear
      }  
      this.validateJoiningDate();
    }
  }

  onDateOfOccurance(event:any){
    const occuranceDate = event.value;
    if (occuranceDate) {
      this.minchargeMemoApprovedSelectDate = new Date(occuranceDate);
      this.minchargeMemoApprovedSelectDate.setDate(this.minchargeMemoApprovedSelectDate.getDate() + 1);

      this.maxchargeMemoApprovedSelectDate = new Date();
       
    }
  }

  chargeMemoAcknowledgedDateChange(event:any){
    const chargeMemoAcknowledgeddate = event.value;
    if (chargeMemoAcknowledgeddate) {
      this.minchargeMemoAcknowledgedDateSelectDate = new Date(chargeMemoAcknowledgeddate);
      this.minchargeMemoAcknowledgedDateSelectDate.setDate(this.minchargeMemoAcknowledgedDateSelectDate.getDate() + 1);

      this.maxchargeMemoAcknowledgedDateSelectDate = new Date();
    }
  }


  dateOfDefenceStatementChange(event:any){
    const dateOfDefenceStatement = event.value;
    if (dateOfDefenceStatement) {
      this.mindateOfDefenceStatementSelectDate = new Date(dateOfDefenceStatement);
      this.mindateOfDefenceStatementSelectDate.setDate(this.mindateOfDefenceStatementSelectDate.getDate() + 1);

      this.maxdateOfDefenceStatementSelectDate = new Date();
    }
  }


  dateOfAppointmentOfEnquiryOfficerChange(event:any){
    const dateOfAppointmentOfEnquiryOfficer = event.value;
    if (dateOfAppointmentOfEnquiryOfficer) {
      this.mindateOfAppointmentOfEnquiryOfficerSelectDate = new Date(dateOfAppointmentOfEnquiryOfficer);
      this.mindateOfAppointmentOfEnquiryOfficerSelectDate.setDate(this.mindateOfAppointmentOfEnquiryOfficerSelectDate.getDate() + 1);

      this.maxdateOfAppointmentOfEnquiryOfficerSelectDate = new Date();
    }
  }

  dateOfEnquiryOfficerChange(event:any){
    const dateOfEnquiryOfficer = event.value;
    if (dateOfEnquiryOfficer) {
      this.mindateOfEnquiryOfficerSelectDate = new Date(dateOfEnquiryOfficer);
      this.mindateOfEnquiryOfficerSelectDate.setDate(this.mindateOfEnquiryOfficerSelectDate.getDate() + 1);

      this.maxdateOfEnquiryOfficerSelectDate = new Date();
    }
  }

  dateOfMinutesDrawnChange(event:any){
    const dateOfMinutesDrawn = event.value;
    if (dateOfMinutesDrawn) {
      this.mindateOfMinutesDrawnSelectDate = new Date(dateOfMinutesDrawn);
      this.mindateOfMinutesDrawnSelectDate.setDate(this.mindateOfMinutesDrawnSelectDate.getDate() + 1);

      this.maxdateOfMinutesDrawnSelectDate = new Date();
    }
  }

  dateOfFrCallingMemoAlongWithMinuteChange(event:any){
    const dateOfFrCallingMemoAlongWithMinute = event.value;
    if (dateOfFrCallingMemoAlongWithMinute) {
      this.mindateOfFrCallingMemoAlongWithMinuteSelectDate = new Date(dateOfFrCallingMemoAlongWithMinute);
      this.mindateOfFrCallingMemoAlongWithMinuteSelectDate.setDate(this.mindateOfFrCallingMemoAlongWithMinuteSelectDate.getDate() + 1);

      this.maxdateOfFrCallingMemoAlongWithMinuteSelectDate = new Date();
    }
  }

  dateOfServingOfMinuteChange(event:any){
    const dateOfServingOfMinute = event.value;
    if (dateOfServingOfMinute) {
      this.mindateOfServingOfMinuteSelectDate = new Date(dateOfServingOfMinute);
      this.mindateOfServingOfMinuteSelectDate.setDate(this.mindateOfServingOfMinuteSelectDate.getDate() + 1);

      this.maxdateOfServingOfMinuteSelectDate = new Date();
    }
  }

  dateOfFrFurnishedChange(event:any){
    const dateOfFrFurnished = event.value;
    if (dateOfFrFurnished) {
      this.mindateOfFrFurnishedSelectDate = new Date(dateOfFrFurnished);
      this.mindateOfFrFurnishedSelectDate.setDate(this.mindateOfFrFurnishedSelectDate.getDate() + 1);

      this.maxdateOfFrFurnishedSelectDate = new Date();
    }
  }

  dateOfFinalOrderChange(event:any){
    const dateOfFinalOrder = event.value;
    if (dateOfFinalOrder) {
      this.mindateOfFinalOrderSelectDate = new Date(dateOfFinalOrder);
      this.mindateOfFinalOrderSelectDate.setDate(this.mindateOfFinalOrderSelectDate.getDate() + 1);

      this.maxdateOfFinalOrderSelectDate = new Date();
    }
  }
  

  validateJoiningDate() {
    const dateOfJoining = this.delinquentFormGroup.get('dateOfJoiningInPresentPost')?.value;
    if (dateOfJoining) {

      const normalizedDateOfJoining = new Date(dateOfJoining);
      normalizedDateOfJoining.setHours(0, 0, 0, 0);

      if (normalizedDateOfJoining < this.minJoiningDate) {
        this.delinquentFormGroup.get('dateOfJoiningInPresentPost')?.setErrors({ invalidJoiningDate: true });
        this.delinquentFormGroup.get('dateOfJoiningInPresentPost')?.markAsTouched();
        this.delinquentFormGroup.get('dateOfJoiningInPresentPost')?.markAsDirty();

      } else {
        // If valid, clear the error (optional)
        this.delinquentFormGroup.get('dateOfJoiningInPresentPost')?.setErrors(null);
      }
    }
  }


onDateOfJoiningInPresentPost(event: any) {
  const occuranceDate = event.value;
    if (occuranceDate) {

      // this.minOccDate.setDate(this.minOccDate.getDate());
      // this.minOccDate.setHours(0, 0, 0, 0);
      if (this.exPr) {
        this.prYear = this.exPr.split('/')[1];
      }
      if (this.prNo) {
        this.prYear = this.prNo.split('/')[1];
      }
      if (this.crNo) {
        this.prYear = this.crNo.split('/')[1];
      }
      this.minOccDate = new Date(occuranceDate);
      if (this.minOccDate.getFullYear() < this.prYear) {

        this.minOccDate.setFullYear(this.prYear - 1);
        this.minOccDate.setMonth(11);
        this.minOccDate.setDate(1);
        this.minOccDate.setDate(this.minOccDate.getDate());
      } else if (this.minOccDate.getFullYear() === this.prYear) {
        this.minOccDate.setDate(this.minOccDate.getDate());


      }


      if (this.prYear) {
        this.yearFromPrNo = parseInt(this.prYear, 10);
      }
      if (this.yearFromPrNo) {
        // this.minOccDate = new Date(this.yearFromPrNo, 0, 1);
        this.maxOccDate = new Date(this.yearFromPrNo, 11, 31);
        const currentDate = new Date();

        if (this.maxOccDate > currentDate) {
          this.maxOccDate = currentDate;
        } else {
          this.maxOccDate = new Date(this.prYear, 11, 31);
        }
      }
      this.validateOccuranceDate();
    }
  }


  validateOccuranceDate() {
    const dateOfOccurance = this.delinquentFormGroup.get('dateOfOccurance')?.value;
    if (dateOfOccurance) {
      // Normalize dateOfJoining to midnight for accurate comparison
      const normalizedDateOfOccurance = new Date(dateOfOccurance);
      normalizedDateOfOccurance.setHours(0, 0, 0, 0);

      if (normalizedDateOfOccurance < this.occuranceDate) {
        this.delinquentFormGroup.get('dateOfOccurance')?.setErrors({ invalidOccuranceDate: true });
        this.delinquentFormGroup.get('dateOfOccurance')?.markAsTouched();
        this.delinquentFormGroup.get('dateOfOccurance')?.markAsDirty();

      } else {
        // If valid, clear the error (optional)
        this.delinquentFormGroup.get('dateOfOccurance')?.setErrors(null);
      }
    }
  }


editranklist(){
  debugger
  this.majorPrSourceService.ranklist(this.prSectionNo).subscribe(
    (response) => {
    
      if (response && response.length > 0) {
        this.ranklist = response; // Assign the response to stationList
      } else {
        alert('Invalid credentials. Please try again.');
      }
    });
  
  }

editPRMethod(){
  this.majorPrSourceService.getEditFlowData(this.majorPrIdss).subscribe(
    (response) => {
      console.log(response); 
      this.download1 = response.chargeMemoApprovedDateUploadFile ? true : false;
      this.download2 = response.chargeMemoAcknowledgedDateuploadFile ? true : false;
      this.download3 = response.dateOfDefenceStatementuploadFile ? true : false;
      this.download4 = response.dateOfAppointmentOfEnquiryOfficeruploadFile ? true : false;
      this.download5 = response.dateOfEnquiryOfficeruploadFile ? true : false;
      this.download6 = response.dateOfMinutesDrawnuploadFile ? true : false;
      this.download7 = response.dateOfFrCallingMemoAlongWithMinuteuploadFile ? true : false;
      this.download8 = response.dateOfServingOfMinuteuploadFile ? true : false;
      this.download9 = response.dateOfFrFurnisheduploadFile ? true : false;
      this.download10 = response.dateOfFinalOrderuploadFile ? true : false;
      this.download11 = response.detailsOfPunishmentUploadFile ? true : false;

      this.delinquentFormGroup.patchValue({
        delnquenceRankMasterId:response.delnquenceRankMasterId || '' ,
        delnquenceName: response.delnquenceName || '',
        delnquenceRankMaster: response.delnquenceRankMaster || '',
        delnquenceRankNo: response.delnquenceRankNo || '',
        delinquencyDetails:response.prchargesList || '',

        ifhrmsNo: response.ifhrmsNo || '',
        dateOfBirth: response.dateOfBirth || '',
        dateOfEnlishment: response.dateOfEnlishment || '',
        dateOfRetiredment: response.dateOfRetiredment || '',
        // presentWorkingPlace: response.presentWorkingPlace || '',
        policeStationId: response.policeStationId || '',
        dateOfJoiningInPresentPost: response.dateOfJoiningInPresentPost || '',
        mobileNo: response.mobileNo || '',
        noOfPRsofar: response.noOfPRsofar || '0',
        dateOfOccurance: response.dateOfOccurance || '',
        placeOfOccurance: response.placeOfOccurance || '',
        delinquencyDetailInput: response.prchargesList || [], // Assuming this is an array
      });

      response.prchargesList.forEach((item: any) => {
        // Assuming `item` has the 'offence' field
        const offence = Object.values(item).join(''); // Join the values to form the offence string
        this.delinquencyDetails.push(this.fb.group({ offence }));
      });

      this.updateSequenceFormGroup.patchValue({
        chargeMemoApprovedDate: response.chargeMemoApprovedDate || '',
        chargeMemoApprovedDateRemarks: response.chargeMemoApprovedDateRemarks || '',
        chargeMemoApprovedDateUploadFile: response.chargeMemoApprovedDateUploadFile || '',
        chargeMemoAcknowledgedDate: response.chargeMemoAcknowledgedDate || '',
        chargeMemoAcknowledgedDateRemarks: response.chargeMemoAcknowledgedDateRemarks || '',
        chargeMemoAcknowledgedDateuploadFile: response.chargeMemoAcknowledgedDateuploadFile || '',
        dateOfDefenceStatement: response.dateOfDefenceStatement || '',
        dateOfDefenceStatementRemarks: response.dateOfDefenceStatementRemarks || '',
        dateOfDefenceStatementuploadFile: response.dateOfDefenceStatementuploadFile || '',
        dateOfAppointmentOfEnquiryOfficer: response.dateOfAppointmentOfEnquiryOfficer || '',
        dateOfAppointmentOfEnquiryOfficerRemarks: response.dateOfAppointmentOfEnquiryOfficerRemarks || '',
        dateOfAppointmentOfEnquiryOfficeruploadFile: response.dateOfAppointmentOfEnquiryOfficeruploadFile || '',
        dateOfEnquiryOfficer: response.dateOfEnquiryOfficer || '',
        dateOfEnquiryOfficerRemarks: response.dateOfEnquiryOfficerRemarks || '',
        dateOfEnquiryOfficeruploadFile: response.dateOfEnquiryOfficeruploadFile || '',
        dateOfMinutesDrawn: response.dateOfMinutesDrawn || '',
        dateOfMinutesDrawnRemarks:response.dateOfMinutesDrawnRemarks || '',
        dateOfMinutesDrawnuploadFile: response.dateOfMinutesDrawnuploadFile || '',
        dateOfFrCallingMemoAlongWithMinute: response.dateOfFrCallingMemoAlongWithMinute || '',
        dateOfFrCallingMemoAlongWithMinuteRemarks: response.dateOfFrCallingMemoAlongWithMinuteRemarks || '',
        dateOfFrCallingMemoAlongWithMinuteuploadFile: response.dateOfFrCallingMemoAlongWithMinuteuploadFile || '',
        dateOfServingOfMinute: response.dateOfServingOfMinute || '',
        dateOfServingOfMinuteRemarks: response.dateOfServingOfMinuteRemarks || '',
        dateOfServingOfMinuteuploadFile: response.dateOfServingOfMinuteuploadFile || '',
        dateOfFrFurnished: response.dateOfFrFurnished || '',
        dateOfFrFurnishedRemarks: response.dateOfFrFurnishedRemarks || '',
        dateOfFrFurnisheduploadFile: response.dateOfFrFurnisheduploadFile || '',
        dateOfFinalOrder: response.dateOfFinalOrder || '',
        dateOfFinalOrderRemarks: response.dateOfFinalOrderRemarks || '',
        dateOfFinalOrderuploadFile: response.dateOfFinalOrderuploadFile || '',
        detailsOfPunishment: response.detailsOfPunishment || '',
        detailsOfPunishmentRemarks: response.detailsOfPunishmentRemarks || '',
        detailsOfPunishmentUploadFile: response.detailsOfPunishmentUploadFile || '',
        delnquenceRankMasterId: response.delnquenceRankMasterId || '',
        delnquenceRankMaster: response.delnquenceRankMaster || '',
      });

      this.prForm.patchValue({
        remarks: response.remarks || '',
      });

      // You can also set additional properties if required
      this.selectedField = response.selectedField || '';
      this.selectedPunishment = response.selectedPunishment || '';
      this.RankselectedField = response.RankselectedField || '';
      this.RankNameId = response.RankNameId || null;
      this.delnquenceRankMasterId = response.delnquenceRankMasterId || '',
      this.delnquenceRankMaster = response.delnquenceRankMaster || '',
      // this.StationSelect = response.StationSelect || null;
      this.selectedPunishment=response.prSectionNo || null;
      this.prNo=`${response.prNo}/${response.year}/${response.unitShortcode}`;
      this.majorPrIdss=response.majorPrId;
      this.createdDate = response.createdDate;
        console.log("created Date", this.createdDate);
        if (response.dateOfEnlishment) {
          this.minJoiningDate = new Date(this.dateOfEnlishment);
          this.minJoiningDate.setDate(this.minJoiningDate.getDate() + 1);
          this.minJoiningDate.setHours(0, 0, 0, 0);
          if (this.exPr) {
            this.prYear = this.exPr.split('/')[1];
          }
          if (this.prNo) {
            this.prYear = this.prNo.split('/')[1];
          }
          if (this.crNo) {
            this.prYear = this.crNo.split('/')[1];
          }
          const currentYear = new Date().getFullYear().toString();
          if (this.prYear === currentYear) {
            this.maxJoiningDate = new Date(); // Set maxJoiningDate to the current date
          } else {
            // Set maxJoiningDate to the end of prYear (31st December)
            this.maxJoiningDate = new Date(this.prYear, 11, 31); // December 31 of prYear
          }
          this.validateJoiningDate();

        }
        if (response.dateOfBirth) {
          const dateOfBirth = response.dateOfBirth;
          // Calculate 18 years after the selected date of birth
          this.minEnlistmentDate = new Date(dateOfBirth);
          this.minEnlistmentDate.setFullYear(this.minEnlistmentDate.getFullYear() + 18);
          if (this.dateOfBirth) {
            const retirementDate = new Date(this.dateOfBirth);
            retirementDate.setFullYear(retirementDate.getFullYear() + 60);
            this.maxRetirementDate = retirementDate;
            this.minRetirementDate = this.dateOfBirth;
            this.minEnlistmentDate = new Date(this.dateOfBirth);
            const maxEnlishmentDates = new Date(this.dateOfBirth);
            this.minEnlistmentDate.setFullYear(this.minEnlistmentDate.getFullYear() + 18);
            maxEnlishmentDates.setFullYear(maxEnlishmentDates.getFullYear() + 40);
            if (maxEnlishmentDates < new Date()) {
              this.maxEnlishmentDatess = maxEnlishmentDates;
            } else {
              // maxEnlishmentDates.setFullYear(maxEnlishmentDates.getFullYear() + new Date());
              this.maxEnlishmentDatess = new Date();
            }
            this.calculateRetirementDate();

          }
        }
        if (response.dateOfJoiningInPresentPost) {
          // this.minOccDate.setDate(this.minOccDate.getDate());
          // this.minOccDate.setHours(0, 0, 0, 0);
          if (this.exPr) {
            this.prYear = this.exPr.split('/')[1];
          }
          if (this.prNo) {
            this.prYear = this.prNo.split('/')[1];
          }
          if (this.crNo) {
            this.prYear = this.crNo.split('/')[1];
          }
          this.minOccDate = new Date(response.dateOfJoiningInPresentPost);
          if (this.minOccDate.getFullYear() < this.prYear) {

            this.minOccDate.setFullYear(this.prYear - 1);
            this.minOccDate.setMonth(11);
            this.minOccDate.setDate(1);
          } else if (this.minOccDate.getFullYear() === this.prYear) {
            this.minOccDate.setDate(this.minOccDate.getDate());
          }


          if (this.prYear) {
            this.yearFromPrNo = parseInt(this.prYear, 10);
          }
          if (this.yearFromPrNo) {
            // this.minOccDate = new Date(this.yearFromPrNo, 0, 1);
            this.maxOccDate = new Date(this.yearFromPrNo, 11, 31);
            const currentDate = new Date();

            if (this.maxOccDate > currentDate) {
              this.maxOccDate = currentDate;
            } else {
              this.maxOccDate = new Date(this.prYear, 11, 31);
            }
          }
          if (this.prYear) {
            const today = new Date(this.prYear);


            this.maxDate = new Date(today.setFullYear(today.getFullYear() - 18));
            this.maxDate.setMonth(11);
            this.maxDate.setDate(31);

            const todayForMinDate = new Date(this.prYear);


            this.minDate = new Date(todayForMinDate.setFullYear(todayForMinDate.getFullYear() - 60));


            const existingDateOfBirth = this.delinquentFormGroup.get('dateOfBirth')?.value;
            if (existingDateOfBirth) {
              this.onDateOfBirthChange({ value: existingDateOfBirth });
            }

          }
          this.validateOccuranceDate();
        }

        if (response.dateOfOccurance) {
          this.minchargeMemoApprovedSelectDate = new Date(response.dateOfOccurance);
          this.minchargeMemoApprovedSelectDate.setDate(this.minchargeMemoApprovedSelectDate.getDate() + 1);
          this.maxchargeMemoApprovedSelectDate = new Date();
        }
        if (response.chargeMemoApprovedDate) {
          this.minchargeMemoAcknowledgedDateSelectDate = new Date(response.chargeMemoApprovedDate);
          this.minchargeMemoAcknowledgedDateSelectDate.setDate(this.minchargeMemoAcknowledgedDateSelectDate.getDate() + 1);
          this.maxchargeMemoAcknowledgedDateSelectDate = new Date();
        }
        if (response.chargeMemoAcknowledgedDate) {
          this.mindateOfDefenceStatementSelectDate = new Date(response.chargeMemoAcknowledgedDate);
          this.mindateOfDefenceStatementSelectDate.setDate(this.mindateOfDefenceStatementSelectDate.getDate() + 1);
          this.maxdateOfDefenceStatementSelectDate = new Date();
        }
        if (response.dateOfDefenceStatement) {
          this.mindateOfAppointmentOfEnquiryOfficerSelectDate = new Date(response.dateOfDefenceStatement);
          this.mindateOfAppointmentOfEnquiryOfficerSelectDate.setDate(this.mindateOfAppointmentOfEnquiryOfficerSelectDate.getDate() + 1);
          this.maxdateOfAppointmentOfEnquiryOfficerSelectDate = new Date();
        }
        if (response.dateOfAppointmentOfEnquiryOfficer) {
          this.mindateOfEnquiryOfficerSelectDate = new Date(response.dateOfAppointmentOfEnquiryOfficer);
          this.mindateOfEnquiryOfficerSelectDate.setDate(this.mindateOfEnquiryOfficerSelectDate.getDate() + 1);
          this.maxdateOfEnquiryOfficerSelectDate = new Date();
        }
        if (response.dateOfEnquiryOfficer) {
          this.mindateOfMinutesDrawnSelectDate = new Date(response.dateOfEnquiryOfficer);
          this.mindateOfMinutesDrawnSelectDate.setDate(this.mindateOfMinutesDrawnSelectDate.getDate() + 1);
          this.maxdateOfMinutesDrawnSelectDate = new Date();
        }
        if (response.dateOfMinutesDrawn) {
          this.mindateOfFrCallingMemoAlongWithMinuteSelectDate = new Date(response.dateOfMinutesDrawn);
          this.mindateOfFrCallingMemoAlongWithMinuteSelectDate.setDate(this.mindateOfFrCallingMemoAlongWithMinuteSelectDate.getDate() + 1);
          this.maxdateOfFrCallingMemoAlongWithMinuteSelectDate = new Date();
        }
        if (response.dateOfFrCallingMemoAlongWithMinute) {
          this.mindateOfServingOfMinuteSelectDate = new Date(response.dateOfFrCallingMemoAlongWithMinute);
          this.mindateOfServingOfMinuteSelectDate.setDate(this.mindateOfServingOfMinuteSelectDate.getDate() + 1);
          this.maxdateOfServingOfMinuteSelectDate = new Date();
        }
        if (response.dateOfServingOfMinute) {
          this.mindateOfFrFurnishedSelectDate = new Date(response.sCNAckDate);
          this.mindateOfFrFurnishedSelectDate.setDate(this.mindateOfFrFurnishedSelectDate.getDate() + 1);
          this.maxdateOfFrFurnishedSelectDate = new Date();
        }
        if (response.dateOfFrFurnished) {
          this.mindateOfFinalOrderSelectDate = new Date(response.sCNAckDate);
          this.mindateOfFinalOrderSelectDate.setDate(this.mindateOfFinalOrderSelectDate.getDate() + 1);
          this.maxdateOfFinalOrderSelectDate = new Date();
        }
        this.RankNameId = response.delnquenceRankMasterId || null;
        this.cdr.detectChanges(); 
        if (this.RankNameId) {
          this.Rankselect(this.RankNameId);
        }
        this.cdr.detectChanges(); 
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
  const today = new Date();
    this.minDate = new Date(today.setFullYear(today.getFullYear() - 18));
}


get delinquencyDetails(): FormArray {
    return this.delinquentFormGroup.get('prchargesList') as FormArray;
  }

  set delinquencyDetails(value: FormArray) {
    this.delinquentFormGroup.setControl('prchargesList', value);
  }


  addDelinquencyDetail(): void {
    const inputValue = this.delinquencyDetailInput.value?.trim(); 

      if (inputValue && inputValue.length > 300) {
        this.delinquencyDetailInput.markAsTouched();
        this.delinquencyDetailInput.updateValueAndValidity();
        return;
      }

      if (inputValue) {
        const chargeDetail = { offence: inputValue };

      if (this.editingCountIndex !== null) {
        this.delinquencyDetails.at(this.editingCountIndex).setValue(chargeDetail);
        this.editingCountIndex = null;
      } else {
      this.delinquencyDetails.push(new FormControl(chargeDetail));
      }
      this.delinquencyDetailInput.reset();
    }
  }
  

  removeDelinquencyDetail(index: number): void {
    this.delinquencyDetails.removeAt(index);
    this.delinquencyDetailInput.reset();
  }

  editDelinquencyDetail(index: number): void {
    this.editingCountIndex = index;
    const selectedDetail = this.delinquencyDetails.at(index).value;
    this.delinquencyDetailInput.setValue(selectedDetail.offence);
  }


  minLengthArray(min: number): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (control instanceof FormArray) {
          return control.length >= min ? null : { minLengthArray: true };
        }
        return null;
      };
    }


  onIfhrmsNoChange(event: Event): void {
    debugger
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 11) {
      inputValue = inputValue.substring(0, 11);
    }
    this.delinquentFormGroup.patchValue({ ifhrmsNo: inputValue });
    console.log(inputValue);
    if (inputValue.length === 11) {
      debugger
      this.majorPrSourceService.majorprcount(inputValue).subscribe(
        (response) => {
          debugger
          if (response) {
            debugger
            if (response.majorPrId) {
              this.prsection=this.selectedPunishment;
  
              this.prSectionNo = response.prSectionNo;
              if(this.prSectionNo!=this.prsection){
                debugger
                let result= this.prSectionNo.split("");
                let results= this.prsection.split("");
  if(result.length!=results.length){
    debugger
  if(this.action=='new'){
    debugger
  this.router.navigate(['/pr-details'], { queryParams: { action: 'new',message:'IFHRMS NO beelongs to'  } });
  }
  if(this.action=='existing'){
    debugger
    this.router.navigate(['/pr-details'], { queryParams: { action: 'existing' } });
    }
    if(this.action=='current'){
      debugger
      this.router.navigate(['/pr-details'], { queryParams: { action: 'current' } });
      }
  }
              }
            }
            this.prsection=this.selectedPunishment;
            this.noOfPRsofar = response.noOfPRsofar;
            this.delnquenceName = response.delnquenceName;
            this.dateOfBirth = response.dateOfBirth;
            this.dateOfEnlishment = response.dateOfEnlishment;
            this.delnquenceRankMasterId
              = response.delnquenceRankMaster;
            this.mobileNo = response.mobileNo;
            if (this.dateOfBirth) {
              const retirementDate = new Date(this.dateOfBirth);
              retirementDate.setFullYear(retirementDate.getFullYear() + 60);
              this.maxRetirementDate = retirementDate;
              this.minRetirementDate = this.dateOfBirth;
              this.minEnlistmentDate = new Date(this.dateOfBirth);
                const maxEnlishmentDates = new Date(this.dateOfBirth);
                this.minEnlistmentDate.setFullYear(this.minEnlistmentDate.getFullYear() + 18);
                maxEnlishmentDates.setFullYear(maxEnlishmentDates.getFullYear() + 40);
                if (maxEnlishmentDates < new Date()) {
                  this.maxEnlishmentDatess = maxEnlishmentDates;
                } else {
                  // maxEnlishmentDates.setFullYear(maxEnlishmentDates.getFullYear() + new Date());
                  this.maxEnlishmentDatess = new Date();
                }
                this.calculateRetirementDate();

            }
            if (this.dateOfEnlishment) {
              this.minJoiningDate = new Date(this.dateOfEnlishment);
              this.minJoiningDate.setDate(this.minJoiningDate.getDate() + 1);
              this.minJoiningDate.setHours(0, 0, 0, 0);
              if (this.exPr) {
                this.prYear = this.exPr.split('/')[1];
              }
              if (this.prNo) {
                this.prYear = this.prNo.split('/')[1];
              }
              if (this.crNo) {
                this.prYear = this.crNo.split('/')[1];
              }
              const currentYear = new Date().getFullYear().toString();
              if (this.prYear === currentYear) {
                this.maxJoiningDate = new Date(); // Set maxJoiningDate to the current date
              } else {
                // Set maxJoiningDate to the end of prYear (31st December)
                this.maxJoiningDate = new Date(this.prYear, 11, 31); // December 31 of prYear
              }
              this.validateJoiningDate();
            }
           
               
            
            if (response.prNo) {
              this.isReadonly = true;
            } else {
              this.isReadonly = false;
            }
          }
          else {
            this.noOfPRsofar = response.noOfPRsofar;
            alert('Invalid credentials. Please try again.');
          }
        },
      );
    }
  }



  onFieldSelect(value: string): void {
    this.cdr.detectChanges();
    this.selectedField = value;
    this.fileUploadError = null;
    this.fileUploadError = '';
  }

  rankTypeOptions = [
    { value: 'direct_officer', label: 'Direct Officer' },
    { value: 'rank_promoter', label: 'Rank Promoter' }
  ];

  Rankselect(value:any): void {
    this.RankNameId = value;
    const showRankNoIds = [1, 2, 3, 10, 11, 15, 26]; 
    const showRankTypeIds = [6, 7, 9, 16, 17, 19];
    this.showRankNo = showRankNoIds.includes(value);
    this.showRankType = showRankTypeIds.includes(value);  
    this.showAdditionalFields = this.showRankNo || this.showRankType;

    this.delinquentFormGroup.patchValue({
      delnquenceRankNo: this.showRankNo ? this.delinquentFormGroup.value.delnquenceRankNo : '', 
      rankType: this.showRankType ? this.delinquentFormGroup.value.rankType : '',
    });

    const selectedRank = this.ranklist.find(rank => rank.rankid === value);
    if (selectedRank) {
      this.delinquentFormGroup.patchValue({
        delnquenceRankMaster: selectedRank.rankname
      });
    }
    const delnquenceRankNoControl = this.delinquentFormGroup.get('delnquenceRankNo');
    if (delnquenceRankNoControl) {
      if (this.showRankNo) {
        delnquenceRankNoControl.setValidators([Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern('^[0-9]{5}$')]);
      } else {
        delnquenceRankNoControl.clearValidators();
        delnquenceRankNoControl.setErrors(null);
      }
      delnquenceRankNoControl.updateValueAndValidity();
    }

    // Handle validation for "Direct Officer / Rank Promoter" dropdown
    const rankTypeControl = this.delinquentFormGroup.get('rankType');
    if (rankTypeControl) {
      if (this.showRankType) {
        rankTypeControl.setValidators([Validators.required]);
      } else {
        rankTypeControl.clearValidators();
        rankTypeControl.setErrors(null);
      }
      rankTypeControl.updateValueAndValidity();
    }
    this.cdr.detectChanges();
}

  StationSelectChange(value: string): void {
    console.log('Selected Station ID:', value);
    this.StationSelect = value; 
  }


  ondetailsOfPunishmentUploadFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.detailsOfPunishmentUploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.detailsOfPunishmentUploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.detailsOfPunishmentUploadFile = null;
    }
  }


  ondateOfFinalOrderuploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfFinalOrderuploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfFinalOrderuploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfFinalOrderuploadFile = null;
    }
  }


  ondateOfFrFurnishedUploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfFrFurnisheduploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfFrFurnisheduploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfFrFurnisheduploadFile = null;
    }
  }

  ondateOfServingOfMinuteuploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfServingOfMinuteuploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfServingOfMinuteuploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfServingOfMinuteuploadFile = null;
    }
  }


  ondateOfFrCallingMemoAlongWithMinuteuploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfFrCallingMemoAlongWithMinuteuploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfFrCallingMemoAlongWithMinuteuploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfFrCallingMemoAlongWithMinuteuploadFile = null;
    }
  }


  ondateOfMinutesDrawnUploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfMinutesDrawnuploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfMinutesDrawnuploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfMinutesDrawnuploadFile = null;
    }
  }


  ondateOfEnquiryOfficerUploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfEnquiryOfficeruploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfEnquiryOfficeruploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfEnquiryOfficeruploadFile = null;
    }
  }


  ondateOfAppointmentOfEnquiryOfficerUploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfAppointmentOfEnquiryOfficeruploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfAppointmentOfEnquiryOfficeruploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfAppointmentOfEnquiryOfficeruploadFile = null;
    }
  }


  ondateOfDefenceStatementuploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfDefenceStatementuploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfDefenceStatementuploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfDefenceStatementuploadFile = null;
    }
  }


  onchargeMemoAcknowledgedDateuploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.chargeMemoAcknowledgedDateuploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.chargeMemoAcknowledgedDateuploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.chargeMemoAcknowledgedDateuploadFile = null;
    }
  }

  onchargeMemoApprovedDateUploadFileSelected(event:Event){
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.chargeMemoApprovedDateUploadFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.chargeMemoApprovedDateUploadFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.chargeMemoApprovedDateUploadFile = null;
    }
  }

  isChargeMemoApprovedDateValid(): boolean {
    return this.updateSequenceFormGroup.get('chargeMemoApprovedDate')!.valid &&
      this.updateSequenceFormGroup.get('chargeMemoApprovedDateRemarks')!.valid;
      this.updateSequenceFormGroup.get('chargeMemoApprovedDateUploadFile')!.valid;
  }

  isChargeMemoAcknowledgedDateValid(): boolean {
    return this.updateSequenceFormGroup.get('chargeMemoAcknowledgedDate')!.valid &&
      this.updateSequenceFormGroup.get('chargeMemoAcknowledgedDateRemarks')!.valid;
      this.updateSequenceFormGroup.get('chargeMemoAcknowledgedDateuploadFile')!.valid;
  }

  isDateOfDefenceStatementValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfDefenceStatement')!.valid &&
      this.updateSequenceFormGroup.get('dateOfDefenceStatementRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfDefenceStatementuploadFile')!.valid;
  }

  isDateOfAppointmentOfEnquiryOfficerValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfAppointmentOfEnquiryOfficer')!.valid &&
      this.updateSequenceFormGroup.get('dateOfAppointmentOfEnquiryOfficerRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfAppointmentOfEnquiryOfficeruploadFile')!.valid;
  }

  isDateOfEnquiryOfficerValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfEnquiryOfficer')!.valid &&
      this.updateSequenceFormGroup.get('dateOfEnquiryOfficerRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfEnquiryOfficeruploadFile')!.valid;
  }

  isDateOfMinutesDrawnValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfMinutesDrawn')!.valid &&
      this.updateSequenceFormGroup.get('dateOfMinutesDrawnRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfMinutesDrawnuploadFile')!.valid;
  }

  isDateOfFrCallingMemoAlongWithMinuteValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfFrCallingMemoAlongWithMinute')!.valid &&
      this.updateSequenceFormGroup.get('dateOfFrCallingMemoAlongWithMinuteRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfFrCallingMemoAlongWithMinuteuploadFile')!.valid;
  }

  isDateOfServingOfMinuteValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfServingOfMinute')!.valid &&
      this.updateSequenceFormGroup.get('dateOfServingOfMinuteRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfServingOfMinuteuploadFile')!.valid;
  }

  isDateOfFrFurnishedValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfFrFurnished')!.valid &&
      this.updateSequenceFormGroup.get('dateOfFrFurnishedRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfFrFurnisheduploadFile')!.valid;
  }

  isDateOfFinalOrderValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfFinalOrder')!.valid &&
      this.updateSequenceFormGroup.get('dateOfFinalOrderRemarks')!.valid;
      this.updateSequenceFormGroup.get('dateOfFinalOrderuploadFile')!.valid;
  }

  isAppealOrderValid(): boolean {
    const dateOfAppealOrder = this.updateSequenceFormGroup.get('dateOfAppealOrder');
    const appealStatus = this.updateSequenceFormGroup.get('appealStatus');
    const detailofPunishmentAppeal = this.updateSequenceFormGroup.get('detailofPunishmentAppeal');
    const appealRemark = this.updateSequenceFormGroup.get('appealRemark');
    const appealOrderFile = this.updateSequenceFormGroup.get('apppealOrderFile');
  
    return (dateOfAppealOrder?.valid ?? false) &&
           (appealStatus?.valid ?? false) &&
           (detailofPunishmentAppeal?.valid ?? false) &&
           (appealRemark?.valid ?? false) &&
           (appealOrderFile?.valid ?? false);
  }

  isRevisionOrderValid(): boolean {
    const dateOfRevisionOrder = this.updateSequenceFormGroup.get('dateOfRevisionOrder');
    const revisionStatus = this.updateSequenceFormGroup.get('revisionStatus');
    const detailofPunishmentRevision = this.updateSequenceFormGroup.get('detailofPunishmentRevision');
    const revisionRemark = this.updateSequenceFormGroup.get('revisionRemark');
    const revisionOrderFile = this.updateSequenceFormGroup.get('revisionOrderFile');

    return (dateOfRevisionOrder?.valid ?? false) &&
           (revisionStatus?.valid ?? false) &&
           (detailofPunishmentRevision?.valid ?? false) &&
           (revisionRemark?.valid ?? false) &&
           (revisionOrderFile?.valid ?? false);
  }

  isReviewOrderValid(): boolean {
    const dateOfReviewOrder = this.updateSequenceFormGroup.get('dateOfReviewOrder');
    const reviewStatus = this.updateSequenceFormGroup.get('reviewStatus');
    const detailofPunishmentReview = this.updateSequenceFormGroup.get('detailofPunishmentReview');
    const reviewOrderFile = this.updateSequenceFormGroup.get('reviewOrderFile');

    return (dateOfReviewOrder?.valid ?? false) &&
           (reviewStatus?.valid ?? false) &&
           (detailofPunishmentReview?.valid ?? false) &&
           (reviewOrderFile?.valid ?? false);
  }

  isCourtOrderValid(): boolean {
    const dateOfCourtOrder = this.updateSequenceFormGroup.get('dateOfCourtOrder');
    const courtStatus = this.updateSequenceFormGroup.get('courtStatus');
    const detailofPunishmentCourt = this.updateSequenceFormGroup.get('detailofPunishmentCourt');
    const courtRemark = this.updateSequenceFormGroup.get('courtRemark');
    const courtOrderFile = this.updateSequenceFormGroup.get('courtOrderFile');

    return (dateOfCourtOrder?.valid ?? false) &&
           (courtStatus?.valid ?? false) &&
           (detailofPunishmentCourt?.valid ?? false) &&
           (courtRemark?.valid ?? false) &&
           (courtOrderFile?.valid ?? false);
  }

  isSecondFormGroupValid(): boolean {
    return this.updateSequenceFormGroup.valid &&
      this.chargeMemoApprovedDateUploadFile !== null &&
      this.chargeMemoAcknowledgedDateuploadFile !== null &&
      this.dateOfDefenceStatementuploadFile !== null &&
      this.dateOfAppointmentOfEnquiryOfficeruploadFile !== null &&
      this.dateOfEnquiryOfficeruploadFile !== null &&
      this.dateOfMinutesDrawnuploadFile !== null &&
      this.dateOfFrCallingMemoAlongWithMinuteuploadFile !== null &&
      this.dateOfServingOfMinuteuploadFile !== null &&
      this.dateOfFrFurnisheduploadFile !== null &&
      this.dateOfFinalOrderuploadFile !== null &&
      this.appealOrderFile !== null;
  }


  onSubmit(): void {
    if (this.delinquentFormGroup.valid || this.updateSequenceFormGroup.valid || this.prForm.valid) {

      const formData=new FormData();
      formData.append('majorPrBoo',JSON.stringify({
      officertype:this.delinquentFormGroup.value.officertype,
      delnquenceName: this.delinquentFormGroup.value.delnquenceName,
      delnquenceRankNo: this.delinquentFormGroup.value.delnquenceRankNo,
      delnquenceRankMaster: this.delinquentFormGroup.value.delnquenceRankMaster,
      delnquenceRankMasterId: this.delinquentFormGroup.value.delnquenceRankMasterId,
      rankType: this.delinquentFormGroup.value.rankType,
      ifhrmsNo: this.delinquentFormGroup.value.ifhrmsNo,
      dateOfBirth: this.delinquentFormGroup.value.dateOfBirth,
      dateOfEnlishment: this.delinquentFormGroup.value.dateOfEnlishment,
      dateOfRetiredment: this.delinquentFormGroup.value.dateOfRetiredment,
      policeStationId: this.delinquentFormGroup.value.policeStationId,
      dateOfJoiningInPresentPost: this.delinquentFormGroup.value.dateOfJoiningInPresentPost,
      mobileNo: this.delinquentFormGroup.value.mobileNo,
      noOfPRsofar: this.delinquentFormGroup.value.noOfPRsofar,
      dateOfOccurance: this.delinquentFormGroup.value.dateOfOccurance,
      placeOfOccurance: this.delinquentFormGroup.value.placeOfOccurance,
      prchargesList: this.delinquentFormGroup.value.prchargesList,
      allUnitsId:this.unitId,
      unitTypeId:this.usertypeId,
      prSectionNo:this.selectedPunishment,
      // overallPrNumber:this.prNo,

      overallPrNumber:this.prNo || this.crNo || this.exPr,

      //Second Form Group
      chargeMemoApprovedDate: this.updateSequenceFormGroup.value.chargeMemoApprovedDate,
      chargeMemoApprovedDateRemarks: this.updateSequenceFormGroup.value.chargeMemoApprovedDateRemarks,
      // chargeMemoApprovedDateUploadFile: this.updateSequenceFormGroup.value.chargeMemoApprovedDateUploadFile,

      chargeMemoAcknowledgedDate: this.updateSequenceFormGroup.value.chargeMemoAcknowledgedDate,
      chargeMemoAcknowledgedDateRemarks: this.updateSequenceFormGroup.value.chargeMemoAcknowledgedDateRemarks,
      // chargeMemoAcknowledgedDateuploadFile: this.updateSequenceFormGroup.value.chargeMemoAcknowledgedDateuploadFile,

      dateOfDefenceStatement: this.updateSequenceFormGroup.value.dateOfDefenceStatement,
      dateOfDefenceStatementRemarks: this.updateSequenceFormGroup.value.dateOfDefenceStatementRemarks,
      // dateOfDefenceStatementuploadFile: this.updateSequenceFormGroup.value.dateOfDefenceStatementuploadFile,

      dateOfAppointmentOfEnquiryOfficer: this.updateSequenceFormGroup.value.dateOfAppointmentOfEnquiryOfficer,
      dateOfAppointmentOfEnquiryOfficerRemarks: this.updateSequenceFormGroup.value.dateOfAppointmentOfEnquiryOfficerRemarks,
      // dateOfAppointmentOfEnquiryOfficeruploadFile: this.updateSequenceFormGroup.value.dateOfAppointmentOfEnquiryOfficeruploadFile,

      dateOfEnquiryOfficer: this.updateSequenceFormGroup.value.dateOfEnquiryOfficer,
      dateOfEnquiryOfficerRemarks: this.updateSequenceFormGroup.value.dateOfEnquiryOfficerRemarks,
      // dateOfEnquiryOfficeruploadFile: this.updateSequenceFormGroup.value.dateOfEnquiryOfficeruploadFile,

      dateOfMinutesDrawn: this.updateSequenceFormGroup.value.dateOfMinutesDrawn,
      dateOfMinutesDrawnRemarks: this.updateSequenceFormGroup.value.dateOfMinutesDrawnRemarks,
      // dateOfMinutesDrawnuploadFile: this.updateSequenceFormGroup.value.dateOfMinutesDrawnuploadFile,

      dateOfFrCallingMemoAlongWithMinute: this.updateSequenceFormGroup.value.dateOfFrCallingMemoAlongWithMinute,
      dateOfFrCallingMemoAlongWithMinuteRemarks: this.updateSequenceFormGroup.value.dateOfFrCallingMemoAlongWithMinuteRemarks,
      // dateOfFrCallingMemoAlongWithMinuteuploadFile: this.updateSequenceFormGroup.value.dateOfFrCallingMemoAlongWithMinuteuploadFile,

      dateOfServingOfMinute: this.updateSequenceFormGroup.value.dateOfServingOfMinute,
      dateOfServingOfMinuteRemarks: this.updateSequenceFormGroup.value.dateOfServingOfMinuteRemarks,
      // dateOfServingOfMinuteuploadFile: this.updateSequenceFormGroup.value.dateOfServingOfMinuteuploadFile,

      dateOfFrFurnished: this.updateSequenceFormGroup.value.dateOfFrFurnished,
      dateOfFrFurnishedRemarks: this.updateSequenceFormGroup.value.dateOfFrFurnishedRemarks,
      // dateOfFrFurnisheduploadFile: this.updateSequenceFormGroup.value.dateOfFrFurnisheduploadFile,

      dateOfFinalOrder: this.updateSequenceFormGroup.value.dateOfFinalOrder,
      dateOfFinalOrderRemarks: this.updateSequenceFormGroup.value.dateOfFinalOrderRemarks,
      // dateOfFinalOrderuploadFile: this.updateSequenceFormGroup.value.dateOfFinalOrderUploadFile,

      detailsOfPunishment: this.updateSequenceFormGroup.value.detailsOfPunishment,
      detailsOfPunishmentRemarks: this.updateSequenceFormGroup.value.detailsOfPunishmentRemarks,
      // detailsOfPunishmentUploadFile: this.updateSequenceFormGroup.value.detailsOfPunishmentUploadFile,
      createdDate: this.createdDate,
      remarks: this.prForm.value.remarks

      })
      );


    if(this.detailsOfPunishmentUploadFile){
      formData.append('detailsOfPunishmentUploadFile',this.detailsOfPunishmentUploadFile);
    }

    if(this.dateOfFinalOrderuploadFile){
      formData.append('dateOfFinalOrderuploadFile',this.dateOfFinalOrderuploadFile);
    }

    if(this.dateOfFrFurnisheduploadFile){
      formData.append('dateOfFrFurnisheduploadFile',this.dateOfFrFurnisheduploadFile);
    }

    if(this.dateOfServingOfMinuteuploadFile){
      formData.append('dateOfServingOfMinuteuploadFile',this.dateOfServingOfMinuteuploadFile);
    }

    if(this.dateOfFrCallingMemoAlongWithMinuteuploadFile){
      formData.append('dateOfFrCallingMemoAlongWithMinuteuploadFile',this.dateOfFrCallingMemoAlongWithMinuteuploadFile);
    }

    if(this.dateOfMinutesDrawnuploadFile){
      formData.append('dateOfMinutesDrawnuploadFile',this.dateOfMinutesDrawnuploadFile);
    }

    if(this.dateOfEnquiryOfficeruploadFile){
      formData.append('dateOfEnquiryOfficeruploadFile',this.dateOfEnquiryOfficeruploadFile);
    }

    if(this.dateOfAppointmentOfEnquiryOfficeruploadFile){
      formData.append('dateOfAppointmentOfEnquiryOfficeruploadFile',this.dateOfAppointmentOfEnquiryOfficeruploadFile);
    }

    if(this.dateOfDefenceStatementuploadFile){
      formData.append('dateOfDefenceStatementuploadFile',this.dateOfDefenceStatementuploadFile);
    }

    if(this.chargeMemoAcknowledgedDateuploadFile){
      formData.append('chargeMemoAcknowledgedDateuploadFile',this.chargeMemoAcknowledgedDateuploadFile);
    }

    if(this.chargeMemoApprovedDateUploadFile){
      formData.append('chargeMemoApprovedDateUploadFile',this.chargeMemoApprovedDateUploadFile);
    }

    if(this.majorPrIdss){
      formData.append('majorPrId',this.majorPrIdss);
    }


 
    this.majorPrSourceService.saveMajorPRData(formData).subscribe(data=>{

      // console.log('Data saved locally:', formData);
      this.snackBar.open('Data saved successfully!', 'Close', {
        duration: 3000,
      });
      if (null != this.prSectionNo) {
        this.router.navigate([`/major-pr-tabledata/${this.prSectionNo}/${this.usertypeId}/${this.unitId}/${this.unitTypeName}`]);
      } else {
        this.router.navigate([`/major-pr-tabledata/${this.usertypeId}/${this.unitId}/${this.unitTypeName}`]);
      }
    });
  } else {
    console.log('Form is invalid');
    this.delinquentFormGroup.markAllAsTouched();
    this.updateSequenceFormGroup.markAllAsTouched();
    this.prForm.markAllAsTouched();
  }
}


downloadFilechargeMemoApprovedDateFile() {
  const fileName = this.updateSequenceFormGroup.get('chargeMemoApprovedDateUploadFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download.!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFilechargeMemoApprovedDateFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

  

downloadFilechargeMemoAcknowledgedDateFile() {
  const fileName = this.updateSequenceFormGroup.get('chargeMemoAcknowledgedDateUploadFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFilechargeMemoAcknowledgedDateFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });

}

downloadFiledateOfDefenceStatementFile() {
  const fileName = this.updateSequenceFormGroup.get('dateOfDefenceStatementUploadFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfDefenceStatementFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });

}


downloadFiledateOfAppointmentOfEnquiryOfficerFile(){
  const fileName = this.updateSequenceFormGroup.get('dateOfAppointmentOfEnquiryOfficerFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfAppointmentOfEnquiryOfficerFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });

}


downloadFiledateOfEnquiryOfficerFile(){
  const fileName = this.updateSequenceFormGroup.get('dateOfEnquiryOfficerFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfEnquiryOfficerFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

downloadFiledateOfMinutesDrawnFile(){
  const fileName = this.updateSequenceFormGroup.get('dateOfMinutesDrawnFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfMinutesDrawnFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

downloadFiledateOfFrCallingMemoAlongWithMinuteFile(){
  const fileName = this.updateSequenceFormGroup.get('dateOfFrCallingMemoAlongWithMinuteFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfFrCallingMemoAlongWithMinuteFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

downloadFiledateOfServingOfMinuteFile(){
  const fileName = this.updateSequenceFormGroup.get('dateOfServingOfMinuteFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfServingOfMinuteFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

downloadFiledateOfFrFurnishedFile(){
  const fileName = this.updateSequenceFormGroup.get('dateOfFrFurnishedFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfFrFurnishedFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

downloadFiledateOfFinalOrderFiles(){
  const fileName = this.updateSequenceFormGroup.get('dateOfFinalOrderFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledateOfFinalOrderFiles(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}

downloadFiledetailsOfPunishmentUploadFile(){
  const fileName = this.updateSequenceFormGroup.get('detailsOfPunishmentUploadFile')?.value;
  if (!fileName) {
    this.snackBar.open('No file available for download!', 'Close', {
      duration: 3000,
    });
    return;
  }
  this.majorPrSourceService.downloadFiledetailsOfPunishmentUploadFile(fileName).subscribe(response => {
    const blob = new Blob([response], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and download the file.
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    this.snackBar.open('The file has been downloaded successfully!', 'Close', {
      duration: 3000,
    });
  }, error => {
    console.error('Error downloading file', error);
    this.snackBar.open('The file download failed!', 'Close', {
      duration: 3000,
    });
  });
}



  openConfirmationDialog(): void {
      if (this.isFormDirty) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '450px',                
          disableClose: true,      
          //  panelClass: 'custom-dialog-container'
        });
        
        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            this.router.navigate([`/pr-dashboard/${this.usertypeId}/${this.unitId}/${this.unitTypeName}`]);
          } else {
            console.log("Cancelled!");
          }
        });
      } else {
        this.router.navigate([`/pr-dashboard/${this.usertypeId}/${this.unitId}/${this.unitTypeName}`]);
      }
    }
}