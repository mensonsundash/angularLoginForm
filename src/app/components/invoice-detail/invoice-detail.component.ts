import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) { 
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetInvoice(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        reference: res['reference'],
        description: res['description']
      });
    });

    this.updateForm = this.formBuilder.group({
      name: [''],
      reference: [''],
      description: ['']
    })
  }

  ngOnInit(): void {}

  onUpdate():any {
    this.crudService.updateInvoice(this.getId, this.updateForm.value).subscribe(() => {
      console.log('Data Updated Successfully!')
      this.ngZone.run(() => this.router.navigateByUrl('/invoice-list'))
    }, (err) => {
      console.log(err);
    });
  }

}
