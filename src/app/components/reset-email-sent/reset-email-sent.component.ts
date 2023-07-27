import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-email-sent',
  templateUrl: './reset-email-sent.component.html',
  styleUrls: ['./reset-email-sent.component.css']
})
export class ResetEmailSentComponent {

  emailsent = false;
  email: string = '';
  not_found:boolean=false;
  loading=false;

  constructor(private userService: UserService) { }

  send() {   
    this.loading = true;
    this.userService.sendemail(this.email).subscribe(x => {      
      this.emailsent = x;
      this.not_found = !x;
      this.loading = false;
    },error=>(this.loading=false));
  }

}


