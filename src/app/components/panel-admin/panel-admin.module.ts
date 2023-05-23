import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { PanelAdminComponent } from './panel-admin.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { TendersComponent } from './tenders/tenders.component';


@NgModule({
  declarations: [
    PanelAdminComponent,
    MenuAdminComponent,
    CompaniesComponent,
    CustomersComponent,
    TendersComponent
  ],
  imports: [
    CommonModule,
    PanelAdminRoutingModule    
  ]
})
export class PanelAdminModule { }
