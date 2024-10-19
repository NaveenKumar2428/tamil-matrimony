import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Location } from '@angular/common';
import { CommonService } from '../common.service';
import { ToastController } from '@ionic/angular';
register();

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page implements OnInit {
  cardArray2: any = []
  @ViewChild('swiper2')
  swiperRef2: ElementRef | any
  slideIndex2: any = 0
  isToastOpen = false;
  Intrestedmsg: any = ''
  greenfLag: boolean = false
  toastMessage = '';

  constructor(private location: Location,public service:CommonService,private toastController: ToastController) { }
  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData(){
    this.service.getData().subscribe((res:any)=>{
     this.cardArray2 = res
    },(error)=>{
      console.log(error)
    })
  }

  onslideChange2(event: any) {

  }
  // fnYes(isOpen: any) {
  //   this.Intrestedmsg = 'Shortlisted'
  //   this.isToastOpen = isOpen
  //   this.greenfLag = true
  //   this.swiperRef2.nativeElement.swiper.slideNext();
  // }

  fnnotintrested(isOpen: any) {
    this.Intrestedmsg = 'Not Interested'
    this.isToastOpen = isOpen
    this.greenfLag = false
    this.swiperRef2.nativeElement.swiper.slideNext();
  }
  fnYesclose(isopen: any) {
    this.isToastOpen = isopen
  }
  onSwiper(event: any) {
    // console.log(event)
  }
  fngoback() {
    this.location.back();
  }


  async fnYes(isInterested: string) {
    if (isInterested == 'yes') {
      this.toastMessage = 'Interested';
      this.showToast('green');
      this.swiperRef2.nativeElement.swiper.slideNext();
    } else if (isInterested == 'no') {
      this.toastMessage = 'Not Interested';
      this.showToast('red');
      this.swiperRef2.nativeElement.swiper.slideNext();
    } else {
      this.toastMessage = 'Shortlisted';
      this.showToast('green');
      this.swiperRef2.nativeElement.swiper.slideNext();
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
