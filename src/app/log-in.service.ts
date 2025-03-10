import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LogInService {
  

  private apiUrl = 'http://localhost:8081/mysecurity/auth';
  constructor(private http: HttpClient) {}

  login(data: { username: string; password: string }): Observable<any> {
    debugger
    return this.http.post<any>(this.apiUrl+'/signin', data);
  }

  dashboard(usertype: any, unitid: any,unitTypeName:any): Observable<any> {
    debugger
    const params = new HttpParams()
    .set('usertype', usertype)
    .set('unitTypeName',unitTypeName)
    .set('unitid', unitid);
  return this.http.get(this.apiUrl + '/pr-dashboard', { params });
  }

  rangeDashboard(userTypeId: any, unitId: any, unitTypeName: any):Observable<any> {
   
    const params = new HttpParams()
    .set('userTypeId', userTypeId)
    .set('unitId', unitId)
    .set('unitTypeName',unitTypeName);
    return this.http.get(this.apiUrl+'/range_dashboard',{params});
  }
 
  minprlist(value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {
    debugger
    const params = new HttpParams()
    .set('usertype', usertype)
    .set('unitTypeName',unitTypeName)
    .set('unitid', unitid)
    .set('value', value);
    console.log(this.apiUrl + '/min-prlist', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });


  return this.http.get(this.apiUrl + '/min-prlist', { params });
  }





  minprViewById(value:any): Observable<any> {
    debugger
    const params = new HttpParams()
   
    .set('minorPrId', value);
    console.log(this.apiUrl + '/min-prlistview', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });


  return this.http.get(this.apiUrl + '/min-prlistview', { params });
  }
  cheifOfficeDashboard(userTypeId: any, unitId: any,unitTypeName:any): Observable<any> {
    debugger
    const params = new HttpParams()
    .set('userTypeId', userTypeId)
    .set('unitId', unitId)
    .set('unitTypeName',unitTypeName);
    return this.http.get(this.apiUrl+'/cheifOffice_dashboard',{params});
  }

  minprsearchlistyear(year:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {
    const params = new HttpParams()
    .set('year', year)
    .set('usertype', usertype)
    .set('unitTypeName',unitTypeName)
    .set('unitid', unitid)
    .set('value', value);
    console.log(this.apiUrl + '/min-prlist', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

  return this.http.get(this.apiUrl + '/min-prautosearchyearlist', { params });

  }
  minprsearchlist(ifhrmsNo:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {

    const params = new HttpParams()
    .set('ifhrmsNo', ifhrmsNo)
    .set('usertype', usertype)
    .set('unitTypeName',unitTypeName)
    .set('unitid', unitid)
    .set('value', value);
    console.log(this.apiUrl + '/min-prlist', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

  return this.http.get(this.apiUrl + '/min-prautosearchifhrmsNolist', { params });

}


minprsearchrank(rankname:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {

  const params = new HttpParams()
  .set('rankid', rankname)
  .set('usertype', usertype)
  .set('unitTypeName',unitTypeName)
  .set('unitid', unitid)
  .set('value', value);
  console.log(this.apiUrl + '/min-prlist', params.toString());
// return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

return this.http.get(this.apiUrl + '/min-prautosearchranklist', { params });

}


minprsearchpendingSequenceNo(pendingSequenceNo:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {

  const params = new HttpParams()
  .set('pendingSequenceNo', pendingSequenceNo)
  .set('usertype', usertype)
  .set('unitTypeName',unitTypeName)
  .set('unitid', unitid)
  .set('value', value);
  console.log(this.apiUrl + '/min-prlist', params.toString());
// return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

return this.http.get(this.apiUrl + '/min-prautosearchpendingSequenceNolist', { params });

}






minprsearchrankno(delnquenceRankNo:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {

  const params = new HttpParams()
  .set('delnquenceRankNo', delnquenceRankNo)
  .set('usertype', usertype)
  .set('unitTypeName',unitTypeName)
  .set('unitid', unitid)
  .set('value', value);
  console.log(this.apiUrl + '/min-prlist', params.toString());
// return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

return this.http.get(this.apiUrl + '/min-prautosearchdelnquenceRankNolist', { params });

}



  minprsearchlists(selectedValue:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {

    const params = new HttpParams()
    .set('selectedValue', selectedValue)
    .set('usertype', usertype)
    .set('unitTypeName',unitTypeName)
    .set('unitid', unitid)
    .set('value', value);
    console.log(this.apiUrl + '/min-prlist', params.toString());
  // return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

  return this.http.get(this.apiUrl + '/min-prautosearchlistlist', { params });

}

minprsearchprNolist(prNo:any,value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {

  const params = new HttpParams()
  .set('prNo', prNo)
  .set('usertype', usertype)
  .set('unitTypeName',unitTypeName)
  .set('unitid', unitid)
  .set('value', value);
  console.log(this.apiUrl + '/min-prlist', params.toString());
// return this.http.get(this.apiUrl + '/pr-dashboard', { params });
debugger

return this.http.get(this.apiUrl + '/minprsearchprNolist', { params });

}


majorprlist(value:any,usertype: any, unitid: any ,unitTypeName:any): Observable<any> {
  debugger
  const params = new HttpParams()
  .set('usertype', usertype)
  .set('unitTypeName',unitTypeName)
  .set('unitid', unitid)
  .set('value', value);
  console.log(this.apiUrl + '/major-prlist', params.toString());

return this.http.get(this.apiUrl + '/major-prlist', { params });
}

majorprViewById(value:any): Observable<any> {
  debugger
  const params = new HttpParams()
 
  .set('majorPrId', value);
  console.log(this.apiUrl + '/major-prlistview', params.toString());

return this.http.get(this.apiUrl + '/major-prlistview', { params });
}

}