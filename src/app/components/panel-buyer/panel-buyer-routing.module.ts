import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileBuyerComponent } from './profile-buyer/profile-buyer.component';
import { TenderBuyerComponent } from './tender-buyer/tender-buyer.component';
import { PanelBuyerComponent } from './panel-buyer.component';
import { TenderFormComponent } from '../tender-form/tender-form.component';
import { TenderDetailComponent } from '../tender-detail/tender-detail.component';

const routes: Routes = [
  {path:'',component:PanelBuyerComponent, children: [
    {path:'', redirectTo: 'profile', pathMatch:'full'},
    {path:'profile',component:ProfileBuyerComponent},
    {path:'tenders',component:TenderBuyerComponent},
    {path:'newtender', component:TenderFormComponent},
    {path:'tenderDetail/:idtender', component:TenderDetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelBuyerRoutingModule { }
