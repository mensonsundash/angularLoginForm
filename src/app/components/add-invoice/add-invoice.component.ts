import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder, Form } from '@angular/forms';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.component.html',
  styleUrls: ['./add-invoice.component.css']
})
export class AddInvoiceComponent implements OnInit {

  invoiceForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { 
    this.invoiceForm = this.formBuilder.group({
      name: [''],
      reference: [''],
      description: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudService.AddInvoice(this.invoiceForm.value).subscribe(() => {
      console.log('Data added successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/invoice-list'))
    }, (err) => {
      console.log(err);
    });
  }

}
