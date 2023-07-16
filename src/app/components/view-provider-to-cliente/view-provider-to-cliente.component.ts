import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Seller } from 'src/app/models/seller';
import { IMG_PRODUCT_URL, IMG_PROFILE_URL, select_city, select_fed } from 'src/app/services/helper';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';
import { SellerService } from 'src/app/services/seller.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'view-provider-to-cliente',
  templateUrl: './view-provider-to-cliente.component.html',
  styleUrls: ['./view-provider-to-cliente.component.css']
})

export class ViewProviderToClienteComponent implements OnInit {

  seller: Seller = new Seller();
  producByProvider: Product[] = [];
  loading: boolean = true;
  iduser:number = 0;

  url_prof_img = `${IMG_PROFILE_URL}`;
  url_prod_img = `${IMG_PRODUCT_URL}`;

  fed: string = "Nije odabrano";
  city: string = "Nije odabrano";

  constructor(private route: ActivatedRoute, private sellerService: SellerService, private productService: ProductService, private modelChat: ModalService, private deviceService: DeviceDetectorService, private router:Router) {
   
  }

  ngOnInit(): void {

    this.route.params.subscribe(param => {

      if (param['id'] != null) {

        this.sellerService.getById(param['id']).subscribe(pro => {
          this.seller = pro;
          if (this.seller.user.federation) {
            let x = select_fed(this.seller.user.federation);
            if (x) {
              this.fed = x.name;
            }
          }

          if (this.seller.user.city) {
            this.city = select_city(this.seller.user.city).name;
          }

          this.loading = false;
        });

        this.productService.getAllByProvider(param['id']).subscribe(result => {
          result.forEach(r => {
            this.producByProvider.push(r);
          })
        });

      }

      let iduser = localStorage.getItem('iduser');
      if(iduser){
        this.iduser = parseInt(iduser);
      }

    });


  }

  emitSeller(idseller: number) {

    const isDesktopDevice = this.deviceService.isDesktop();

    if (isDesktopDevice) {

      this.modelChat.openChat(0);

      setTimeout(() => {
        this.modelChat.openChat(idseller);
      }, 0);

    }else{

      this.router.navigate(['/chat2/sendmsg/'+idseller]);

    }



  }

  

}
