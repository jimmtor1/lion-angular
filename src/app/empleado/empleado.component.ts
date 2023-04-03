import { Component } from '@angular/core';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {

  nombre = "Juan";
  apellido = "Diaz";
  edad=18;
  //empresa="Pildoras Informaticas";

  //getEdad(){
    //return this.edad;
  //}

  llamaEmpresa(value:string){
    
  };

}
