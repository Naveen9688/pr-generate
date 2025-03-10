import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

const AUTH_API=`http://localhost:8081/mysecurity/auth`;
@Injectable({
  providedIn: 'root'
})
export class PrSourceService {
 
 

  constructor( private http:HttpClient) { }

  // private isLocalStorageAvailable(): boolean {
  //   try {
  //     const test = '__test__';
  //     localStorage.setItem(test, test);
  //     localStorage.removeItem(test);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }

  savePRData(formData: any): Observable<any> {

    return this.http.post(AUTH_API+`/post_minorPr`,formData);
    // if (this.isLocalStorageAvailable()) {
    //   const existingData = JSON.parse(localStorage.getItem('savedData') || '[]');
    //   existingData.push(formData);
    //   localStorage.setItem('savedData', JSON.stringify(existingData));
    // }
  }

  saveMajorPRData(formData: FormData): Observable<any> {

    return this.http.post(`${AUTH_API}/post_majorPr`, formData).pipe(
      catchError(err => {
        console.error('Error occurred:', err);
        return throwError(() => new Error('Error occurred while uploading files.'));
      })
    );
  }
  getDistList(): Observable<any> {
    return this.http.get(AUTH_API+`/getDistList`);
  }

  getCityList():Observable<any>{
    return this.http.get(AUTH_API+`/getCityList`);
  }



  prcount(inputValue: any): Observable<any> {
    // Setting up the HttpParams to send the inputValue as 'ifhrmsNo' to the backend
    const params = new HttpParams().set('ifhrmsNo', inputValue);
  
    // Debugging the request
    console.log(AUTH_API + '/prcount', params.toString());
  
    // Making the GET request and passing the params
    return this.http.get(AUTH_API + '/prcount', { params });
  }

  getCodelenquenceDetails(coDelenquentIfhrmsNo:any,usertypeId:number,unitId:any):Observable<any>{
    const params=new HttpParams().set('coDelenquentIfhrmsNo',coDelenquentIfhrmsNo)
                                  .set('usertypeId',usertypeId)
                                  .set('unitId',unitId);
    return this.http.get(AUTH_API + '/getCodelenquence_details_list',{params});
  }

  getEditFlowData(minorPrId: number): Observable<any> {
    return this.http.get(AUTH_API + `/edit_minorPr/${minorPrId}`);
  }
  
  // getEdit(minorPrId: number,prSectionNo:any): Observable<any> {
  // 
  //   return this.http.get(`${AUTH_API}/edit_minorPr/${minorPrId}/${prSectionNo}`);
  // }
  
  getEdit(minorPrId: number): Observable<any> {

      return this.http.get(`${AUTH_API}/edit_minorPr/${minorPrId}`);
}

  stationlist(usertype: any, unitid: any): Observable<any> {
     const params = new HttpParams()
     .set('usertype', usertype)
     .set('unitid', unitid);

      
 
   return this.http.get(AUTH_API + '/stationlist', { params });
   }

   ranklist(selectedPunishment: any): Observable<any> {
debugger
    return this.http.get(AUTH_API + '/ranklist', {
      params: { selectedPunishment }
    });
  }
  
  coDelenquenceRankList():Observable<any>{
    return this.http.get(AUTH_API + '/coDelenquenceRankList');
  }

  //  ranklist(selectedPunishment: any): Observable<any> {
  
  //   return this.http.get(AUTH_API +'/ranklist', {selectedPunishment });
  // }

  shortcode(usertype: any, unitid: any): Observable<any> {
    const params = new HttpParams()
    .set('usertype', usertype)
    .set('unitid', unitid);
    console.log(AUTH_API + '/shortcode', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });


  return this.http.get(AUTH_API + '/shortcode', { params });
  }

getEditranklist(prSectionNo: any): Observable<any> {
  const params = new HttpParams().set('prSectionNo', prSectionNo);
  return this.http.get(AUTH_API + '/ranklist', { params });

}
 
