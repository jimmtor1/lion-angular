import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelBuyerRoutingModule } from './panel-buyer-routing.module';
import { PanelBuyerComponent } from './panel-buyer.component';
import { MenuBuyerComponent } from './menu-buyer/menu-buyer.component';
import { ProfileBuyerComponent } from './profile-buyer/profile-buyer.component';
import { TenderBuyerComponent } from './tender-buyer/tender-buyer.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignOut, faListCheck, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PanelBuyerComponent,
    MenuBuyerComponent,
    ProfileBuyerComponent,
    TenderBuyerComponent
  ],
  imports: [
    CommonModule,
    PanelBuyerRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class PanelBuyerModule { 

  constructor(library: FaIconLibrary) {
    library.addIcons(faSignOut, faListCheck, faAddressCard)
  }

}
