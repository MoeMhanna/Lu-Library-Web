import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MajorsPage } from './majors-page';

const routes: Routes = [
  {
    path: '',
    component: MajorsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MajorsRoutingModule {
}
