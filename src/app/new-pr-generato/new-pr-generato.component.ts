import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'
import { PrSourceService } from '../pr-source.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MessageServiceService } from '../message-service.service';
import {MatRadioModule} from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-new-pr-generato',
  imports: [
    // FormsModule,
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
    StaticHeaderComponent,
    MatRadioModule,
    MatTableModule
  ],
  templateUrl: './new-pr-generato.component.html',
  styleUrl: './new-pr-generato.component.css',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    {
      provide: MAT_DATE_FORMATS, useValue: {
        parse: {
          dateInput: 'DD/MM/YYYY',
        },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'DD/MM/YYYY',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      }
    },
  ],
})
export class NewPrGeneratoComponent {
  // @ViewChild(MatSelect) matSelect: MatSelect | undefined;
  isReadonly: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;
  delinquentFormGroup!: FormGroup;
  updateSequenceFormGroup: FormGroup;
  coDelinguentFormGroup: FormGroup;
  addCoDelinquentFormGroup: FormGroup;
  finalRemarksFormGroup: FormGroup;
  delinquencyDetailInput = new FormControl<string>('', [Validators.required,Validators.maxLength(300)]);
  selectedField: string = '';
  delnquenceRankMaster: string = '';
  selectedPunishment!: string;
  RankselectedField: string = '';
  RankNameId: any;
  mobileNo: any;
  StationSelect: any;
  detailsOfPunishmentFile!: File | null;
  dateOfFinalOrderFile!: File | null;
  dateOfExplanationFile!: File | null;
  appealOrderFile!: File | null;
  // sCNAckDateFile!: File | null;
  // sCNApprovedDateFile!: File | null;
  sCNAckDateFile!: any | null;
  sCNApprovedDateFile!: any | null;
  apppealOrderFile!: any | null;
  prNo: string = '';
  exPr: string = '';
  crNo: string = '';
  punishmentType: String = '';
  sectionType: String = '';
  minorPrIdss: any;
  showAdditionalFields: boolean = false;
  showRankNo: boolean = false;
  showRankType: boolean = false;
  isCoDelinquent: boolean = false;
  usertypeId: any;
  unitId: any;
  dateOfEnlishment: any;
  stationList: any[] = [];
  stationMasterList:any[]=[];
  ranklist: any[] = [];
  codelenquenceRankList: any[] = [];
  unitsList:any[] = [];
  coDelenquentPlaceList:any[]=[];
  noOfPRsofar: any;
  delnquenceName: any;
  CodelnquenceName: string = '';
  dateOfBirth: any;
  minorPrId: any;
  isEditing: boolean = false;
  // dateOfEnlistment:any;
  editingCountIndex: number | null = null;
  prSectionNo: any;
  delnquenceRankMasterId: any;
  // uploadedFileNames: { [key: string]: string } = {};
  fileUploadError: string | null = null;
  minDate!: Date;
  minEnlistmentDate: Date | null = null;
  minJoiningDate: Date;
  occuranceDate!: Date;
  minscnAckSelectDate!: Date;
  cityDropdown:boolean=false;
  maxscnAckSelectDate!: Date;
  minscnApproveDate!: Date;
  minscnFinalOrderSelectDate!: Date;
  maxscnFinalOrderSelectDate!: Date;
  minscnExplanationSelectDate!: Date;
  maxscnExplanationSelectDate!: Date;
  dateOfBirthSelected: boolean = false;
  dateReadonly: boolean = true;
  isScnApprovedDateSelected = false;
  isScnAckDateSelected = false;
  isDateOfExplanationSelected = false;
  isDateOfFinalOrderSelected = false;
  isScnApprovedDateDisabled = false;
  sequenceSelectedField: string = '';
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
  createdDate: any;
  prYear: any;
  prsection:any;
  maxscnApproveDate: Date | null = null;
  citiesList:any;
  action: any;
  codelenquenceRankname!:string;
  selectedRankId!: number;
  isFormDirty: boolean = false;
  messagess: any;
  ifhrmsno: any;
  submittedData: any[] = [];
  codelinquentEditing = false;
  currentEditIndex: number | null = null;
  dataSource = new MatTableDataSource<any>([]);
  districtDropdown:boolean=true;
   editIsCodelenquence:boolean=false;
  distUnitTypeId:any;
  cityUnitTypeId:any;
  editStationId:boolean=true;
  previousStationId: number | null = null;
  coDelenquentPresent!:boolean;
  noOfCodelenquent:any;
  editCodelenquentSatationId:any;
 coDelenquentList: any[]=[];
 cityDistTypeId:any

  displayedColumns: string[] = [
    'coDelenquenceIfhrmsNo',
    'coDelenquenceName',
    'coDelnquenceRank',
    'coDelnquenceRankNo',
    'coDelinquentWorkingPlace',
    // 'coDelinquenplace',
    'actions'
  ];
  totalprminorsection: any;

