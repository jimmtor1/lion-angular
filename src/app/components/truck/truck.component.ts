import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Truck } from 'src/app/models/truck';
import { ModalService } from 'src/app/services/modal.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {

  @Input() formData: FormData;

  loading: boolean = true;
  authorizedSeller: boolean;
  priceRequest: boolean = false;
  brands: any[];
  trucktypes: any[];
  registerDates: string[] = [];
  isNewProduct = true;
  @Output() dataEvent = new EventEmitter<boolean>();
  truck: Truck = new Truck();
 

  constructor(private truckService: ProductService, private modaService: ModalService, private router: Router) { }

  ngOnInit(): void {

    this.truckService.getTruckBrands().subscribe(b => {
      this.brands = b;
    });

    this.truckService.getTruckTypes().subscribe(t => {
      this.trucktypes = t;
    });

   
    if (this.formData.get('idproduct')) {
      const i = parseInt(this.formData.get('idproduct')!.toString())
      if (i > 0) {
        this.truckService.getOneTruck(i).subscribe(t => {
          this.truck = t;
          this.loading=false;
        });
      }      
      this.lastMonths();
      this.isNewProduct = false;
    }else{
      this.loading = false;
    }


  }

  submit() {

    // console.log(this.truck);

    this.loading = true;

    if (this.truck.id) {
      this.formData.append('id', this.truck.id.toString());
    }
    this.formData.append('brand', this.truck.brand.toString());
    this.formData.append('modelYear', this.truck.modelYear.toString());
    this.formData.append('axes', this.truck.axes.toString());
    this.formData.append('truckType', this.truck.truckType.toString());
    this.formData.append('kilowatt', this.truck.kilowatt.toString());
    this.formData.append('horsepower', this.truck.horsepower.toString());
    this.formData.append('chassis', this.truck.chassis);
    this.formData.append('registered', this.truck.registered.toString());
    this.formData.append('registrationDate', this.truck.registrationDate);

    this.truckService.saveTruck(this.formData).subscribe(p => {
      if (p && p > 0) {
        this.loading = false;
        this.modaService.openModal("Uspješno ste dodali vaš oglas.", "success");
        this.router.navigate(['panelseller/products']);
      }
    }, error => { console.log(error); this.loading = false })

  }


  lastMonths() {

    this.truck.registered = !this.truck.registered;
    if (this.truck.registered) {
      const today = new Date();
      for (let i = 0; i < 13; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
        const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear();
        this.registerDates.push(formattedDate);
      }
    }

  }

  previous() {
    this.dataEvent.emit(false);
  }


}
