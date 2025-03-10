import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API=`http://localhost:8081/mysecurity/auth`;
@Injectable({
  providedIn: 'root'
})
export class MajorPrSourceService {

  constructor(private http:HttpClient) { }

  saveMajorPRData(formData: FormData): Observable<any> {
    debugger
    return this.http.post(`${AUTH_API}/post_majorPr`, formData);
  }


  majorprcount(inputValue: any): Observable<any> {
    // Setting up the HttpParams to send the inputValue as 'ifhrmsNo' to the backend
    const params = new HttpParams().set('ifhrmsNo', inputValue);
  
    // Debugging the request
    console.log(AUTH_API + '/majorprcount', params.toString());
  
    // Making the GET request and passing the params
    return this.http.get(AUTH_API + '/majorprcount', { params });
  }


  getEditFlowData(majorPrId: number): Observable<any> {
    return this.http.get(AUTH_API + `/edit_majorPr/${majorPrId}`);
  }
  
  
  getEdit(majorPrId: number): Observable<any> {
    debugger
      return this.http.get(`${AUTH_API}/edit_majorPr/${majorPrId}`);
}


  stationlist(usertype: any, unitid: any): Observable<any> {
     const params = new HttpParams()
     .set('usertype', usertype)
     .set('unitid', unitid);

     console.log(AUTH_API + '/stationlist', params.toString());
   // return this.http.get(this.apiUrl + '/pr-dashboard', { params });
 
 
   return this.http.get(AUTH_API + '/stationlist', { params });
   }

   ranklist(selectedPunishment: any): Observable<any> {
    debugger
    return this.http.get(AUTH_API + '/ranklist', {
      params: { selectedPunishment }
    });
  }
  



  shortcode(usertype: any, unitid: any): Observable<any> {
    const params = new HttpParams()
    .set('usertype', usertype)
    .set('unitid', unitid);
    console.log(AUTH_API + '/shortcode', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });


  return this.http.get(AUTH_API + '/shortcode', { params });
  }

getEditranklist(prSectionNo: any): Observable<any> {
  debugger
  const params = new HttpParams().set('prSectionNo', prSectionNo);
  return this.http.get(AUTH_API + '/ranklist', { params });

}



getSearchResults(criteria: { prNo: string; year: string }): Observable<any> {
  debugger
  return this.http.post<any>(AUTH_API + '/majorsearch', criteria);
}

totalprview(ifhrmsNo: any) {
  const params = new HttpParams().set('ifhrmsNo', ifhrmsNo);
  return this.http.get(AUTH_API + '/majorandminorlists', { params });
}

prnumperdublicatecheck(prNumber: any,existselectedYear: any): Observable<any> {
const params = new HttpParams()
.set('prNumber', prNumber)
.set('newprYear', existselectedYear);
return this.http.get(AUTH_API + '/major_dublicatecheck', { params });
}

downloadFilechargeMemoApprovedDateFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFilechargeMemoApprovedDateFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}


downloadFilechargeMemoAcknowledgedDateFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFilechargeMemoAcknowledgedDateFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}


downloadFiledateOfDefenceStatementFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfDefenceStatementFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}

downloadFiledateOfAppointmentOfEnquiryOfficerFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfAppointmentOfEnquiryOfficerFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}


downloadFiledateOfEnquiryOfficerFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfEnquiryOfficerFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}


downloadFiledateOfMinutesDrawnFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfMinutesDrawnFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}


downloadFiledateOfFrCallingMemoAlongWithMinuteFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfFrCallingMemoAlongWithMinuteFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}

downloadFiledateOfServingOfMinuteFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfServingOfMinuteFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}

downloadFiledateOfFrFurnishedFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfFrFurnishedFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}

downloadFiledateOfFinalOrderFiles(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledateOfFinalOrderFiles/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}

downloadFiledetailsOfPunishmentUploadFile(fileName: string): Observable<Blob> {
debugger
  return this.http.get(`${AUTH_API}/downloadFiledetailsOfPunishmentFile/${fileName}`, {
    responseType: 'blob' 
  }) as Observable<Blob>;
}
}
