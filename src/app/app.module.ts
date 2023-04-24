import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosInicioComponent } from './components/productos-inicio/productos-inicio.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { SellerPanelComponent } from './components/seller-panel/seller-panel.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductBuyerListComponent } from './components/product-buyer-list/product-buyer-list.component';
import { SellerCompanyFormComponent } from './components/seller-company-form/seller-company-form.component';
import { PanelBuyerComponent } from './components/buyer-panel/panel-buyer.component';
import { SellerDetailComponent } from './components/seller-detail/seller-detail.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { BuyerListComponent } from './components/buyer-list/buyer-list.component';
import { SellerListComponent } from './components/seller-list/seller-list.component';


@NgModule({
  declarations: [
    AppComponent, HomeComponent, ProductosInicioComponent, ProductFormComponent, RegisterFormComponent, LoginFormComponent, ProductCategoryListComponent, SellerPanelComponent, ProductDetailComponent, ProductBuyerListComponent, SellerCompanyFormComponent, PanelBuyerComponent, SellerDetailComponent, AdminPanelComponent, BuyerListComponent, SellerListComponent
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
