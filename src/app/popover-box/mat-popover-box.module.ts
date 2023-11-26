import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatPopoverBoxComponent } from './mat-popover-box.component';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		FontAwesomeModule,
		OverlayModule,
		MatListModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatDatepickerModule,
		MatInputModule
	],
	providers: [],
	declarations: [MatPopoverBoxComponent],
	exports: [MatPopoverBoxComponent]
})
export class MatPopoverBoxModule {
}

