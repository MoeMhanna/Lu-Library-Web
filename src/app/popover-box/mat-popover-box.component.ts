import { Component, Inject, InjectionToken, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { PopoverItemDataTypeEnum } from './enum/popover-Item-data-type.enum';
import { PopoverBoxService } from './service/popover-box.service';
import { PopoverBoxInterface } from './interface/popover-box.interface';

export const POPOVER_BOX_CONTAINER_ACTION_LIST = new InjectionToken<any>("POPOVER_BOX_CONTAINER_ACTION_LIST");
export const POPOVER_BOX_CONTAINER_DATA_CONTEXT = new InjectionToken<any>("POPOVER_BOX_CONTAINER_DATA_CONTEXT");

@Component({
	templateUrl: "mat-popover-box.component.html",
	styleUrls: ["mat-popover-box.component.scss"]
})
export class MatPopoverBoxComponent implements OnInit {
	public PopoverItemDataTypeEnum = PopoverItemDataTypeEnum;

	constructor(@Inject(POPOVER_BOX_CONTAINER_ACTION_LIST) public itemList: Array<PopoverBoxInterface>,
				@Inject(POPOVER_BOX_CONTAINER_DATA_CONTEXT) public dataContext: any,
				private popoverBoxService: PopoverBoxService) {
	}

	ngOnInit(): void {
		this.itemList = _.filter(this.itemList, { visible: true });
	}

	public invokeHandler(item: PopoverBoxInterface) {
		item.handler(this.dataContext);
		this.popoverBoxService.closePanel();
	}
}
