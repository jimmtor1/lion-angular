import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosInicioComponent } from './components/productos-inicio/productos-inicio.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductBuyerListComponent } from './components/product-buyer-list/product-buyer-list.component';
// import { SellerCompanyFormComponent } from './components/seller-company-form/seller-company-form.component';
// import { SellerDetailComponent } from './components/seller-detail/seller-detail.component';
import { BuyerListComponent } from './components/buyer-list/buyer-list.component';
import { SellerListComponent } from './components/seller-list/seller-list.component';
import { SellerSocialnetworkComponent } from './components/seller-socialnetwork/seller-socialnetwork.component';
import { SubcategoryListComponent } from './components/subcategory-list/subcategory-list.component';

import { faAddressBook, faAddressCard, faArrowLeft, faArrowsRotate, faBars, faBasketShopping, faBox, faBoxOpen, faBriefcase, faBuilding, faBuildingCircleExclamation, faCalendar, faCheckSquare, faCirclePlus, faCircleUser, faClose, faComment, faEnvelope, faFile, faFileArrowDown, faHandHoldingMedical, faHandshake, faHeadset, faHome, faLaptop, faListCheck, faLocationDot, faMagnifyingGlass, faMinus, faMobilePhone, faNewspaper, faPaperPlane, faRectangleAd, faRightFromBracket, faShareNodes, faShirt, faShoppingCart, faSignOut, faStore, faTag, faTrash, faUser, faUsers, faWindowMaximize, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ViewProviderToClienteComponent } from './components/view-provider-to-cliente/view-provider-to-cliente.component';
import { SellerCategoryListComponent } from './components/seller-category-list/seller-category-list.component';
import { TenderFormComponent } from './components/tender-form/tender-form.component';
import { TenderDetailComponent } from './components/tender-detail/tender-detail.component';
import { TenderListComponent } from './components/tender-list/tender-list.component';
import { TenderTableComponent } from './components/tender-table/tender-table.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarMenuCategoryComponent } from './components/navbar-menu-category/navbar-menu-category.component';
import { ModalMsComponent } from './components/modal-ms/modal-ms.component';
import { ProducSearchListComponent } from './components/produc-search-list/produc-search-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatMiniComponent } from './components/chat-mini/chat-mini.component';
import { NavbarGeneralPhoneComponent } from './components/navbar-general-phone/navbar-general-phone.component';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosInicioComponent,
    ProductFormComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ProductCategoryListComponent,    
    ProductDetailComponent,
    ProductBuyerListComponent,
    // SellerCompanyFormComponent,
    // SellerDetailComponent,
    BuyerListComponent,
    SellerListComponent,
    SellerSocialnetworkComponent,
    SubcategoryListComponent,
    ViewProviderToClienteComponent,
    SellerCategoryListComponent,
    TenderFormComponent,
    TenderDetailComponent,
    TenderListComponent,
    TenderTableComponent, 
    HeaderComponent,
    NavbarMenuCategoryComponent,
    ModalMsComponent,
    ProducSearchListComponent,
    ChatComponent,
    ChatMiniComponent,
    NavbarGeneralPhoneComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  

  constructor(library: FaIconLibrary) {
    library.addIcons(faShirt, faBuilding, faHome, faLaptop, faShoppingCart, faMagnifyingGlass, faUser, faSignOut, faStore, faFacebook, faInstagram, faYoutube, faHandshake, faHeadset, faHandHoldingMedical, faTag, faRectangleAd, faShareNodes, faRightFromBracket, faUsers, faBuildingCircleExclamation, faAddressCard, faBasketShopping, faTrash, faLocationDot, faMobilePhone, faEnvelope, faBriefcase, faAddressBook, faListCheck, faFile, faBars, faCalendar, faFileArrowDown, faCheckSquare, faNewspaper, faBoxOpen, faArrowsRotate,faBox, faComment, faCircleUser, faPaperPlane, faMinus, faClose, faXmark, faCirclePlus, faArrowLeft, faWindowMaximize);
  }

}
