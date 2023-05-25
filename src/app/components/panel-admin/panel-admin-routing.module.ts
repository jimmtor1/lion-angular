import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdminComponent } from './panel-admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { TendersComponent } from './tenders/tenders.component';
import { TenderDetailComponent } from '../tender-detail/tender-detail.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
  {path:'', component:PanelAdminComponent, children: [
    {path:'', redirectTo: 'companies', pathMatch:"full"},
    {path:'companies', component:CompaniesComponent},
    {path:'customers', component:CustomersComponent},
    {path:'tenders', component:TendersComponent},
    {path:'tenderDetail/:idtender', component:TenderDetailComponent},
    {path:'customer/:id', component:CustomerComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
