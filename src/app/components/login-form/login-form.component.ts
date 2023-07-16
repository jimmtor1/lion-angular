import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { UserDto } from 'src/app/models/user-dto';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  // user: Userr = new Userr();
  user: UserDto = { email: '', password: '' }

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

      if (data) {

        if (data.jwt.length > 0) {

          const tokenPayload = data.jwt.split(".")[1]; // Obtén la parte del token que contiene la carga útil       
          const base64Url = tokenPayload.replace(/-/g, "+").replace(/_/g, "/");
          const rawData = window.atob(base64Url);

          let decodedToken;
          try {
            decodedToken = JSON.parse(new TextDecoder().decode(new Uint8Array([...rawData].map((char) => char.charCodeAt(0)))));
          } catch (error) {
            console.error("Error parsing token payload(is not JSON format):", error);
            return;
          }

          localStorage.setItem('token', data.jwt);
          localStorage.setItem('email', decodedToken.sub);
          localStorage.setItem('role', decodedToken.role);
          localStorage.setItem('iduser', decodedToken.iduser);
          localStorage.setItem('exp', decodedToken.exp);

          location.reload();

        } else {
          localStorage.clear
          this.access = 2;
        }
      }

    }, (error: any) => { console.log(error) });
  }




}

