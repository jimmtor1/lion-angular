import { Component, OnInit } from '@angular/core';

import { ModalService } from './services/modal.service';

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
  ms = "";
  type = "";

  constructor(private modalService:ModalService) {}
  
  ngOnInit(): void {
    this.modalService.modalState$.subscribe((a)=> {
      this.modalOpen = a.isOpen;    
      this.ms = a.message;
      this.type = a.type;
    });
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
