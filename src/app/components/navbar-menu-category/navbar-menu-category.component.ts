import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  subCount: number = 0;
  public isMobile$: Observable<boolean>;

  show: string = '';
  showing: boolean = false;

  anchoProgreso: string = '';

  // @ViewChild('sublista') sublist: ElementRef;
  time: any;

  constructor(private route: ActivatedRoute, private render: Renderer2) { }

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

  getIdSub(id: number): number {
    console.log(id);
    return id;
  }

  // @HostListener('mouseenter')
  // onMouseEnter() {
  //   this.time = setTimeout(() => {
  //     this.render.addClass(this.sublist.nativeElement, 'visible');
  //   }, 1000);
  // }

  showElement(element: number) {  
   
    this.anchoProgreso = "element" + element;
    this.time = setTimeout(() => {      
      this.show = "element" + element;
    }, 300);
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

  hideElement() { 
    
    if (!this.showing) {
      this.anchoProgreso = "";   
      clearTimeout(this.time);
      this.show = '';
    }
  }

}
