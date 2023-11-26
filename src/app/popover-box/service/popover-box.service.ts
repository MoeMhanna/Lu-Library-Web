import { ElementRef, Injectable, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';

import {
  MatPopoverBoxComponent,
  POPOVER_BOX_CONTAINER_ACTION_LIST,
  POPOVER_BOX_CONTAINER_DATA_CONTEXT
} from '../mat-popover-box.component';
import { PopoverBoxInterface } from '../interface/popover-box.interface';

@Injectable({ providedIn: "root" })
export class PopoverBoxService {
  private isOverlayOpen = false;
  private overlayRef!: OverlayRef;
  private subscription = new Subscription();

  constructor(private overlay: Overlay,
              private injector: Injector) {
  }

  public openPanel(event: MouseEvent,
                   actionListItems: Array<PopoverBoxInterface>,
                   dataContext?: any,
                   popoverOverlayConfig?: OverlayConfig) {
    if (this.isOverlayOpen) {
      this.closePanel();
    }

    const target = {
      getBoundingClientRect: () => ({
        top: event.clientY,
        right: event.clientX
      })
    };
    console.log(target);
    const el = new ElementRef(target);
    let config = new OverlayConfig();
    config.hasBackdrop = true;
    if (popoverOverlayConfig) {
      config = popoverOverlayConfig;
    }

    config.positionStrategy = this.overlay.position()
      .flexibleConnectedTo(el)
      .withFlexibleDimensions()
      .withPositions([{
        originX: "end",
        originY: "top",
        overlayX: "start",
        overlayY: "top"
      }, {
        originX: "start",
        originY: "top",
        overlayX: "end",
        overlayY: "top"
      }, {
        originX: "end",
        originY: "bottom",
        overlayX: "start",
        overlayY: "bottom"
      }, {
        originX: "start",
        originY: "bottom",
        overlayX: "end",
        overlayY: "bottom"
      }
      ]);
    config.hasBackdrop = true;
    this.overlayRef = this.overlay.create(config);

    const subscription$ = this.overlayRef
      .backdropClick()
      .subscribe(() => {
        this.closePanel();
      });
    this.overlayRef.attach(new ComponentPortal(MatPopoverBoxComponent,
      null,
      this.createInjector(actionListItems, dataContext)));
    this.isOverlayOpen = true;
    this.subscription.add(subscription$);
  }

  public closePanel() {
    this.isOverlayOpen = false;
    this.overlayRef.dispose();
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
  }

  private createInjector(actionListItems: Array<PopoverBoxInterface>, dataContext?: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(POPOVER_BOX_CONTAINER_ACTION_LIST, actionListItems);
    injectorTokens.set(POPOVER_BOX_CONTAINER_DATA_CONTEXT, dataContext || {});
    return new PortalInjector(this.injector, injectorTokens);
  }
}

