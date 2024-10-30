import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';
export interface PeriodicElement {
  title: number;
  price: string;
  description: string;
  category: string;
  image: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns: any = [
    'image',
    'title',
    'category',
    'price',
    'description',
    'action',
  ];
  subscriberObj: any;
  obj = {
    offset: '0',
    limit: '10',
  };

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.subscriberObj = this.apiService
      .commonGetWithParam('products', this.obj)
      .subscribe({
        next: (res: any) => {
          if (res.length > 0) {
            this.dataSource.data = res;
          } else {
            this.toastr.error(res.message, 'Error', {
              timeOut: 3000,
            });
          }
        },
        error: (err) => {
          this.toastr.error(err.message, 'Error', {
            timeOut: 3000,
          });
        },
        complete() {},
      });
  }

  public peginator(event: PageEvent) {
    this.obj = {
      offset: String(event.pageIndex),
      limit: String(event.pageSize),
    };
    this.getProductList();
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data;
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'image':
          return this.compare(a.image, b.image, isAsc);
        case 'title':
          return this.compare(
            a.title ? a.title : '',
            b.title ? b.title : '',
            isAsc
          );
        case 'category':
          return this.compare(
            a.category ? a.category : '',
            b.category ? b.category : '',
            isAsc
          );
        case 'price':
          return this.compare(
            a.price ? a.price : '',
            b.price ? b.price : '',
            isAsc
          );
        case 'description':
          return this.compare(
            a.description ? a.description : '',
            b.description ? b.description : '',
            isAsc
          );
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  viewDetail(val: any) {}

  ngOnDestroy() {
    if (this.subscriberObj) {
      this.subscriberObj.unsubscribe();
    }
  }
}
