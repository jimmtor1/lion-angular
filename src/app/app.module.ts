import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ProductosInicioComponent } from './components/productos-inicio/productos-inicio.component';

@NgModule({
  declarations: [
    AppComponent, EmpleadosComponent, EmpleadoComponent, HomeComponent, ProductosInicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
