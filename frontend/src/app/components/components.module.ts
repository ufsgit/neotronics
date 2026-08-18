import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { LeadFilterDropdownComponent } from './lead-filter-dropdown/lead-filter-dropdown/lead-filter-dropdown.component';
import { SearchableDropdownComponent } from './searchable-dropdown/searchable-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DialogBoxComponent,
    LeadFilterDropdownComponent,
    SearchableDropdownComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    DialogBoxComponent,
    LeadFilterDropdownComponent,
    SearchableDropdownComponent
  ]
})
export class ComponentsModule { }
