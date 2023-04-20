import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PanelVendedoresComponent } from './components/panel-vendedores/panel-vendedores.component';
import { ProductDatailsComponent } from './components/product-datails/product-datails.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'product/:id', component:ProductFormComponent},
  {path:'product', component:ProductFormComponent},
  {path:'register', component:RegisterFormComponent},
  {path: 'login', component:LoginComponent},
  {path: 'productList/:id/:idc', component:ProductListComponent},
  {path: 'panelAnuncios', component:PanelVendedoresComponent},
  {path: 'addetails/:id', component:ProductDatailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
