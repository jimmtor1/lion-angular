import { NgModule } from '@angular/core';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BuyerListComponent } from './components/buyer-list/buyer-list.component';
import { SellerListComponent } from './components/seller-list/seller-list.component';
import { SellerSocialnetworkComponent } from './components/seller-socialnetwork/seller-socialnetwork.component';

import { faAddressBook, faAddressCard, faArrowLeft, faArrowsRotate, faBars, faBasketShopping, faBox, faBoxOpen, faBriefcase, faBuilding, faBuildingCircleExclamation, faCalendar, faCheckSquare, faSquareXmark, faCircleMinus, faCirclePlus, faCircleUser, faClose, faCoins, faComment, faEnvelope, faEye, faFile, faFileArrowDown, faHandHoldingMedical, faHandshake, faHeadset, faHome, faLaptop, faListCheck, faLocationDot, faMagnifyingGlass, faMinus, faMobilePhone, faNewspaper, faPaperPlane, faPencil, faRectangleAd, faRightFromBracket, faRocket, faShareNodes, faShirt, faShoppingCart, faSignOut, faStore, faTag, faTrash, faUser, faUserPlus, faUsers, faWindowMaximize, faXmark, faClock, faGear, faRightLong, faLeftLong, faCar, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ViewProviderToClienteComponent } from './components/view-provider-to-cliente/view-provider-to-cliente.component';
import { SellerCategoryListComponent } from './components/seller-category-list/seller-category-list.component';
import { TenderFormComponent } from './components/tender-form/tender-form.component';
import { TenderDetailComponent } from './components/tender-detail/tender-detail.component';
import { TenderListComponent } from './components/tender-list/tender-list.component';
import { TenderTableComponent } from './components/tender-table/tender-table.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalMsComponent } from './components/modal-ms/modal-ms.component';
// import { ChatComponent } from './components/chat/chat.component';
import { ChatMiniComponent } from './components/chat-mini/chat-mini.component';
import { NavbarGeneralPhoneComponent } from './components/navbar-general-phone/navbar-general-phone.component';
import { AuthInterceptor } from './auth.interceptor';
import { MarketingComponent } from './marketing/marketing.component';
import { PromotionsComponent } from './modules/promotions/promotions.component';
import { PrivacyPageComponent } from './components/privacy-page/privacy-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetEmailSentComponent } from './components/reset-email-sent/reset-email-sent.component';
import { CancelSuscriptionComponent } from './components/cancel-suscription/cancel-suscription.component';
import { ProductCardMiniComponent } from './components/shared/product-card-mini/product-card-mini.component';
import { NewCategoryListComponent } from './components/new-category-list/new-category-list.component';
import { SubcategoryListComponent2 } from './components/subcategory-list copy/subcategory-list.component';
import { AllRandomProductsComponent } from './components/shared/all-random-products/all-random-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProducSearchListComponent } from './components/produc-search-list/produc-search-list.component';
import { HomeComponent } from './components/home/home.component';
import { CommaDecimalPipe } from './util/comma-decimal.pipe';
import { TruckComponent } from './components/truck/truck.component';
import { CircleCategoryComponent } from './components/circle-category/circle-category.component';
import { TruckDetailComponent } from './components/truck-detail/truck-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, 
    ProductFormComponent,
    RegisterFormComponent,
    LoginFormComponent,
    ProductCategoryListComponent,
    ProductDetailComponent,
    BuyerListComponent,
    SellerListComponent,
    SellerSocialnetworkComponent,
    SubcategoryListComponent2,
    ViewProviderToClienteComponent,
    SellerCategoryListComponent,
    TenderFormComponent,
    TenderDetailComponent,
    TenderListComponent,
    TenderTableComponent,
    HeaderComponent,
    ModalMsComponent,
    ProducSearchListComponent,
    // ChatComponent,
    ChatMiniComponent,
    NavbarGeneralPhoneComponent,
    MarketingComponent,
    PromotionsComponent,
    PrivacyPageComponent,
    ResetPasswordComponent,
    ResetEmailSentComponent,
    CancelSuscriptionComponent,
    ProductCardMiniComponent,
    NewCategoryListComponent,
    AllRandomProductsComponent,
    CommaDecimalPipe,
    TruckComponent,
    CircleCategoryComponent,
    TruckDetailComponent
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
    library.addIcons(faShirt, faBuilding, faHome, faLaptop, faShoppingCart, faMagnifyingGlass, faUser, faSignOut, faStore, faFacebook, faInstagram, faYoutube, faHandshake, faHeadset, faHandHoldingMedical, faTag, faRectangleAd, faShareNodes, faRightFromBracket, faUsers, faBuildingCircleExclamation, faAddressCard, faBasketShopping, faTrash, faLocationDot, faMobilePhone, faEnvelope, faBriefcase, faAddressBook, faListCheck, faFile, faBars, faCalendar, faFileArrowDown, faCheckSquare, faSquareXmark, faNewspaper, faBoxOpen, faArrowsRotate, faBox, faComment, faCircleUser, faPaperPlane, faMinus, faClose, faXmark, faArrowLeft, faWindowMaximize, faUserPlus, faCirclePlus, faCircleMinus, faRocket, faCoins, faPencil, faEye, faClock, faGear, faRightLong, faLeftLong,faCar,faTruck);
  }

}
