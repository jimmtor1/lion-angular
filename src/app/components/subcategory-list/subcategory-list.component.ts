import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cate } from 'src/app/models/subcategory-list-bycategory';

@Component({
  selector: 'subcategory-list',
  templateUrl: './subcategory-list.component.html',
  styleUrls: ['./subcategory-list.component.css']
})

export class SubcategoryListComponent implements OnInit {

  item: number;
  cate: Cate = new Cate();  

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(param => {
      this.item = parseInt(param['id']);
     
    })

  }



}
