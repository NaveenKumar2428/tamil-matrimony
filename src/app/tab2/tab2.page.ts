import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
  profileView:any=''
  constructor(public router:Router,public service:CommonService ,private location: Location) {}
  ngOnInit(): void {
  //  console.log(this.service.profileDatas)
   this.profileView=this.service.profileDatas

  }
  fngoback(){
    this.location.back();
  }
  fnNavtoslide(){
    this.router.navigateByUrl('tabs/tab3');
  }
}
