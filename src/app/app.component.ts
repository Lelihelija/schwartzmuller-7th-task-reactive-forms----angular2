import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  myForm: FormGroup
  constructor() {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'name': new FormControl(null, [Validators.required], [this.forbidTestName]),
      'mail': new FormControl(null, [Validators.required, Validators.email]),
      'status': new FormControl(null),
    })
  }

  get name(): AbstractControl {
    return this.myForm.get('name')
  }
  get mail(): AbstractControl {
    return this.myForm.get('mail')
  }

  forbidTestName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (!control.value) {
          return
        }
        control.value.toLowerCase() === 'test'
          ? resolve({ 'forbiddenTestName': true })
          : resolve(null)
      }, 1500)
    })

    return promise
  }

  onSubmit(): void {
    console.log('onSubmit:', this.myForm.value)
  }
}
