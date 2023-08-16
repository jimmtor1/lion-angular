import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductBuyerListComponent } from './components/product-buyer-list/product-buyer-list.component';
import { ViewProviderToClienteComponent } from './components/view-provider-to-cliente/view-provider-to-cliente.component';
import { SellerCategoryListComponent } from './components/seller-category-list/seller-category-list.component';
import { TenderDetailComponent } from './components/tender-detail/tender-detail.component';
import { TenderListComponent } from './components/tender-list/tender-list.component';
import { ProducSearchListComponent } from './components/produc-search-list/produc-search-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { NavbarGeneralPhoneComponent } from './components/navbar-general-phone/navbar-general-phone.component';
import { ChatMiniComponent } from './components/chat-mini/chat-mini.component';
import { AuthGuard } from './auth.guard';
import { MarketingComponent } from './marketing/marketing.component';
import { BuyCoinComponent } from './components/buy-coin/buy-coin.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetEmailSentComponent } from './components/reset-email-sent/reset-email-sent.component';
import { CancelSuscriptionComponent } from './components/cancel-suscription/cancel-suscription.component';
import { NewCategoryListComponent } from './components/new-category-list/new-category-list.component';
import { SubcategoryListComponent2 } from './components/subcategory-list copy/subcategory-list.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'product/:id', component:ProductFormComponent, canActivate:[AuthGuard]},
  {path:'product', component:ProductFormComponent, canActivate:[AuthGuard]},
  {path:'register', component:RegisterFormComponent},
  {path: 'login', component:LoginFormComponent},
  {path: 'productCategoryList/:category/:subcategory/:idcategory', component:ProductCategoryListComponent},
  // {path: 'productCategoryList/:id/:idc', component:ProductCategoryListComponent},
  // {path: 'productCategoryList/:id/:idc/:def', component:ProductCategoryListComponent},
  //{path: 'providerSubcategoryList/:id/:idc', component:SellerCategoryListComponent},
  {path: 'providerSubcategoryList/:category/:subcategory/:idcategory', component:SellerCategoryListComponent},
  {path: 'addetails/:id', component:ProductDetailComponent},
  {path: 'adBuyerList', component:ProductBuyerListComponent},
  // {path: 'subcategoryList/:id', component:SubcategoryListComponent},
  {path: 'subcategoryList2/:id', component:SubcategoryListComponent2},
  // {path: 'subcategoryList/:id/:title', component:SubcategoryListComponent},
  {path: 'provider/:id', component:ViewProviderToClienteComponent},
  {path: 'tenderDetail/:idtender', component:TenderDetailComponent},
  {path: 'tenderList', component:TenderListComponent},
  {path: 'search/:word', component:ProducSearchListComponent},
  {path: 'chat', component:ChatComponent, canActivate:[AuthGuard]},
  {path: 'chating', component:ChatMiniComponent, canActivate:[AuthGuard]},
  {path: 'chat/:iduser', component:ChatComponent, canActivate:[AuthGuard]},
  {path: 'navbarphone', component:NavbarGeneralPhoneComponent},
  {path: 'marketing', component:MarketingComponent},
  {path: 'privacy', component:PrivacyPageComponent},
  {path: 'passwordreset/:token', component:ResetPasswordComponent},
  {path: 'emailresetsend', component:ResetEmailSentComponent},
  {path: 'cancelsuscription', component:CancelSuscriptionComponent},
  {path: 'newCategory', component:NewCategoryListComponent},
  {path: 'buycoin', component:BuyCoinComponent, canActivate:[AuthGuard]},
  {path: 'paneladmin', loadChildren:() => import('./components/panel-admin/panel-admin.module').then(x=> x.PanelAdminModule), canActivate:[AuthGuard]},
  {path: 'panelseller', loadChildren:() => import('./components/panel-seller/panel-seller.module').then(x=> x.PanelSellerModule), canActivate:[AuthGuard]},
  {path:'paneluser',loadChildren:() => import('./components/panel-buyer/panel-buyer.module').then(x=> x.PanelBuyerModule), canActivate:[AuthGuard]},
  {path:'chat2',loadChildren:() => import('./modules/chat/chat.module').then(x=> x.ChatModule), canActivate:[AuthGuard]},
  {path:'promotions', loadChildren:() => import('./modules/promotions/promotions.module').then(x=>x.PromotionsModule), canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
