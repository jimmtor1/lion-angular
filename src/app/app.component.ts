import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
// import { App as CapacitorApp } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  modalOpen = false;
 
  providerId:number | undefined;

  //chat varibles:
  ms = "";
  type = "";
  
  showChats: boolean;
  showMessages: boolean;

  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild('navbar', { static: false }) navbar: ElementRef;

  mainHeight: string;
  navbarHeight: string;

 

  constructor(private modalService:ModalService, private router:Router) {}
  
  ngOnInit(): void {
    
    if (Capacitor.getPlatform() === 'android'){this.registerAndroidListener()} ;

    this.modalService.modalState$.subscribe((a)=> {
      this.modalOpen = a.isOpen;    
      this.ms = a.message;
      this.type = a.type;
    });

    

    this.modalService.chatState$.subscribe((a)=> {
      
      if(a.iduser==0){              
        this.showChats = false;
      }else{  
        let user = localStorage.getItem('iduser');
       
        if(user){
          this.providerId = a.iduser;
          this.showChats = true;
          
        }else{
          this.router.navigate(['/login'])
        }     

      }            
    });

  }

  //CapacitorApp.addListener('backButton', ({canGoBack}) => { if(!canGoBack){ CapacitorApp.exitApp(); } else { window.history.back(); } });

  registerAndroidListener() {
    App.addListener('backButton', (data) => {
      if (data.canGoBack) window.history.back();
      else App.exitApp();
    });
  }

  ngAfterViewInit() {
    const alturaheader = this.header.nativeElement.offsetHeight;
    const alturanavbar = alturaheader*0.60;

    setTimeout(() => {
      this.mainHeight = `calc(100% - ${alturaheader}px - (${alturanavbar}px)`;
    }, 0);
    
  }
 

  

}
