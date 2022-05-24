import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { AddInvoiceComponent } from './components/add-invoice/add-invoice.component';
import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';

const routes: Routes = [
  // { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'invoice-list' },
  { path: 'invoice-list', component: InvoiceListComponent },
  { path: 'add-invoice', component: AddInvoiceComponent },
  { path: 'edit-invoice/:id', component: InvoiceDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
