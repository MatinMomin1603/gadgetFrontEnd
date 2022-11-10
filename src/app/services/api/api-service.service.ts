import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
    // Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
    url = "http://54.170.251.103/api/";
  constructor(public http: HttpClient) { }
 
  login(data:any){
       let pageAction = 'user/login';
       return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  getDevice(){
       let pageAction = 'admin/device';
       return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  getCategories(){
       let pageAction = 'admin/category';
       return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  submitDevice(data:any){
    let pageAction = 'admin/device';
    return this.http.post(this.url+pageAction, data).pipe(map(results=>results));
  }

  updateDevice(data:any){
    let pageAction = 'admin/devices/edit';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  deleteDevice(data:any){
    let pageAction = 'admin/devices/delete';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }
  
  usersignUp(data:any){
    let pageAction = 'user';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  userLogin(data:any){
    let pageAction = 'user/login';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  getUserDeviceData(search:any=''){
    let pageAction = 'user/dashboard?search='+search;
    return this.http.get(this.url+pageAction).pipe(map(results=>results));
  }

  getUserDeviceDetails(data:any){
    let pageAction = 'user/device/view';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  submitCategory(data:any){
    let pageAction = 'admin/category';
    return this.http.post(this.url+pageAction, JSON.stringify(data)).pipe(map(results=>results));
  }

  deleteCategory(data:any){
    let pageAction = 'admin/category/delete';
    return this.http.post(this.url+pageAction,JSON.stringify(data)).pipe(map(results=>results));
  }

}
