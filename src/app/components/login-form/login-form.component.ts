import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { UserDto } from 'src/app/models/user-dto';
import { Userr } from 'src/app/models/userr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // user: Userr = new Userr();
  user:UserDto = {email:'',password:''}

  access: number = 0; //0-no access, 1-acces, 2-wrong password, 3-homepage
  public isMobile$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router) {
    this.isMobile$ = fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth <= 768),
      startWith(window.innerWidth <= 768)
    );
  }

  ngOnInit(): void {

    //this.router.navigate(['/']);

     const roleString = localStorage.getItem("role");
     if (roleString) {
      this.router.navigate(['/']);
    //   if (JSON.parse(roleString) == 1) {
    //     this.router.navigate(['paneluser']);
    //   } else if (JSON.parse(roleString) == 2) {
    //     this.router.navigate(['panelseller']);
    //   } else if (JSON.parse(roleString) == 3) {
    //     this.router.navigate(['paneladmin']);
    //   }
     } else {

     }



  }

  login() {
    this.userService.login(this.user).subscribe(data => {
      console.log(data)
      if (data) {
         localStorage.setItem("iduser", "1");

         // Obtiene el token JWT del backend
     

      // Guarda el token en el localStorage
      localStorage.setItem('token', data.jwt);
         localStorage.setItem("email", JSON.stringify("admin@email.com"));

         localStorage.setItem("role", "3");

        //location.reload();
        //if(data.role.id==2){

        //}else{
        //this.router.navigate(['/']);
        // this.access = 3;
        location.reload();
        //}       
      } else {
        localStorage.clear
        this.access = 2;
      }
    }, error => { console.log(error) })
  }




}

