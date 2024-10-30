import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  subscribedObj: any;
  categoriesList: any = [];
  itemsPerSlide = 5;
  singleSlideOffset = true;
  noWrap = true;
  productsList: any = [];

  constructor(private apiService: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCategories();
    this.getProductList();
  }

  getCategories() {
    this.subscribedObj = this.apiService.commonGet('categories').subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.categoriesList = res.slice(0, 15);
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

  getProductList() {
    this.subscribedObj = this.apiService.commonGet('products').subscribe({
      next: (res: any) => {
        if (res.length > 0) {
          this.productsList = res.slice(0, 9);
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

  setDefaultPic(event: any) {
    event.target.src = 'assets/img/Broken_img.png';
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscribedObj) {
      this.subscribedObj.unsubscribe();
    }
  }
}
