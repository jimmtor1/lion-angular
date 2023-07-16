import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PromotionsComponent } from "./promotions.component";
import { PromotionHistoryComponent } from "./promotion-history/promotion-history.component";
import { PromoteComponent } from "./promote/promote.component";

const routes: Routes = [
  {path:'',component:PromotionsComponent, children: [
    {path:'',redirectTo: 'promotions', pathMatch:'full'},
    {path:'promotions', component: PromotionHistoryComponent},
    {path:':idproduct/promote', component: PromoteComponent}    
  ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class promotionsRoutingModule { }