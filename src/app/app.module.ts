import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { ProductosInicioComponent } from './components/productos-inicio/productos-inicio.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';
import { PanelVendedoresComponent } from './components/panel-vendedores/panel-vendedores.component';
import { DatePipe } from '@angular/common';
import { ProductDatailsComponent } from './components/product-datails/product-datails.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, ProductosInicioComponent, ProductFormComponent, RegisterFormComponent, LoginComponent, ProductListComponent, PanelVendedoresComponent, ProductDatailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