  constructor(private fb: FormBuilder, private prSourceService: PrSourceService, private router: Router,private messageServiceService:MessageServiceService,
    private route: ActivatedRoute, private cdr: ChangeDetectorRef, private snackBar: MatSnackBar,public dialog: MatDialog) {

    this.delinquentFormGroup = this.fb.group({
      delnquenceName: ['', Validators.required],
      delnquenceRankMasterId: ['', Validators.required],
      delnquenceRankMaster: ['', Validators.required],
      officertype: ['', Validators.required],
      
      delnquenceRankNo: ['', [Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern('^(?!0+$)[0-9]{3,5}$') ]],
      ifhrmsNo: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      dateOfBirth: [null, Validators.required],
      // dateOfBirth: [null],
      dateOfEnlishment: [null, Validators.required],
      dateOfRetiredment: [null, Validators.required],
      policeStationId: ['', Validators.required],
      // presentWorkingPlace: [''],
      dateOfJoiningInPresentPost: [null, Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      noOfPRsofar: ['', Validators.required],
      dateOfOccurance: ['', Validators.required],
      placeOfOccurance: ['', Validators.required],
      prchargesList: this.fb.array([], this.minLengthArray(1)),
    });

    this.coDelinguentFormGroup = this.fb.group({
      // isCodelenquence:[''],
      // noOfCoDelenquence: [''],
      coDelenquenceIfhrmsNo: [''],
      coDelenquenCaseNo: [''],
      coDelenquenceName: [''],
      coDelnquenceRankMasterId: [''],
      coDelnquenceRankNo: [''],
      coDelnquenceWorkingPlace: [''],
      // coDelinquenplace: [''],
      districtMasterId:[''],
      cityMasterId:[''],
      coDelenquenceStationId:[''],
    });

    this.addCoDelinquentFormGroup =this.fb.group({
      isCoDelenquence: [''],
      noOfCoDelenquence: [''],
    });

    this.updateSequenceFormGroup = this.fb.group({
      sCNApprovedDate: ['', Validators.required],
      sCNApprovedDateRemark: ['', [Validators.required,Validators.maxLength(500)]],
      sCNApprovedDateFile: ['', Validators.required],
      sCNAckDate: ['', Validators.required],
      sCNAckDateRemarks: ['', [Validators.required,Validators.maxLength(500)]],
      sCNAckDateFile: ['', Validators.required],
      dateOfExplanation: ['', Validators.required],
      dateOfExplanationRemarks: ['', [Validators.required,Validators.maxLength(500)]],
      dateOfExplanationFile: ['', Validators.required],
      dateOfFinalOrder: ['', Validators.required],
      dateOfFinalOrderRemarks: ['', [Validators.required,Validators.maxLength(500)]],
      dateOfFinalOrderFile: ['', Validators.required],
      detailsOfPunishment: ['', [Validators.required,Validators.maxLength(500)]],
      dateOfAppealOrder: ['', Validators.required],
      appealStatus: ['', Validators.required],
      detailofPunishmentAppeal: ['', [Validators.required,Validators.maxLength(500)]],
      appealRemark: ['', [Validators.required,Validators.maxLength(500)]],
      apppealOrderFile: ['', Validators.required],
      dateOfRevisionOrder: ['', Validators.required],
      revisionStatus: ['', Validators.required],
      detailofPunishmentRevision: ['', [Validators.required,Validators.maxLength(500)]],
      revisionRemark: ['', [Validators.required,Validators.maxLength(500)]],
      revisionOrderFile: ['', Validators.required],
      dateOfReviewOrder: ['', Validators.required],
      reviewStatus: ['', Validators.required],
      detailofPunishmentReview: ['', [Validators.required,Validators.maxLength(500)]],
      reviewOrderFile: ['', Validators.required],
      dateOfCourtOrder: ['', Validators.required],
      courtStatus: ['', Validators.required],
      detailofPunishmentCourt: ['', [Validators.required,Validators.maxLength(500)]],
      courtRemark: ['', [Validators.required,Validators.maxLength(500)]],
      courtOrderFile: ['', Validators.required],
      // detailsOfPunishmentRemark: ['', [Validators.required,Validators.maxLength(500)]],
      // detailsOfPunishmentFile: ['', Validators.required],
      createdDate: [''],
      // uploadFile: [''],

    });

    this.finalRemarksFormGroup = this.fb.group({
      remarks: ['', [Validators.required,Validators.maxLength(500)]],
    });
    this.minJoiningDate = new Date()
    // this.onValueChanges();

    this.delinquentFormGroup.valueChanges.subscribe(() => {
      this.isFormDirty = this.delinquentFormGroup.dirty;
    });
    this.updateSequenceFormGroup.valueChanges.subscribe(() => {
      this.isFormDirty = this.updateSequenceFormGroup.dirty;
    });
    this.finalRemarksFormGroup.valueChanges.subscribe(() => {
    this.isFormDirty = this.finalRemarksFormGroup.dirty;
    });
  }

  coDelenquenceRankList(){
    this.prSourceService.coDelenquenceRankList().subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.codelenquenceRankList = response;
        } else {
          alert('Invalid credentials. Please try again.');
        }
      });
  }

  ngOnInit(): void {

    this.cityUnitTypeId=0;
  this.distUnitTypeId=0;

    this.route.params.subscribe(params => {

      this.minorPrIdss = params['minorPrIdss'];
      this.prSectionNo = params['prSectionNo'];
      if (this.minorPrIdss) {
        this.isEditing = true;
        this.editPRMethod();
        this.editranklist();
      }
    });

    this.coDelenquenceRankList();




    this.usertypeId = sessionStorage.getItem('usertype');
    this.unitId = sessionStorage.getItem('unitid');
    this.unitTypeName = sessionStorage.getItem('unitTypeName')

    this.prSourceService.stationlist(this.usertypeId, this.unitId).subscribe(
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

          this.prSourceService.ranklist(this.selectedPunishment).subscribe(
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

  onCoDelinquentChange(value: boolean) {
    this.isCoDelinquent = value;
    this.coDelenquentPresent=value;
    this.addCoDelinquentFormGroup.reset();
    this.cdr.detectChanges();
  }
  
  CoDelinquentAdd() {
    this.editIsCodelenquence=false;
    this.editStationId=true;
    if(this.addCoDelinquentFormGroup){
      this.coDelenquentPresent=this.coDelenquentPresent;
      this.noOfCodelenquent=this.addCoDelinquentFormGroup.value.noOfCoDelenquence;
    }
    if (this.coDelinguentFormGroup.valid) {
      const formValue = this.coDelinguentFormGroup.value;
      
      if (this.codelinquentEditing && this.currentEditIndex !== null) {
        this.submittedData[this.currentEditIndex] = formValue;
      } else {
        this.submittedData.push(formValue);
      }
      
      // Update dataSource
      this.dataSource.data = [...this.submittedData];
      
      this.codelinquentEditing = false;
      this.currentEditIndex = null;
      this.coDelinguentFormGroup.reset();
      console.log("submittedData"+this.submittedData);
    }this.occuranceDate
  }
  
  editCoDelinquent(index: number) {
    this.currentEditIndex = index;
    this.codelinquentEditing = true;
    this.coDelinguentFormGroup.patchValue(this.submittedData[index]);
  }
  
  deleteCoDelinquent(index: number) {
    this.submittedData.splice(index, 1);
    this.dataSource.data = [...this.submittedData];
    this.currentEditIndex = null;
    this.codelinquentEditing = false;
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
  onDateOfOccurance(event: any) {
    const occuranceDate = event.value;
    if (occuranceDate) {
      this.minscnApproveDate = new Date(occuranceDate);
      this.minscnApproveDate.setDate(this.minscnApproveDate.getDate() + 1);

      this.maxscnApproveDate = new Date();



    }
  }
  scnAckDateChange(event: any) {

    const scnAckdate = event.value;
    if (scnAckdate) {
      this.minscnAckSelectDate = new Date(scnAckdate);
      this.minscnAckSelectDate.setDate(this.minscnAckSelectDate.getDate() + 1);

      this.maxscnAckSelectDate = new Date();
    }
  }
  scnExplanationDateChange(event: any) {
    const dateOfExplanation = event.value;
    if (dateOfExplanation) {
      this.minscnExplanationSelectDate = new Date(dateOfExplanation);
      this.minscnExplanationSelectDate.setDate(this.minscnExplanationSelectDate.getDate() + 1);

      this.maxscnExplanationSelectDate = new Date();

    }

  }
  scnFinalOrderDateChange(event: any) {
    const dateOfFinalOrder = event.value;
    if (dateOfFinalOrder) {
      this.minscnFinalOrderSelectDate = new Date(dateOfFinalOrder);
      this.minscnFinalOrderSelectDate.setDate(this.minscnFinalOrderSelectDate.getDate() + 1);

      this.maxscnFinalOrderSelectDate = new Date();

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


  editranklist() {
    this.prSourceService.ranklist(this.prSectionNo).subscribe(
      (response) => {

        if (response && response.length > 0) {
          this.ranklist = response; // Assign the response to stationList
        } else {
          alert('Invalid credentials. Please try again.');
        }
      });

  }

  

  editPRMethod() {
    
    this.prSourceService.getEditFlowData(this.minorPrIdss).subscribe(
      (response) => {
        debugger
        console.log(response);
        this.download1 = response.sCNApprovedDateFilename ? true : false;
        this.download2 = response.sCNAckDateFile ? true : false;
        this.download3 = response.dateOfExplanationFileName ? true : false;
        this.download4 = response.dateOfFinalOrderFileName ? true : false;
        this.download5 = response.detailsOfPunishmentFileName ? true : false;
        this.delinquentFormGroup.patchValue({
          delnquenceRankMasterId: response.delnquenceRankMasterId || '',
          delnquenceName: response.delnquenceName || '',
          delnquenceRankMaster: response.delnquenceRankMaster || '',
          delnquenceRankNo: response.delnquenceRankNo || '',
          delinquencyDetails: response.prchargesList || '',
          officertype: response.officertype || '',

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

        this.delinquencyDetails = this.fb.array([]);

        // response data push
        // response.prchargesList.forEach((item: any) => {
        //   // Assuming `item` has the 'offence' field
        //   const offence = Object.values(item).join(''); // Join the values to form the offence string
        //   this.delinquencyDetails.push(this.fb.group({ offence }));
        // });

        response.prchargesList.forEach((item: any) => {
          this.delinquencyDetails.push(this.fb.group({ 
            prChargeNo: [item.prChargeNo || ''], 
            prCountofCharges: [item.prCountofCharges || '']
          }));
        });

        this.addCoDelinquentFormGroup.patchValue({
          isCoDelenquence: response.isCoDelenquence || '',
          noOfCoDelenquence: response.noOfCoDelenquence || '',
        });
        this.isCoDelinquent=response.isCoDelenquence || '',
        this.submittedData=response.coDelenquenceList;
        this.dataSource.data = [...this.submittedData];
         
        
        // this.coDelinguentFormGroup.patchValue({
        //   coDelenquenceIfhrmsNo: response.coDelenquenceIfhrmsNo,
        //   coDelenquenCaseNo: [''],
        //   coDelenquenceName: [''],
        //   coDelnquenceRankMasterId: [''],
        //   coDelnquenceRankNo: [''],
        //   coDelnquenceWorkingPlace: [''],
        //   // coDelinquenplace: [''],
        //   districtMasterId:[''],
        //   cityMasterId:[''],
        //   coDelenquenceStationId:[''],
        // });
    
         


        this.updateSequenceFormGroup.patchValue({
          sCNApprovedDate: response.sCNApprovedDate || '',
          download: response.sCNApprovedDateFilename || '',
          sCNApprovedDateRemark: response.sCNApprovedDateRemark || '',
          sCNApprovedDateFile: response.sCNApprovedDateFilename || '',
          sCNAckDate: response.sCNAckDate || '',
          sCNAckDateRemarks: response.sCNAckDateRemarks || '',
          sCNAckDateFile: response.sCNAckDateFile || '',
          dateOfExplanation: response.dateOfExplanation || '',
          dateOfExplanationRemarks: response.dateOfExplanationRemarks || '',
          dateOfExplanationFile: response.dateOfExplanationFileName || '',
          dateOfFinalOrder: response.dateOfFinalOrder || '',
          dateOfFinalOrderRemarks: response.dateOfFinalOrderRemarks || '',
          dateOfFinalOrderFile: response.dateOfFinalOrderFileName || '',

          detailsOfPunishment: response.detailsOfPunishment || '',
          detailsOfPunishmentRemark: response.detailsOfPunishmentRemark || '',
          detailsOfPunishmentFile: response.detailsOfPunishmentFileName || '',
          delnquenceRankMasterId: response.delnquenceRankMasterId || '',
          delnquenceRankMaster: response.delnquenceRankMaster || '',
        });

        this.finalRemarksFormGroup.patchValue({
          remarks: response.remarks || '',
        });


        // You can also set additional properties if required
        this.selectedField = response.selectedField || '';
        this.selectedPunishment = response.selectedPunishment || '';
        this.RankselectedField = response.RankselectedField || '';
        this.RankNameId = response.RankNameId || '';
        this.delnquenceRankMasterId = response.delnquenceRankMasterId || '',
          this.delnquenceRankMaster = response.delnquenceRankMaster || '',
          // this.StationSelect = response.StationSelect || null;
          this.selectedPunishment = response.prSectionNo || null;
        this.prNo = `${response.prNo}/${response.year}/${response.unitShortcode}`;
        this.minorPrIdss = response.minorPrId;
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
          this.minscnApproveDate = new Date(response.dateOfOccurance);
          this.minscnApproveDate.setDate(this.minscnApproveDate.getDate() + 1);
          this.maxscnApproveDate = new Date();
        }
        if (response.sCNApprovedDate) {
          this.minscnAckSelectDate = new Date(response.sCNApprovedDate);
          this.minscnAckSelectDate.setDate(this.minscnAckSelectDate.getDate() + 1);
          this.maxscnAckSelectDate = new Date();
        }
        if (response.sCNAckDate) {
          this.minscnExplanationSelectDate = new Date(response.sCNAckDate);
          this.minscnExplanationSelectDate.setDate(this.minscnExplanationSelectDate.getDate() + 1);
          this.maxscnExplanationSelectDate = new Date();
        }
        if (response.dateOfExplanation) {
          this.minscnFinalOrderSelectDate = new Date(response.dateOfExplanation);
          this.minscnFinalOrderSelectDate.setDate(this.minscnFinalOrderSelectDate.getDate() + 1);
          this.maxscnFinalOrderSelectDate = new Date();
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
    // const existingDateOfBirth = this.delinquentFormGroup.get('dateOfBirth')?.value;
    // if (existingDateOfBirth) {
    //   this.onDateOfBirthChange({ value: existingDateOfBirth });
    // }
  }


  get delinquencyDetails(): FormArray {
    return this.delinquentFormGroup.get('prchargesList') as FormArray;
  }

  set delinquencyDetails(value: FormArray) {
    this.delinquentFormGroup.setControl('prchargesList', value);
  }




  // addDelinquencyDetail(): void {
  //   debugger
  //   const inputValue = this.delinquencyDetailInput.value?.trim();

  //   if (inputValue && inputValue.length > 300) {
  //     this.delinquencyDetailInput.markAsTouched();
  //     this.delinquencyDetailInput.updateValueAndValidity();
  //     return;
  //   }
  
  //   if (inputValue) {
  //     const chargeDetail = { offence: inputValue };
  
  //     if (this.editingCountIndex !== null) {
  //       this.delinquencyDetails.at(this.editingCountIndex).setValue(chargeDetail);
  //       this.editingCountIndex = null;
  //     } else {
  //       this.delinquencyDetails.push(new FormControl(chargeDetail));
  //     }
  //     this.delinquencyDetailInput.reset();
  //   }
  // }


  addDelinquencyDetail(): void {
    if (this.editingCountIndex !== null && this.editingCountIndex !== undefined) {
      // Edit mode - existing value update
      this.delinquencyDetails.at(this.editingCountIndex).patchValue({
        prCountofCharges: this.delinquencyDetailInput.value
      });
      
      // Reset edit mode
      this.editingCountIndex = null;
    } else {
      // Add new charge
      this.delinquencyDetails.push(this.fb.group({
        prChargeNo: '', // Default value
        prCountofCharges: this.delinquencyDetailInput.value
      }));
    }
  
    // Clear input field
    this.delinquencyDetailInput.reset();
  }


  removeDelinquencyDetail(index: number): void {
    this.delinquencyDetails.removeAt(index);
    this.delinquencyDetailInput.reset();
  }

  editDelinquencyDetail(index: number): void {
    debugger;
    this.editingCountIndex = index;
    const selectedDetail = this.delinquencyDetails.at(index).value;
    
    // `offence` இல்லாமல் `prCountofCharges` data-ஐ பயன்படுத்தவும்.
    this.delinquencyDetailInput.setValue(selectedDetail.prCountofCharges);
  }

  minLengthArray(min: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control instanceof FormArray) {
        return control.length >= min ? null : { minLengthArray: true };
      }
      return null;
    };
  }

  getCodelenquentDetails(event:Event){
    const inputElement = event.target as HTMLInputElement;
  let inputValue = inputElement.value;
  
  // Keep only numeric characters
  inputValue = inputValue.replace(/\D/g, '');

  if (inputValue.length > 0) {
  
    this.prSourceService.getCodelenquenceDetails(inputValue,this.unitId,this.usertypeId).subscribe(response => {
      if (response) {
        
        this.coDelenquentList = response;
        const firstChar = this.prNo ? this.prNo.split('/')[0] : '';
        if (firstChar) {
          // Add the first character of prNo to the beginning of coDelenquentList
          this.coDelenquentList.unshift({ coDelenquenCaseNo: firstChar });
        }
      }
    });
  }

  }

  onIfhrmsNoChange(event: Event): void {
 
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;
    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 11) {
      inputValue = inputValue.substring(0, 11);
    }
    this.delinquentFormGroup.patchValue({ ifhrmsNo: inputValue });
    console.log(inputValue);
    if (inputValue.length === 11) {
  
      this.prSourceService.prcount(inputValue).subscribe(
        (response) => {
      
          if (response) {
        
            if (response.minorPrId) {
            this.prsection=this.selectedPunishment;
            this.ifhrmsno = response.ifhrmsNo;
            this.delnquenceRankMasterId = response.delnquenceRankMaster;
            this.prSectionNo = response.prSectionNo;
            if(this.prSectionNo!=this.prsection){
          
              let result= this.prSectionNo.split("");
              let results= this.prsection.split("");
if(result.length!=results.length){
if(this.action=='new'){
  this.messageServiceService.setMessage("IFHRMS NO. "+this.ifhrmsno+" belongs to  "+this.delnquenceRankMasterId +", so please select the correct PR section");
  this.router.navigate(['/pr-details'], {queryParams: { action: 'new' }
  });

}
if(this.action=='existing'){
  this.messageServiceService.setMessage("IFHRMS NO. "+this.ifhrmsno+" belongs to  "+this.delnquenceRankMasterId +", so please select the correct PR section");
  this.router.navigate(['/pr-details'], { queryParams: { action: 'existing' } });
  }
  if(this.action=='current'){

    this.messageServiceService.setMessage("IFHRMS NO. "+this.ifhrmsno+" belongs to  "+this.delnquenceRankMasterId +", so please select the correct PR section");
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
            this.ifhrmsno = response.ifhrmsNo;
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
    // if (this.selectedField === 'uploadFile') {
    // Close the dropdown after file upload selection
    // this.closeDropdown();
    // }
  }

  rankTypeOptions = [
    { value: 'direct_officer', label: 'Direct Officer' },
    { value: 'rank_promoter', label: 'Rank Promoter' }
  ];

  getStationNameById(stationId:number): string{

    const station=this.coDelenquentPlaceList.find(s=> s.stationMasterId==stationId);
    return station ? station.stationName :'unKnown Place';

  }
   
   // Method to get rank name based on rank ID
   getRankNameById(rankId: number): string {
    const rank = this.codelenquenceRankList.find(r => r.rankid === rankId);
    return rank ? rank.rankname : 'Unknown Rank';  // Return the rank name or a default value
  }
  Rankselect(value: any): void {
    this.RankNameId = value;
    // this.codelenquenceRankname = this.getRankNameById(value);
    const showRankNoIds = [1, 2, 3, 10, 11, 15, 26]; 
    const showRankTypeIds = [6, 7, 9, 16, 17, 19];
    this.showRankNo = showRankNoIds.includes(value);
    this.showRankType = showRankTypeIds.includes(value);  
    this.showAdditionalFields = this.showRankNo || this.showRankType;

    this.delinquentFormGroup.patchValue({
      delnquenceRankNo: this.showRankNo ? this.delinquentFormGroup.value.delnquenceRankNo : '', 
      officertype: this.showRankType ? this.delinquentFormGroup.value.officertype : '',
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
        delnquenceRankNoControl.setValidators([Validators.required,Validators.minLength(3),Validators.maxLength(5),Validators.pattern('^(?!0+$)[0-9]{3,5}$')]);
      } else {
        delnquenceRankNoControl.clearValidators();
        delnquenceRankNoControl.setErrors(null);
      }
      delnquenceRankNoControl.updateValueAndValidity();
    }

     // Handle validation for "Direct Officer / Rank Promoter" dropdown
     const rankTypeControl = this.delinquentFormGroup.get('officertype');
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

  getDistList(){
    this.distUnitTypeId=5;
    this.cityUnitTypeId=0;
    this.prSourceService.getDistList().subscribe(
      (response) => {
        console.log(response);
        this.districtDropdown=true;
        this.cityDropdown=false;
        this.unitsList = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
getCityList(){
  this.cityUnitTypeId=6;
  this.distUnitTypeId=0;
  this.prSourceService.getCityList().subscribe(
    (response) => {
      console.log(response);
      this.districtDropdown=false;
      this.cityDropdown=true;
      this.citiesList = response;
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

getStationList(value:any){

  
  this.cityDistTypeId=this.cityUnitTypeId || this.distUnitTypeId;
   
  this.prSourceService.stationlist(this.cityDistTypeId, value).subscribe(
    (response) => {

      if (response && response.length > 0) {
        this.stationMasterList = response;   
        this.coDelenquentPlaceList.push(...this.stationMasterList);
        
         
         
      }
    })

}


// Save the selected station before the district changes
onStationSelect(stationId: number) {
  this.previousStationId = stationId;
}
 
  StationSelectChange(value: string): void {
    
    this.StationSelect = value;
  }

  ondetailsOfPunishmentUploadFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.apppealOrderFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.apppealOrderFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.apppealOrderFile = null;
    }
  }

  ondateOfFinalOrderuploadFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfFinalOrderFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfFinalOrderFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfFinalOrderFile = null;
    }
  }

  ondateOfExplanationuploadFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.dateOfExplanationFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.dateOfExplanationFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.dateOfExplanationFile = null;
    }
  }

  onscnAckDateUploadFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.sCNAckDateFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.sCNAckDateFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.sCNAckDateFile = null;
    }
  }
  onscnApprovedDateUploadFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    this.fileUploadError = null; // Reset the error message
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // Check if the file type is PDF
      if (file.type === 'application/pdf') {
        this.sCNApprovedDateFile = file;
      } else {
        this.fileUploadError = 'Only PDF files are allowed.';
        this.sCNApprovedDateFile = null;
        input.value = ''; // Reset the file input
      }
    } else {
      this.sCNApprovedDateFile = null;
    }
  }

  isScnApprovedDateValid(): boolean {
    return this.updateSequenceFormGroup.get('sCNApprovedDate')!.valid &&
      this.updateSequenceFormGroup.get('sCNApprovedDateRemark')!.valid &&
      this.updateSequenceFormGroup.get('sCNApprovedDateFile')!.valid;
  }

  isScnAckDateValid(): boolean {
    return this.updateSequenceFormGroup.get('sCNAckDate')!.valid &&
      this.updateSequenceFormGroup.get('sCNAckDateRemarks')!.valid &&
      this.updateSequenceFormGroup.get('sCNAckDateFile')!.valid;
  }

  isDateofEXplanationValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfExplanation')!.valid &&
      this.updateSequenceFormGroup.get('dateOfExplanationRemarks')!.valid &&
      this.updateSequenceFormGroup.get('dateOfExplanationFile')!.valid;
  }

  isDateofFinalorderValid(): boolean {
    return this.updateSequenceFormGroup.get('dateOfFinalOrder')!.valid &&
      this.updateSequenceFormGroup.get('dateOfFinalOrderRemarks')!.valid &&
      this.updateSequenceFormGroup.get('detailsOfPunishment')!.valid &&
      this.updateSequenceFormGroup.get('dateOfFinalOrderFile')!.valid;
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
      this.sCNApprovedDateFile !== null &&
      this.sCNAckDateFile !== null &&
      this.dateOfExplanationFile !== null &&
      this.dateOfFinalOrderFile !== null &&
      this.appealOrderFile !== null;
  }

  onSubmit(): void {
    if (this.delinquentFormGroup.valid || this.updateSequenceFormGroup.valid || this.finalRemarksFormGroup.valid || this.coDelinguentFormGroup.valid) {
      // const delinquencyDetailsValues = this.delinquentFormGroup.value.delinquencyDetails;
      const formData = new FormData();
      formData.append('minorPrBoo', JSON.stringify({
        officertype:this.delinquentFormGroup.value.officertype,
        delnquenceName: this.delinquentFormGroup.value.delnquenceName,
        delnquenceRankNo: this.delinquentFormGroup.value.delnquenceRankNo,
        delnquenceRankMaster: this.delinquentFormGroup.value.delnquenceRankMaster,
        delnquenceRankMasterId: this.delinquentFormGroup.value.delnquenceRankMasterId,
        ifhrmsNo: this.delinquentFormGroup.value.ifhrmsNo,
        dateOfBirth: this.delinquentFormGroup.value.dateOfBirth,
        dateOfEnlishment: this.delinquentFormGroup.value.dateOfEnlishment,
        // sCNAckDateFile: this.updateSequenceFormGroup.value.sCNAckDateFile,
        // sCNApprovedDateFile: this.updateSequenceFormGroup.value.sCNApprovedDateFile,
        dateOfRetiredment: this.delinquentFormGroup.value.dateOfRetiredment,
        // district: this.delinquentFormGroup.value.district,
        policeStationId: this.delinquentFormGroup.value.policeStationId,
        dateOfJoiningInPresentPost: this.delinquentFormGroup.value.dateOfJoiningInPresentPost,
        mobileNo: this.delinquentFormGroup.value.mobileNo,
        noOfPRsofar: this.delinquentFormGroup.value.noOfPRsofar,
        dateOfOccurance: this.delinquentFormGroup.value.dateOfOccurance,
        placeOfOccurance: this.delinquentFormGroup.value.placeOfOccurance,
        prchargesList: this.delinquentFormGroup.value.prchargesList,
        allUnitsId: this.unitId,
        unitTypeId: this.usertypeId,
        prSectionNo: this.selectedPunishment,
        overallPrNumber: this.prNo || this.crNo || this.exPr,
        // second form group
        sCNApprovedDate: this.updateSequenceFormGroup.value.sCNApprovedDate,
        sCNApprovedDateRemark: this.updateSequenceFormGroup.value.sCNApprovedDateRemark,
        // sCNApprovedDateFile: this.updateSequenceFormGroup.value.sCNApprovedDateFile,

        sCNAckDate: this.updateSequenceFormGroup.value.sCNAckDate,
        sCNAckDateRemarks: this.updateSequenceFormGroup.value.sCNAckDateRemarks,
        // sCNAckDateFile: this.updateSequenceFormGroup.value.sCNAckDateFile,

        dateOfExplanation: this.updateSequenceFormGroup.value.dateOfExplanation,
        dateOfExplanationRemarks: this.updateSequenceFormGroup.value.dateOfExplanationRemarks,
        // dateOfExplanationFile: this.updateSequenceFormGroup.value.dateOfExplanationFile,

        dateOfFinalOrder: this.updateSequenceFormGroup.value.dateOfFinalOrder,
        dateOfFinalOrderRemarks: this.updateSequenceFormGroup.value.dateOfFinalOrderRemarks,
        detailsOfPunishment: this.updateSequenceFormGroup.value.detailsOfPunishment,
        // dateOfFinalOrderFile: this.updateSequenceFormGroup.value.dateOfFinalOrderFile,

        dateOfAppealOrder: this.updateSequenceFormGroup.value.dateOfAppealOrder,
        appealStatus: this.updateSequenceFormGroup.value.appealStatus,
        detailofPunishmentAppeal: this.updateSequenceFormGroup.value.detailofPunishmentAppeal,
        appealRemark: this.updateSequenceFormGroup.value.appealRemark,

        // detailsOfPunishmentFile: this.updateSequenceFormGroup.value.detailsOfPunishmentFile,
        // uploadedFile: this.uploadedFileName,
        createdDate: this.createdDate,
        remarks: this.finalRemarksFormGroup.value.remarks,
        isCoDelenquence:this.coDelenquentPresent,
         
        noOfCoDelenquence:this.noOfCodelenquent,
        coDelenquenceList:this.submittedData
        
         

      })
      );
      // if(this.submittedData.length >0){
      //   coDelenquenceList: this.submittedData;
      //   formData.append('coDelenquenceList', JSON.stringify(this.submittedData));
      // }
      if (this.sCNApprovedDateFile) {
        formData.append('sCNApprovedDateFile', this.sCNApprovedDateFile);
      }

      if (this.apppealOrderFile) {
        formData.append('apppealOrderFile', this.apppealOrderFile);
      }

      if (this.dateOfFinalOrderFile) {
        formData.append('dateOfFinalOrderFile', this.dateOfFinalOrderFile);
      }

      if (this.dateOfExplanationFile) {
        formData.append('dateOfExplanationFile', this.dateOfExplanationFile);
      }

      if (this.sCNAckDateFile) {
        formData.append('sCNAckDateFile', this.sCNAckDateFile);
      }
      if (this.minorPrIdss) {
        formData.append('minorPrId', this.minorPrIdss);
      }


      this.prSourceService.savePRData(formData).subscribe(data => {
        // console.log('Data saved locally:', formData);
        this.snackBar.open('Data saved successfully!', 'Close', {
          duration: 3000,
        });
        if (null != this.prSectionNo) {
          this.router.navigate([`/pr-tabledata/${this.prSectionNo}/${this.usertypeId}/${this.unitId}/${this.unitTypeName}/${this.totalprminorsection}`]);
        } else {
          this.router.navigate([`/pr-tabledata/${this.usertypeId}/${this.unitId}/${this.unitTypeName}/${this.totalprminorsection}`]);
        }
      });
    } else {
      console.log('Form is invalid');
      this.delinquentFormGroup.markAllAsTouched();
      this.updateSequenceFormGroup.markAllAsTouched();
      this.finalRemarksFormGroup.markAllAsTouched();
    }
  }


  downloadFile() {
    const fileName = this.updateSequenceFormGroup.get('sCNApprovedDateFile')?.value;
    if (!fileName) {
      this.snackBar.open('No file available for download.!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.prSourceService.downloadFile(fileName).subscribe(response => {
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


  downloadFilesCNAckDateFile() {
    const fileName = this.updateSequenceFormGroup.get('sCNAckDateFile')?.value;
    if (!fileName) {
      this.snackBar.open('No file available for download!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.prSourceService.downloadFilesCNAckDateFile(fileName).subscribe(response => {
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

  downloadFiledateOfExplanationFile() {
    const fileName = this.updateSequenceFormGroup.get('dateOfExplanationFile')?.value;
    if (!fileName) {
      this.snackBar.open('No file available for download!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.prSourceService.downloadFiledateOfExplanationFile(fileName).subscribe(response => {
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

  downloadFiledetailsOfPunishmentFile() {
    const fileName = this.updateSequenceFormGroup.get('detailsOfPunishmentFile')?.value;
    if (!fileName) {
      this.snackBar.open('No file available for download!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.prSourceService.downloadFiledetailsOfPunishmentFile(fileName).subscribe(response => {
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

  downloadFiledateOfFinalOrderFile() {
    const fileName = this.updateSequenceFormGroup.get('dateOfFinalOrderFile')?.value;
    if (!fileName) {
      this.snackBar.open('No file available for download!', 'Close', {
        duration: 3000,
      });
      return;
    }
    this.prSourceService.downloadFiledateOfFinalOrderFile(fileName).subscribe(response => {
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
      
      dialogRef.afterClosed().subscribe(result => {
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
