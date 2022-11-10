import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../../services/api/api-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allArticleData:any = [];
  popularDeviceData:any = [];
  resultedDeviceData:any = [];
  deviceSearch:any = '';


  constructor(public api: ApiServiceService, public router: Router) { }

  ngOnInit(): void {
    this.getDeviceData(this.deviceSearch);
  }


  getDeviceData(search:any=''){
    this.allArticleData = [];
    this.popularDeviceData = [];
    this.resultedDeviceData = [];
    this.api.getUserDeviceData(search).subscribe((res:any)=>{
      if(res.status == true){
        this.allArticleData = res.data;
        if(this.allArticleData.length > 5){
          this.allArticleData.forEach((element:any,key:number) => {
            if(key < 5) this.popularDeviceData.push(element)
            else
             this.resultedDeviceData.push(element);
        });
        }
        else{
          this.allArticleData.forEach((element:any,key:number) => {
            this.popularDeviceData.push(element)
            this.resultedDeviceData.push(element);
        });
        }
       
      }
      else{
        this.allArticleData = [];
        alert(res.message);
      }
    })
  }

  gotoDeviceDetails(data:any){
    this.router.navigate(['user/gadget-details',data._id]);
  }

}
