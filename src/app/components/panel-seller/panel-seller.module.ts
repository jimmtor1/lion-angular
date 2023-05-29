import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelSellerRoutingModule } from './panel-seller-routing.module';
import { PanelSellerComponent } from './panel-seller.component';
import { MenuSellerComponent } from './menu-seller/menu-seller.component';
import { DetailSellerComponent } from './detail-seller/detail-seller.component';
import { ProductsSellerComponent } from './products-seller/products-seller.component';
import { TendersSellerComponent } from './tenders-seller/tenders-seller.component';
import { FormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faSignOut, faListCheck, faBuilding, faUsers, faBox, faCircleInfo } from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [
    PanelSellerComponent,
    MenuSellerComponent,
    DetailSellerComponent,
    ProductsSellerComponent,
    TendersSellerComponent    
  ],
  imports: [
    CommonModule,
    PanelSellerRoutingModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class PanelSellerModule { 

  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebook, faInstagram, faYoutube, faSignOut, faListCheck, faBuilding, faUsers, faBox, faCircleInfo)
  }

}
