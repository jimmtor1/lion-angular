import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromoteComponent } from './promote/promote.component';
import { PromotionHistoryComponent } from './promotion-history/promotion-history.component';
import { promotionsRoutingModule } from './promotions-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    PromoteComponent,
    PromotionHistoryComponent
  ],
  imports: [
    CommonModule,
    promotionsRoutingModule,
    FontAwesomeModule,
  ]
  
})
export class PromotionsModule { }
