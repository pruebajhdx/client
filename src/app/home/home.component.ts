import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
    
  user: any;
  object: any;
  nameProfile: any;
  imageUrl!: string;
  isAdmin!: boolean

  constructor(private userService:UserService, private router: Router){ }

  open:boolean = false

  ngOnInit(){
    this.user =  localStorage.getItem('user');
    this.object = JSON.parse(this.user); 
    this.nameProfile = this.object.profile_image.split('/')[3];
    this.imageUrl = `${environment.API_URL}/profile-images/${this.nameProfile}`;
    this.object.role == 'admin' ? this.isAdmin = true : this.isAdmin = false
  }

  getUsersAdmin():Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.userService.getAllUserAdmin(headers);
  }
  

  onLogout():void{
    let token = localStorage.getItem('token');
    let user_id = localStorage.getItem('user_id');
    console.log(token+" "+user_id);
    this.userService.logOutUser(user_id).subscribe(
      response => { 
        console.log(response); 
        localStorage.clear();
        if(this.isAdmin = true ) this.isAdmin = false
        this.router.navigate(['']);        
      },
      err => { console.log(err); }
    )
  }

}
