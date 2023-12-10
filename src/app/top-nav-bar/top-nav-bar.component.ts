import { Component } from '@angular/core';
import { PageEnum } from './enum/page.enum';
import { PageInterface } from './interface/page-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.scss'
})
export class TopNavBarComponent {
  public showConfigureMenu = false
  public appPages: Array<PageInterface> = [
    {
      faIcon: ['fas', 'users'],
      title: 'LuLore users',
      visible: true,
      isPageActive: false,
      role: PageEnum.page,
      handler: async () => {
        await this.router.navigate(['/users']);
      }
    },
    {
      faIcon: ['fas', 'gear'],
      title: 'Configure',
      visible: true,
      isPageActive: false,
      role: PageEnum.accordion,
      handler: async () => {
        this.showConfigureMenu = !this.showConfigureMenu;
      }
    }
  ];
  public configureAppPages: Array<PageInterface> = [
    {
      faIcon: ['fas', 'book'],
      title: 'Books',
      visible: true,
      isPageActive: false,
      role: PageEnum.modal,
      handler: async () => {
        await this.router.navigate(['/books']);
      }
    },
    {
      faIcon: ['fas', 'chart-bar'],
      title: 'Majors',
      visible: true,
      isPageActive: false,
      role: PageEnum.modal,
      handler: async () => {
        await this.router.navigate(['/majors']);
      }
    },
  ];

  constructor(private router: Router) {
  }

  public dismissConfigureMenu() {
    this.showConfigureMenu = false;
  }
}
