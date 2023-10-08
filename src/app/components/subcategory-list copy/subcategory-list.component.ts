import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cate } from 'src/app/models/subcategory-list-bycategory';
import { MapCategoryService } from 'src/app/services/map-category.service';
import { NewCategory } from 'src/app/models/newCategory';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css']
})

export class SubcategoryListComponent2 implements OnInit {

  item: number;
  title2: string = "";
  cate: Cate = new Cate();
  titleCategory: NewCategory = new NewCategory();
  
  private intervalId: any;

  constructor(private route: ActivatedRoute, public mapCategoryService: MapCategoryService) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
    this.item = parseInt(param['id']);

      let x = this.mapCategoryService.get(this.item, 1);

      if (!x) {
        this.intervalId = setInterval(() => {
          if (this.titleCategory.name) {
            clearInterval(this.intervalId);
          } else {
            this.titleCategory = this.mapCategoryService.get(this.item, 1)[0];
          }
        }, 1000);
      } else {
        this.titleCategory = x[0];
      }
    })

  }



}
