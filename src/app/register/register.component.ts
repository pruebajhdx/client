import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  selectedFile!: File;
  imgSrc: any = null;
  isLoading: Boolean = false;
  showLogin: Boolean = false;
  dataAsk: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getLatestAskForm().subscribe((response)=>{
      this.dataAsk = response;
    })

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      id_phone: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      favorite_artist: ['', Validators.required],
      favorite_food: ['', Validators.required],
      favorite_place: ['', Validators.required],
      favorite_color: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
      profile_image: [null],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imgSrc = reader.result);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.registerForm.value.name);
    formData.append('last_name', this.registerForm.value.last_name);
    formData.append('email', this.registerForm.value.email);
    formData.append(
      'phone',
      this.registerForm.value.id_phone + this.registerForm.value.phone
    );
    formData.append('country', this.registerForm.value.country);
    formData.append('favorite_food', this.registerForm.value.favorite_food);
    formData.append('favorite_artist', this.registerForm.value.favorite_artist);
    formData.append('favorite_place', this.registerForm.value.favorite_place);
    formData.append('favorite_color', this.registerForm.value.favorite_color);
    formData.append('password', this.registerForm.value.password);
    formData.append(
      'confirm_password',
      this.registerForm.value.confirm_password
    );
    formData.append('profile_image', this.selectedFile, this.selectedFile.name);

    this.isLoading = true;
    this.userService.registerUser(formData).subscribe(
      (response) => {
        console.log(response);
        this.isLoading = false;
        alert('Registro exitoso!');
        this.showLogin = true;
      },
      (error) => {
        console.log(error);
        alert('Error al registrar usuario');
      }
    );
  }
}
