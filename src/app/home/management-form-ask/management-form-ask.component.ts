
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-management-form-ask',
  templateUrl: './management-form-ask.component.html',
  styleUrls: ['./management-form-ask.component.css']
})
export class ManagementFormAskComponent implements OnInit {
  askForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.askForm = this.formBuilder.group({
      ask_one: ['', Validators.required],
      ask_two: ['', Validators.required],
      ask_three: ['', Validators.required],
      ask_four: ['', Validators.required],
    });

    this.userService.getLatestAskForm().subscribe(
      (data) => {
        this.askForm.patchValue(data);
        console.log(this.askForm)

      },
      (error) => {
        console.log(error);
      }
    );
  }

  createAskForm() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    
    const data = {
      ask_one: this.askForm.value.ask_one,
      ask_two: this.askForm.value.ask_two,
      ask_three: this.askForm.value.ask_three,
      ask_four: this.askForm.value.ask_four
    };

    this.userService.updateAskForm(headers, 1, data).subscribe(
      (data) => {
        location.reload()
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
