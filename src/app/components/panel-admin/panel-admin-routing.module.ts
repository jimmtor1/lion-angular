import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdminComponent } from './panel-admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { TendersComponent } from './tenders/tenders.component';

const routes: Routes = [
  {path:'', component:PanelAdminComponent, children: [
    {path:'', redirectTo: 'companies', pathMatch:"full"},
    {path:'companies', component:CompaniesComponent},
    {path:'customers', component:CustomersComponent},
    {path:'tenders', component:TendersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
