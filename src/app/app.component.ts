import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  imgParent = 'https://www.w3schools.com/howto/img_avatar.png';
  showImg = true;
  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile().subscribe();
    }
  }

  onLoaded(mensaje: string) {
    console.log('LOG PADRE');
    console.log(mensaje);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'Erik',
        email: 'erik.flores@mail.com',
        password: '112233',
        avatar: 'https://api.lorem.space/image/face?w=640&h=480&r=10',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  downloadPDF() {
    this.fileService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'application/pdf'
      )
      .subscribe();
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }

  login() {
    this.authService
      .login('erik.flores@mail.com', '112233')
      .subscribe((rta) => {
        this.token = rta.access_token;
      });
  }

  getProfile() {
    this.authService.profile().subscribe((profile) => {
      console.log(profile);
    });
  }
}
