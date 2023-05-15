import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { SellerPanelComponent } from './components/seller-panel/seller-panel.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PanelBuyerComponent } from './components/buyer-panel/panel-buyer.component';
import { ProductBuyerListComponent } from './components/product-buyer-list/product-buyer-list.component';
import { SellerCompanyFormComponent } from './components/seller-company-form/seller-company-form.component';
import { SellerDetailComponent } from './components/seller-detail/seller-detail.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { SubcategoryListComponent } from './components/subcategory-list/subcategory-list.component';
import { ViewProviderToClienteComponent } from './components/view-provider-to-cliente/view-provider-to-cliente.component';
import { SellerCategoryListComponent } from './components/seller-category-list/seller-category-list.component';
import { TenderDetailComponent } from './components/tender-detail/tender-detail.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'product/:id', component:ProductFormComponent},
  {path:'product', component:ProductFormComponent},
  {path:'register', component:RegisterFormComponent},
  {path: 'login', component:LoginFormComponent},
  {path: 'productCategoryList/:id/:idc', component:ProductCategoryListComponent},
  {path: 'providerSubcategoryList/:id/:idc', component:SellerCategoryListComponent},
  {path: 'sellerpanel', component:SellerPanelComponent},
  {path: 'addetails/:id', component:ProductDetailComponent},
  {path: 'buyerPanel', component:PanelBuyerComponent},
  {path: 'adBuyerList', component:ProductBuyerListComponent},
  {path: 'sellerCompanyForm', component:SellerCompanyFormComponent},
  {path: 'sellerDetail/:id', component:SellerDetailComponent},
  {path: 'adminPanel', component:AdminPanelComponent},  
  {path: 'subcategoryList/:id', component:SubcategoryListComponent}, 
  {path: 'provider/:id', component:ViewProviderToClienteComponent},
  {path: 'tenderDetail/:idtender', component:TenderDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
