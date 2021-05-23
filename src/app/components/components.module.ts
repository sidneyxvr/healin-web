import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { StatusDirective } from './status.directive';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { TopnavComponent } from './topnav/topnav.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchComponent } from './search/search.component';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';

@NgModule({
  declarations: [
    TopnavComponent,
    FooterComponent,
    PaginationComponent,
    SearchComponent,
    StatusDirective,
    ConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    CollapseModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  exports: [
    TopnavComponent,
    FooterComponent,
    PaginationComponent,
    SearchComponent,
    StatusDirective,
    ConfirmationDialogComponent
  ],
  providers: [
    ConfirmationDialogService
  ]
})
export class ComponentsModule { }
