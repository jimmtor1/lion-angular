import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from './services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // email: string = "Prijava";
  // role:number=0;
  // public isMobile$: Observable<boolean>;
  
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
          this.router.navigate(['login'])
        }     

      }            
    });

  }

  ngAfterViewInit() {
    const alturaheader = this.header.nativeElement.offsetHeight;
    const alturanavbar = alturaheader*0.60;

    // alert(alturanavbar)

    setTimeout(() => {
      this.mainHeight = `calc(100% - ${alturaheader}px - (${alturanavbar}px)`;
    }, 0);
    
  }
 

  //   this.isMobile$ = fromEvent(window, 'resize').pipe(
  //     map(() => window.innerWidth <= 768),
  //     startWith(window.innerWidth <= 768)
  //   );

  //   const usuarioString = localStorage.getItem("email");    
  //   if (usuarioString) {
  //     this.email = JSON.parse(usuarioString);      
  //   } 

  //   const roleString = localStorage.getItem("role"); 
  //   if(roleString){
  //     this.role = JSON.parse(roleString);
  //   }

  // }

  // direction(){
  //   const roleString = localStorage.getItem("role");    
  //   if (roleString) {
  //     if(JSON.parse(roleString)==1){
  //       this.router.navigate(['/productCategoryList/5/0']);       
  //     }
  //   } else{
  //     this.router.navigate(['login']);
  //   }
    
  // }

  // logout(){    
  //   localStorage.clear();
  //   this.router.navigate([''])
  //   this.email = "Prijava"; 
  //   // location.reload();    
  // }

 

}
