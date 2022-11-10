import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiServiceService } from 'src/app/services/api/api-service.service';
 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  closeResult:any;
  constructor(public modalService: NgbModal, public api: ApiServiceService) { }
 allDeviceData:any = [];
 allCategories:any = [];
 currentDeviceData:any;
 categoryName:any;
 device_name:any= '';
 category_name:any = '';
 price:any = '';
 description:any = '';
 device_name_edit:any= '';
 category_name_edit:any = '';
 description_edit:any = '';
 price_edit:any = '';
 qty:any = '';
 qty_edit:any = '';
 selected_file:any = '';
 currentDiv:any = 'device-list';


  ngOnInit(): void {
    this.getDevicesData();
    this.getCategories()
  }

  getDevicesData(){
    this.api.getDevice().subscribe((res:any)=>{
      if(res.status == true){
        this.allDeviceData  = res.data;
      }else{
        alert(res.message);
      }
    })
  }

  getCategories(){
    this.api.getCategories().subscribe((res:any)=>{
      if(res.status == true){
        this.allCategories = res.data;
      }
      else{
        this.allCategories = [];
        alert(res.message);
      }
    })
  }

  addDeviceModalpopup(content:any){
    this.device_name = '';
    this.category_name = '';
    this.price = '';
    this.qty = '';
    this.description = '';
    // this.modal.open(content, { backdropClass: 'light-blue-backdrop' });
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  editDevice(device:any,content:any){
    this.currentDeviceData = device;      
    this.device_name_edit = this.currentDeviceData.name;
    this.category_name_edit = this.currentDeviceData.category;
    this.description_edit = this.currentDeviceData.description;
    this.price_edit = this.currentDeviceData.price;
    this.qty_edit = this.currentDeviceData.qty;

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed `;
    });
  }

  updateDevice(){
    if(this.device_name_edit == null || this.device_name_edit == undefined || this.device_name_edit =='') {
      alert("Please Write Device Name..!!!");
      return;
    }
    else if(this.category_name_edit == null || this.category_name_edit == undefined || this.category_name_edit ==''){
      alert("Please Select Category..!!!");
      return;
    }else if(this.description_edit == null || this.description_edit == undefined || this.description_edit ==''){
      alert("Please write Description..!!!");
      return;
    }else if(this.price_edit == null || this.price_edit == undefined || this.price_edit ==''){
      alert("Please write Price..!!!");
      return;
    }else if(this.qty_edit == null || this.qty_edit == undefined || this.qty_edit ==''){
      alert("Please give Quantity..!!!");
      return;
    } else {
      let device = {
        name: this.device_name_edit,
        author: this.category_name_edit,
        description: this.description_edit,
        category: this.category_name_edit,
        price: this.price_edit,
        qty: this.qty_edit,
        _id: this.currentDeviceData._id
      }
      this.api.updateDevice(device).subscribe((res:any)=>{
             if (res.status == true) {
                 alert(res.message);
                 this.getDevicesData();
             } else {
              alert(res.message);
             }
      this.modalService.dismissAll();

      }) 
    }
  }

  submitDevice(){
    const device: FormData = new FormData();
    if(this.device_name == null || this.device_name == undefined || this.device_name =='') {
      alert("Please Write Device Name..!!!");
      return;
    }
    else if(this.category_name == null || this.category_name == undefined || this.category_name ==''){
      alert("Please Select Category..!!!");
      return;
    }else if(this.description == null || this.description == undefined || this.description ==''){
      alert("Please write Description..!!!");
      return;
    }else if(this.price == null || this.price == undefined || this.price ==''){
      alert("Please write Price..!!!");
      return;
    }else if(this.qty == null || this.qty == undefined || this.qty ==''){
      alert("Please give Quanity..!!!");
      return;
    } else {
      device.append('name',this.device_name);
      device.append('category',this.category_name);
      device.append('description',this.description);
      device.append('price',this.price);
      device.append('qty',this.qty);
      device.append('file', this.selected_file);
      this.api.submitDevice(device).subscribe((res:any)=>{
             if (res.status == true) {
                 alert(res.message);
                 this.device_name = '';
                 this.category_name = '';
                 this.description = '';
                 this.price = '';
                 this.qty = '';
                 this.selected_file = '';
                 this.getDevicesData();
             } else {
              alert(res.message);
             }
      this.modalService.dismissAll();
      }) 
    }
  }

  selectFile(event:any){
     this.selected_file = event.target.files[0];
  }


  changeDiv(data:any){
    this.currentDiv = data;
  }

  deleteCategory(id:any){
   let data = {
         id: id
    }
    this.api.deleteCategory(data).subscribe((res:any)=>{
      if(res.status == true){
       this.getCategories();
       alert(res.message);
     }
     else{
        alert(res.message);
      }
 })
  }

  submitCategory(){
    let data= {
      name: this.categoryName
    }
    this.api.submitCategory(data).subscribe((res:any)=>{
         if(res.status == true){
          this.categoryName = '';
          this.getCategories();
          alert(res.message);
        }
        else{
           alert(res.message);
         }
    })
  }

  deletebook(device:any){
    let data = {
      id: device._id
    }

    this.api.deleteDevice(data).subscribe((res:any)=>{
      if(res.status == true){
          alert(res.message);
          this.getCategories();
          this.getDevicesData();
      }
      else{
        alert(res.message);
      }
    })
        
  }
}
