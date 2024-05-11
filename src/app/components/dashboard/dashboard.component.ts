import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { GalleryService } from '../../services/gallery.service';
import {v4 as uuid} from 'uuid';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userId= signal('')
  authService = inject(AuthService)
  gallareyService = inject(GalleryService)
  err_msg_file = signal('')
  imageData =signal([])

  urlCDN = signal('https://ageacuywtiyjkpkkmmtm.supabase.co/storage/v1/object/public/Photos/')
  
  getSelectedPhoto(){
    this.gallareyService
    .download('Photos', this.userId() + '/').then((data:any)=>{
      console.log(data);
      this.imageData.set(data?.data);
    })
  }
constructor(){
effect(()=>{
this.authService.currentUser.subscribe((user)=>{

  this.userId.set(user?.id||'')
  console.log(this.userId());
  this.getSelectedPhoto();
})
}, {allowSignalWrites:true});
}
uploadPhoto(event:Event){
  const input= event.target as HTMLInputElement;
  console.log(input.files);

  if (!input.files || input.files.length ===0){
    this.err_msg_file.set('Photos does not exist')

    return
  }
const file:File = input.files[0];
const id:string  = uuid();
  this.gallareyService.upload('Photos',this.userId() + '/' + id,file).then((data)=>{
    if(data.error){
      this.err_msg_file.set(`${data.error.message},please upload new photo`)
    }else{
this.getSelectedPhoto();  
    }
  })

}

}
