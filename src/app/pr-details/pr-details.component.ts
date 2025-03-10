import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrSourceService } from '../pr-source.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StaticHeaderComponent } from "../static-header/static-header.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MessageServiceService } from '../message-service.service';

@Component({
  selector: 'app-pr-details',
  imports: [
    FormsModule,
    CommonModule,
    StaticHeaderComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    ReactiveFormsModule
],
  templateUrl: './pr-details.component.html',
  styleUrl: './pr-details.component.css'
})
export class PrDetailsComponent {

  currentYear: number = new Date().getFullYear();  // Get the current year
  newprYear: number = this.currentYear;  // Set the default value to the current year
 
 
  exisprid: any;
  years: any;
  prNo: any;
  city: any;
  selectedYear: any;
  Message!: boolean;
  allUnitsId: any;
  action: any;
  messagess: any;

  constructor(
    private messageServiceService:MessageServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,private prSourceService: PrSourceService
  ) {
    this.TotalPrForm = this.fb.group({
      years: [null, Validators.required],
      exprno: [null, [Validators.required, Validators.min(1)]],
      allUnitsId: [sessionStorage.getItem('unitid')],
      unitTypeId: [sessionStorage.getItem('usertype')],
      exisprid:[null]

    });
    this.generateYears();
    this.initializeYears();
  }

  prNumber: number | null = null;
  prYear: number | null = null ;
  prCity: string = '';          
  prGenerated: boolean = false;  
  generatedPrNo: string = '';   
  newprNumber: number | null = null;
  newprCity: string = '';
  newprGenerated: boolean = false;
  newgeneratedPrNo: string = '';
  usertype: any;
  unitid:any;
  unitTypeId: any;
  existyears: number[] = [];
  existselectedYear: number = new Date().getFullYear();  
  existprNo: number | null = null;
  existcity: string = '';
  exisgeneratedPrNo: string = '';
  showNewPR: boolean = false; 
  showExistingPR: boolean = false;
  showCurrentPR: boolean = false;
  unitTypeName:any;
  existprNoList: string[] = []; // List to store dropdown values
  selectedPrNo: string = ''; // Selected value from dropdown
  totalPRCount:boolean = false;

  TotalPrForm: FormGroup;
  TotalPRCount_years: number[] = [];
  prList: { years: number; exprno: number }[] = [];
  // displayedColumns: string[] = ['totalyear', 'totalPrNo', 'actions'];
  editingIndex: number | null = null;

  onYearChange(event: any) {
    if (event.target.value != this.currentYear) { 
      event.target.value = this.currentYear;  
    }
  }

