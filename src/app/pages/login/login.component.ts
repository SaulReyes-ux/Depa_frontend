import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UploadImgService } from 'src/app/services/upload-img.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faFacebookF, faTwitter, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faUser, faMailBulk } from '@fortawesome/free-solid-svg-icons'
import { TranslationService } from 'src/app/services/translation.service';
import { ActivatedRoute } from '@angular/router';

export enum ModalState {
  Login,
  Signup,
  SendCode,
  Verification,
  VerificationSuccess
}

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ModalState = ModalState;
  currentModalState: ModalState = ModalState.Signup;
  
  @ViewChild('container') container: any

  siteKey: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private uploadImgService: UploadImgService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private translationService: TranslationService) {
    this.formSignup = this.fb.group({
      recaptcha: ['', Validators.required],
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    this.formLogin = this.fb.group({
      recaptcha: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
    this.verificationForm = this.fb.group({
      verificationCode: ['', Validators.required]
    });
    this.siteKey = '6Ld4rsIpAAAAADiVYypHnO4edlQn6bGEOqsxJIGD'

    this.route.queryParams.subscribe(params => {
      const isLogin = params['isLogin'];
      if(isLogin === 'true') this.toggleLogin();
      else this.toggleSignup();
    });
  }
  faUser = faUser
  faMailBulk = faMailBulk
  facebook = faFacebookF
  twitter = faTwitter
  google = faGoogle
  formSignup !: FormGroup
  formLogin !: FormGroup
  user!: User
  possibleUser !: User
  subscription!: Subscription
  verificationError: boolean = false
  verificationForm: FormGroup;
  imgData = {
    imgUrl: '',
    height: 500,
    width: 500
  }

  ngOnInit(): void {
    this.formSignup.patchValue(this.userService.getEmptyUser())
    this.formLogin.patchValue(this.userService.getEmptyUser())
  }

  async onSubmit(type: string) {
    const coords = type === 'signup' ? this.formSignup.value : this.formLogin.value
    const user = { ...coords, imgUrl: this.imgData.imgUrl, hostMsg: 0, userMsg: 0 }
    try {
      if (this.currentModalState == ModalState.Signup) await this.userService.signup(user)
      else await this.userService.login(coords)
    
      if(!await this.userService.userVerificated(user))
      {
        //Mostrar modal de verificacion de usuario con un codigo
        this.possibleUser = user
        this.currentModalState = ModalState.SendCode
      }
      else
      {
        this.router.navigateByUrl('')
      }
    } catch (err) {
      this.snackBar.open('Username or password wrong', 'Close', { duration: 3000 })
      console.log(err)
    }
  }

  async onSignDemo() {
    const demoCoords = this.userService.getEmptyUser() as User
    demoCoords.username = 'demo'
    demoCoords.password = 'demo'
    await this.userService.login(demoCoords)
    this.router.navigateByUrl('')
  }

  async uploadImg(ev: Event) {
    const { secure_url, height, width } = await this.uploadImgService.uploadImg(ev)
    this.imgData = { imgUrl: secure_url, width, height }
  }

  onToggleSign() {
    if(this.currentModalState == ModalState.Signup)
    {
      this.currentModalState = ModalState.Login
    }
    else
    {
      this.currentModalState = ModalState.Signup
    }
  }

  getTranslation(key: string): string {
    return this.translationService.getTranslation(key);
  }

  toggleLogin() {
    this.currentModalState = ModalState.Login
  }

  toggleSignup() {
    this.currentModalState = ModalState.Signup
  }

  openVerificationModal() {
    this.currentModalState = ModalState.Verification
  }

  closeVerificationModal() {
    this.currentModalState = ModalState.Signup
    this.userService.logout()
  }

  sendVerificationCode(){
    //Enviar codigo de verificacion al correo
    this.userService.sendVerificationCode(this.possibleUser.username);
    this.currentModalState = ModalState.Verification
  }

  verifyCode(){
    this.verifyCodeAsync()
  }

  async verifyCodeAsync(){
    //Verificar el codigo de verificacion
    if(await this.userService.verifyUser(this.verificationForm.value, this.possibleUser))
    {
      this.currentModalState = ModalState.VerificationSuccess
    }
    else
    {
      this.verificationError = true
    }
  }

  closeVerificationModalAsSuccess(){
    this.currentModalState = ModalState.VerificationSuccess
    this.router.navigateByUrl('')
  }

}
