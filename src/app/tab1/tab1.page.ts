import { Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { CommonService } from '../common.service';
import { IonicSlides } from '@ionic/angular';
// import { SwiperOptions } from 'swiper/types';
import { ToastController } from '@ionic/angular';

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.css']
})
export class Tab1Page implements OnInit{
  cardArray:any=[]
  isToastOpen = false;
  swiperModules = [IonicSlides]
  slideIndex:any=0
  toastMessage = '';
  constructor(public router:Router,public service:CommonService,private toastController: ToastController) {}
  @ViewChild('swiper')
  swiperRef:ElementRef|any

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(){
    this.service.getData().subscribe((res:any)=>{
     this.cardArray = res
    },(error)=>{
      console.log(error)
    })
  }

  fnclick(e:any,data:any){
    this.service.profileDatas=data
    this.router.navigateByUrl('tabs/tab2');
  }
  // fnYes(isOpen:any){
  //   this.isToastOpen = isOpen
  //   this.swiperRef.nativeElement.swiper.slideNext();
  // }
  fnYesclose(isopen:any){
    this.isToastOpen = isopen
  }
  onslideChange(event:any){
    // console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
    // console.log(event)
  }
  fnNavtoslide(){
    this.router.navigateByUrl('tabs/tab3');
  }


  async fnYes(isInterested: boolean) {
    if (isInterested) {
      this.toastMessage = 'Interested';
      this.showToast('green');
      this.swiperRef.nativeElement.swiper.slideNext();
    } else {
      this.toastMessage = 'Not Interested';
      this.showToast('red');
      this.swiperRef.nativeElement.swiper.slideNext();
    }
  }

  async showToast(color: string) {
    const toast = await this.toastController.create({
      message: this.toastMessage,
      duration: 2000,
      position: 'bottom',
      cssClass: color === 'green' ? 'green-toast' : 'red-toast',
      animated: true,
    });
    await toast.present();
  }
  

}
