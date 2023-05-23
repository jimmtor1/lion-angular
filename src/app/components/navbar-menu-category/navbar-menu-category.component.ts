import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, fromEvent, map, startWith } from 'rxjs';
import { Cate } from 'src/app/models/subcategory-list-bycategory';

@Component({
  selector: 'navbar-menu-category',
  templateUrl: './navbar-menu-category.component.html',
  styleUrls: ['./navbar-menu-category.component.css']
})
export class NavbarMenuCategoryComponent implements OnInit {

  item: number;
  cate: Cate = new Cate();
  subCount:number=0;
  public isMobile$: Observable<boolean>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.isMobile$ = fromEvent(window, 'resize').pipe(
      map(() => window.innerWidth <= 768),
      startWith(window.innerWidth <= 768)
    );

    this.route.params.subscribe(param => {
      this.item = parseInt(param['id']);
      this.subCount = 0
    });
    
  }

  getIdSub(id:number):number{
    console.log(id);
    return id;
  }

}
