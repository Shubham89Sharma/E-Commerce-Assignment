import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ToastrModule } from 'ngx-toastr';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FlexLayoutModule,
    CarouselModule.forRoot(),
    ToastrModule.forRoot(),
  ],
})
export class LandingPageModule {}
