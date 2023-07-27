import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  pw: string = '';
  pwc: string = '';
  loading=false;

  constructor(private router: ActivatedRoute, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.router.params.subscribe(param => {

      const tokenPayload = param['token'].split(".")[1]; // Obtén la parte del token que contiene la carga útil       
      const base64Url = tokenPayload.replace(/-/g, "+").replace(/_/g, "/");
      const rawData = window.atob(base64Url);

      let decodedToken;
      try {
        decodedToken = JSON.parse(new TextDecoder().decode(new Uint8Array([...rawData].map((char) => char.charCodeAt(0)))));
      } catch (error) {
        console.error("Error parsing token payload(is not JSON format):", error);
        return;
      }

      localStorage.setItem('token', param['token']);
      localStorage.setItem('exp', decodedToken.exp);

    })
  }

  send() {

    
    if (this.pw == this.pwc) {
      const form = new FormData();

      form.append('pw', this.pw);
      form.append('pwc', this.pwc);
      this.loading=true;
      this.userService.resetPassword(form).subscribe(() => {
        localStorage.clear();        
        this.route.navigate(['login']);        
        alert("lozinka uspješno promijenjena.");
      }, error => {
        localStorage.clear();
        this.loading=false;
      });
    }else{
      alert("Lozinke se ne podudaraju. Molimo vas da u oba polja unesete istu lozinku.");
    }


  }

}
