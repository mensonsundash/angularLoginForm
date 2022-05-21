import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {

  Invoices:any = [];

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetInvoices().subscribe(res => {
      console.log(res)
      this.Invoices = res;
    });
  }

  delete(id:any, i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteInvoice(id).subscribe((res) => {
        this.Invoices.splice(i, 1);
      })
    }
  }
}
