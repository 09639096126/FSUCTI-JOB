import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ui';
  userData = signal({})
  constructor(private auth:AuthService,private router:Router){
this.auth.currentUser.subscribe((user) =>{
  console.log(user);
  this.userData.set(user?.user_metadata?.['email']);
  console.log(this.userData());
})
  }
  signOut(){
    this.auth.signOut()
    this.router.navigate(['/signup'])
    
  }
}
