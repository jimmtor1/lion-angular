import { Component, OnInit } from '@angular/core';
import { NewCategory } from 'src/app/models/newCategory';
import { CategoryService } from 'src/app/services/category.service';
import { MapCategoryService } from 'src/app/services/map-category.service';

@Component({
  selector: 'app-new-category-list',
  templateUrl: './new-category-list.component.html',
  styleUrls: ['./new-category-list.component.css']
})
export class NewCategoryListComponent implements OnInit {

  constructor(private categoryService: CategoryService, public mapCategoryService: MapCategoryService) { }

  anchoProgreso: string = '';
  time: any;
  show: string = '';
  showing: boolean = false;

  categoryList: NewCategory[];

  ngOnInit(): void {

    this.categoryService.getAll2().subscribe(list => {
      this.categoryList = list;
      this.order();
    });

  }

  order() {

    this.categoryList.forEach((item) => {

      const key: number = item.level == 1 ? item.id : item.idcategory!;

      if (!this.mapCategoryService.has(key, item.level)) {
        this.mapCategoryService.set(key, [item], item.level);
      } else {
        this.mapCategoryService.get(key, item.level)?.push(item)
      }
    });    
  }

  showElement(element: number) {

    this.anchoProgreso = "element" + element;
    this.time = setTimeout(() => {
      this.show = "element" + element;
    }, 300);

  }

  hideElement() {

    if (!this.showing) {
      this.anchoProgreso = "";
      clearTimeout(this.time);
      this.show = '';
    }
    
  }

  showElement2(element: number) {
    this.show = "element" + element;
    this.showing = true;
  }

  hideElement2() {
    clearTimeout(this.time);
    this.showing = false;
    this.show = '';
  }

}