  initializeYears() {
     

    const currentYear = new Date().getFullYear();
     
    const startYear = currentYear;
    const endYear = 2000; // End year
    for (let year = startYear; year >= endYear; year--) {
      this.existyears.push(year);
  }
}
  
ngOnInit(): void {




this.messagess = this.messageServiceService.getMessage(); 
  console.log("Received Message:", this.messagess);


  this.messageServiceService.clearMessage();


  this.route.queryParams.subscribe((params) => {
   
    const action = params['action'];
    
    if (action === 'new') {
      
      this.showNewPR = true;
      this.showExistingPR = false;
      this.totalPRCount = false;
  this.usertype = sessionStorage.getItem('usertype') ;
  this.unitid = sessionStorage.getItem('unitid');

      this.prSourceService.shortcode(this.usertype, this.unitid).subscribe(
        (response) => {
        
          if (response) {
          
            this.newprCity = response.shortcode;
            this.newprNumber = response.shortcodecount +1;
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        (error) => {
          console.error('Error fetching station list:', error);
          alert('An error occurred while fetching the station list. Please try again later.');
        }
      );
    } else if (action === 'existing') {
    
      this.showNewPR = false;
      this.showExistingPR = true;
      this.totalPRCount = false;
      this.usertype = sessionStorage.getItem('usertype');
      this.unitid = sessionStorage.getItem('unitid');
      this.prSourceService.shortcode(this.usertype, this.unitid).subscribe(
        (response) => {
          if (response) {
          
            this.newprCity = response.shortcode;
            this.existprNoList = response.missingnumber;
this.usertype = sessionStorage.getItem('usertype');
      this.unitid = sessionStorage.getItem('unitid');
      this.prSourceService.extingprtotallist(this.usertype, this.unitid).subscribe(
        (response) => {
          if (response) {
          
            this.prList=response.listExistingPrcount;
            this.existyears = [...new Set(this.prList.map(item => item.years))];
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        (error) => {
          console.error('Error fetching station list:', error);
          alert('An error occurred while fetching the station list. Please try again later.');
        }
      );

            
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        (error) => {
          console.error('Error fetching station list:', error);
          alert('An error occurred while fetching the station list. Please try again later.');
        }
      );
    } else if (action === 'current') {
    
      this.showCurrentPR = true;
      this.showExistingPR = false;
      this.totalPRCount = false;
      this.usertype = sessionStorage.getItem('usertype');
      this.unitid = sessionStorage.getItem('unitid');
      this.prSourceService.shortcode(this.usertype, this.unitid).subscribe(
        (response) => {
          if (response) {
            this.newprCity = response.shortcode;
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        (error) => {
          console.error('Error fetching station list:', error);
          alert('An error occurred while fetching the station list. Please try again later.');
        }
      );
    }else if (action === 'total-count') {
      this.showNewPR = false;
      this.showCurrentPR = false;
      this.showExistingPR = false;
      this.totalPRCount = true;

      this.usertype = sessionStorage.getItem('usertype');
      this.unitid = sessionStorage.getItem('unitid');
      this.prSourceService.extingprtotallist(this.usertype, this.unitid).subscribe(
        (response) => {
          if (response) {
            this.prList=response.listExistingPrcount;
            
          } else {
            alert('Invalid credentials. Please try again.');
          }
        },
        (error) => {
          console.error('Error fetching station list:', error);
          alert('An error occurred while fetching the station list. Please try again later.');
        }
      );
    }
    console.log('showNewPR:', this.showNewPR, 'showExistingPR:', this.showExistingPR);
  });
}
  onSubmitCurrent(form: any): void {
  
    if (form.valid) {
    
      this.messagess=false;
      this.prSourceService.prnumperdublicatecheck(this.prNumber, this.newprYear).subscribe(
        (response) => {
        
          if (response) {
          
            this.generatedPrNo = `PR No. already exist`;
           
      this.Message = true; 
      this.prGenerated = false; 
          } else {
          
            this.generatedPrNo='';
            this.generatedPrNo = `${this.prNumber}/${this.newprYear}/${this.newprCity}`;
            this.snackBar.open('Current PR number generated successful!', 'Close', {
              duration: 1000,
             });
      this.prGenerated = true; 
      this.Message = false; 
          }
        },
      );
      
    } 
    this.snackBar.open('Please fill in all the fields.', 'Close', {
      duration: 1000,
     });
  }
  
  onSubmitNew(form: any): void{
    if (form.valid) {
      this.newgeneratedPrNo = `${this.newprNumber}/${this.newprYear}/${this.newprCity}`;
      this.messagess=false;
      this.newprGenerated = true;
      this.snackBar.open('PR number generated successful!', 'Close', {
        duration: 1000,
       });
    } else {
      this.snackBar.open('Please fill in all the fields.', 'Close', {
        duration: 1000,
       });
    }
  }
  
  onNavigate(punishmentType: string): void {
    if (this.newgeneratedPrNo || this.generatedPrNo || this.exisgeneratedPrNo) {
      if(this.exisgeneratedPrNo){
        this.generatedPrNo='';

        this.route.queryParams.subscribe((params) => {
        this.action = params['action'];
        });
        this.router.navigate(['/new-pr-generato'], { queryParams: { punishment: punishmentType, prNo: this.newgeneratedPrNo,crNo:this.generatedPrNo, exPr: this.exisgeneratedPrNo,action:this.action } });;
      }
if(this.exisgeneratedPrNo==""){

  this.route.queryParams.subscribe((params) => {
    this.action = params['action'];
    });
        this.router.navigate(['/new-pr-generato'], { queryParams: { punishment: punishmentType, prNo: this.newgeneratedPrNo,crNo:this.generatedPrNo, exPr: this.exisgeneratedPrNo,action:this.action } });
      }
    } else {
      this.snackBar.open('PR number is not generated yet!', 'Close', {
        duration: 2000,
       });
    }
  }

  onMajorNavigate(punishmentType: string): void {
    if (this.newgeneratedPrNo || this.generatedPrNo || this.exisgeneratedPrNo) {
      if(this.exisgeneratedPrNo){
        this.generatedPrNo='';

        this.route.queryParams.subscribe((params) => {
        this.action = params['action'];
        });
      this.router.navigate(['/major-pr-generate'], {queryParams:  { punishment: punishmentType, prNo: this.newgeneratedPrNo, crNo:this.generatedPrNo, exPr: this.exisgeneratedPrNo,action:this.action } });
    } 
    if(this.exisgeneratedPrNo==""){

      this.route.queryParams.subscribe((params) => {
        this.action = params['action'];
        });
            this.router.navigate(['/major-pr-generate'], { queryParams: { punishment: punishmentType, prNo: this.newgeneratedPrNo,crNo:this.generatedPrNo, exPr: this.exisgeneratedPrNo,action:this.action } });
          }
        } else {
          this.snackBar.open('PR number is not generated yet!', 'Close', {
            duration: 2000,
           });
        }
      }

  addPR() {
     this.prNumber=this.existprNo;
      this.prSourceService.prnumperdublicatecheck(this.prNumber, this.existselectedYear).subscribe(
        (response) => {
          this.messagess=false;
          if (response) {
          
            this.generatedPrNo = `PR No. already exist`;
      this.Message = true; 
      this.newprGenerated = false;
          } else {
            this.snackBar.open('Existing PR number generated successful!', 'Close', {
              duration: 1000,
             });
            this.newprGenerated =true;
            this.exisgeneratedPrNo = `${this.existprNo}/${this.existselectedYear}/${this.newprCity}`;
            this.Message = false;
          }
        },
      );  
      this.snackBar.open('Please fill in all the fields.', 'Close', {
        duration: 1000,
       });
  }

  generateYears() {
    const currentYear = new Date().getFullYear();
    this.TotalPRCount_years = [];
    for (let i = 2000; i <= currentYear; i++) {
      this.TotalPRCount_years.push(i);
    }
  }

  TotalCountaddPR() {
  
    if (this.TotalPrForm.invalid) return;
    const formValue = this.TotalPrForm.value;
    if (this.editingIndex !== null) {
      this.prList[this.editingIndex] = { ...formValue };
      this.unitTypeId = sessionStorage.getItem('usertype');
      this.allUnitsId = sessionStorage.getItem('unitid');
      this.prSourceService.extingprtotalcountentry(formValue,this.unitTypeId,this.allUnitsId).subscribe(
        (response) => {
        
         this.prList=response.listExistingPrcount;
        },
      );


      this.editingIndex = null; 
    } else {
      this.unitTypeId = sessionStorage.getItem('usertype');
      this.allUnitsId = sessionStorage.getItem('unitid');
      this.allUnitsId = sessionStorage.getItem('unitid');
      this.prSourceService.extingprtotalcountentry(formValue,this.unitTypeId,this.allUnitsId).subscribe(
        (response) => {
        
         this.prList=response.listExistingPrcount;
        },
      );

    
    }

     this.TotalPrForm.reset();
  }

  isYearAlreadyAdded(years: number): boolean {
    return this.prList.some(pr => Number(pr.years) === years);
  }
  
  editPR(element:any) {
  
    this.editingIndex = this.prList.findIndex(pr => pr.years === element.years); // Find correct index
    // if (this.editingIndex !== -1) {
    
      this.TotalPrForm.patchValue({

        years: element.years.toString(), 
        exprno: element.exprno,
        exisprid: element.exisprid,
        allUnitsId:element.allUnitsId,
        unitTypeId: element.unitTypeId
       
      });
    // }
  }

  goBack(){
    this.unitTypeName=sessionStorage.getItem('unitTypeName')
    this.router.navigate([`/pr-dashboard/${this.usertype}/${this.unitid}/${this.unitTypeName}`]);
  }



  onYearChanges(selectedYear: number) {
    console.log("Selected Year:", selectedYear);
  
    if (selectedYear) {
      this.usertype = sessionStorage.getItem('usertype');
      this.unitid = sessionStorage.getItem('unitid');
      this.prSourceService.getDataByYear(selectedYear,this.usertype, this.unitid).subscribe((data) => {
        this.newprCity = data.shortcode;
        this.existprNoList = data.missingnumber;
        // Your logic to update UI
      });
    }
}
}