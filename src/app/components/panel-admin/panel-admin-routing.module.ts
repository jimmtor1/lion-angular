import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdminComponent } from './panel-admin.component';
import { CompaniesComponent } from './companies/companies.component';
import { CustomersComponent } from './customers/customers.component';
import { TendersComponent } from './tenders/tenders.component';
import { TenderDetailComponent } from '../tender-detail/tender-detail.component';
import { CustomerComponent } from './customer/customer.component';
import { CompanyComponent } from './company/company.component';
import { CoinRecordComponent } from './coin-record/coin-record.component';
import { AdManagementComponent } from './ad-management/ad-management.component';
import { CoinbycompanyComponent } from './coinbycompany/coinbycompany.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {path:'', component:PanelAdminComponent, children: [
    {path:'', redirectTo: 'companies', pathMatch:"full"},
    {path:'companies', component:CompaniesComponent},
    {path:'customers', component:CustomersComponent},
    {path:'tenders', component:TendersComponent},
    {path:'tenderDetail/:idtender', component:TenderDetailComponent},
    {path:'customer/:id', component:CustomerComponent},
    {path:'company/:iduser', component: CompanyComponent},
    {path:'coinrecord', component: CoinRecordComponent},
    {path:'admanagement', component: AdManagementComponent},
    {path:'coincompany/:iduser', component: CoinbycompanyComponent},
    {path:'setting', component: SettingComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
