import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../../services/api/api-service.service';

@Component({
  selector: 'app-gadget-details',
  templateUrl: './gadget-details.component.html',
  styleUrls: ['./gadget-details.component.css']
})
export class GadgetDetailsComponent implements OnInit {

  deviceData:any;
  device_id:any;
   currentUser:any;
  constructor(public api: ApiServiceService,public activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.device_id = params.get('id');
    } )
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    this.getArticleDetails();
  }

  getArticleDetails(){
    let data = {
      device_id: this.device_id,
      user_id: this.currentUser._id
    }
          this.api.getUserDeviceDetails(data).subscribe((res:any)=>{
          console.log('res :', res);
            if(res.status == true){
              this.deviceData = res.data[0];
            }else{
               alert(res.message);
               this.deviceData = '';
            }
          })
  }

}