getSearchResults(criteria: { prNo: string; year: string ; pendingSequenceNo:any ; unitTypeId:any ;allUnitsId:any;userTypeName:any;prSectionNo:any; delnquenceRankNo:any; delnquenceRankMasterId:any}): Observable<any> {
  debugger
  return this.http.post<any>(AUTH_API + '/search', criteria);
}

getSearchdelnquenceRankMaster(delnquenceRankMaster: any, totalprminorsection: any): Observable<any> {
  debugger
  const params = new HttpParams().set('delnquenceRankMaster', delnquenceRankMaster)
  .set('totalprminorsection', totalprminorsection);
  return this.http.get(AUTH_API + '/minsearcheckranknamebased', { params });
}

totalprview(ifhrmsNo: any) {
  const params = new HttpParams().set('ifhrmsNo', ifhrmsNo);
  return this.http.get(AUTH_API + '/majorandminorlist', { params });
}

prnumperdublicatecheck(prNumber: any,existselectedYear: any): Observable<any> {
  const params = new HttpParams()
  .set('prNumber', prNumber)
  .set('newprYear', existselectedYear);
return this.http.get(AUTH_API + '/dublicatecheck', { params });
}

downloadFile(fileName: string): Observable<Blob> {
  return this.http.get(`${AUTH_API}/download/${fileName}`, {
    responseType: 'blob' // Blob format-ல் response பெற
  }) as Observable<Blob>;
}
downloadFilesCNAckDateFile(fileName:string):Observable<Blob>{
  return this.http.get(`${AUTH_API}/downloadFilesCNAckDateFile/${fileName}`, {
    responseType: 'blob' // Blob format-ல் response பெற
  }) as Observable<Blob>;
}
downloadFiledateOfExplanationFile(fileName:string):Observable<Blob>{
  return this.http.get(`${AUTH_API}/downloadFiledateOfExplanationFile/${fileName}`, {
    responseType: 'blob' // Blob format-ல் response பெற
  }) as Observable<Blob>;
}

downloadFiledetailsOfPunishmentFile(fileName:string):Observable<Blob>{
  return this.http.get(`${AUTH_API}/downloadFiledetailsOfPunishmentFile/${fileName}`, {
    responseType: 'blob' // Blob format-ல் response பெற
  }) as Observable<Blob>;
}

downloadFiledateOfFinalOrderFile(fileName:string):Observable<Blob>{
  return this.http.get(`${AUTH_API}/downloadFiledateOfFinalOrderFile/${fileName}`, {
    responseType: 'blob' // Blob format-ல் response பெற
  }) as Observable<Blob>;
}

getDataByYear(selectedYear: any, usertype: any, unitid: any): Observable<any> {
  const params = new HttpParams()
    .set('usertype', usertype)
    .set('unitid', unitid)
    .set('years', selectedYear); // Make sure it matches backend parameter name

  return this.http.get(`${AUTH_API}/prcountlistdraptown`, { params });
}

// extingprtotalcountentry(formValue: any, usertype: any, unitid: any): Observable<any> {
//   const requestBody = {
//     ...formValue,  // Spread operator to include form fields
//     usertype: usertype,
//     unitid: unitid
//   };
//   return this.http.post(AUTH_API + '/extingprtotalcountentry', requestBody);
// }



extingprtotalcountentry(formValue: any, usertype: any, unitid: any): Observable<any> {
  return this.http.post(AUTH_API + `/extingprtotalcountentry?usertype=${usertype}&unitid=${unitid}`, formValue);
}


// editExtingprcount(exisprid: any): Observable<any> {
// 
//   // return this.http.post(AUTH_API + '/editExtingprcount', formValue);
//   return this.http.get(`${AUTH_API}/editExtingprcount/${exisprid}`);
// }


extingprtotallist(usertype: any, unitid: any): Observable<any> {
  const params = new HttpParams()
  .set('usertype', usertype)
  .set('unitid', unitid);

// return this.http.get(this.apiUrl + '/pr-dashboard', { params });


return this.http.get(AUTH_API + '/extingprtotallist', { params });
}
}