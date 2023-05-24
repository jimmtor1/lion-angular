import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelSellerComponent } from './panel-seller.component';
import { DetailSellerComponent } from './detail-seller/detail-seller.component';
import { ProductsSellerComponent } from './products-seller/products-seller.component';
import { TendersSellerComponent } from './tenders-seller/tenders-seller.component';
import { TenderDetailComponent } from '../tender-detail/tender-detail.component';
import { ProductFormComponent } from '../product-form/product-form.component';
import { TenderFormComponent } from '../tender-form/tender-form.component';

const routes: Routes = [
  {path:'',component:PanelSellerComponent, children: [
    {path:'',redirectTo: 'details', pathMatch:'full'},
    {path:'details', component: DetailSellerComponent},
    {path:'products', component: ProductsSellerComponent},
    {path:'tenders', component: TendersSellerComponent},
    {path:'tenderDetail/:idtender', component:TenderDetailComponent},
    {path:'product/:id', component:ProductFormComponent},
    {path:'product', component:ProductFormComponent},
    {path:'newtender', component:TenderFormComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelSellerRoutingModule { }
