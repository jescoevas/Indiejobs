import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

const { Camera, Filesystem } = Plugins


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage{

  form:FormGroup
  esTrabajador:boolean = false
  imagen:any = 'assets/images/avatar_vacio.png'
  //imagenArchivo:any

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router, private sanitizer:DomSanitizer) { 
    this.iniciarForm()
  }

  ionViewWillEnter() {
    this.iniciarForm()
    this.imagen = 'assets/images/avatar_vacio.png'
  }

  iniciarForm(){
    this.form = this.fb.group({
      nombre:['', [Validators.required, Validators.minLength(4)]],
      email:['', [Validators.required, Validators.email], [this.checkEmailEnUso]],
      password:['', [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:['', [Validators.required]],
      telefono:['', [this.checkTelefono], [this.checkTelefonoEnUso]],
      ciudad:['', [Validators.required]],
      direccion:['', [Validators.required]],
      codigoPostal:['', [Validators.required, this.checkNumerico]],
      trabajador:[false]
    })
  }

  iniciarFormConValores(value:any){
    this.form = this.fb.group({
      nombre:[value['nombre'] || '', [Validators.required, Validators.minLength(4)]],
      email:[value['email'] || '', [Validators.required, Validators.email], [this.checkEmailEnUso]],
      password:[value['password'] || '', [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:[value['fechaNacimiento'] || '', [Validators.required]],
      telefono:[value['telefono'] || '', [this.checkTelefono], [this.checkTelefonoEnUso]],
      ciudad:[value['ciudad'] || '', [Validators.required]],
      direccion:[value['direccion'] || '', [Validators.required]],
      codigoPostal:[value['codigoPostal'] || '', [Validators.required, this.checkNumerico]],
      trabajador:[false]
    })
  }

  trabajadorForm(value:any){
    this.form = this.fb.group({
      nombre:[value['nombre'], [Validators.required, Validators.minLength(4)]],
      email:[value['email'], [Validators.required, Validators.email], [this.checkEmailEnUso]],
      password:[value['password'], [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:[value['fechaNacimiento'], [Validators.required]],
      telefono:[value['telefono'], [this.checkTelefono], [this.checkTelefonoEnUso]],
      ciudad:[value['ciudad'], [Validators.required]],
      direccion:[value['direccion'], [Validators.required]],
      codigoPostal:[value['codigoPostal'], [Validators.required, this.checkNumerico]],
      trabajador:[true],
      empleo:['', [Validators.required]],
      descripcion:['', [Validators.required]],
    })
  }

  //Validaciones síncronas
  get nombreRequerido(){
    return this.form.get('nombre').errors ? this.form.get('nombre').errors.required && this.form.get('nombre').touched : null
  }
  get nombreLongitud(){
    return this.form.get('nombre').errors ? this.form.get('nombre').errors.minlength && this.form.get('nombre').touched : null
  }
  get emailRequerido(){
    return this.form.get('email').errors ? this.form.get('email').errors.required && this.form.get('email').touched : null
  }
  get emailNoValido(){
    return this.form.get('email').errors ? this.form.get('email').errors.email && this.form.get('email').touched : null
  }
  get emailEnUso(){
    return this.form.get('email').errors ? this.form.get('email').errors.emailEnUso && this.form.get('email').touched : null
  }
  get passwordRequerido(){
    return this.form.get('password').errors ? this.form.get('password').errors.required && this.form.get('password').touched : null
  }
  get passwordLongitud(){
    return this.form.get('password').errors ? this.form.get('password').errors.minlength && this.form.get('password').touched : null
  }
  get telefonoDebeSerNumerico(){
    return this.form.get('telefono').errors ? this.form.get('telefono').errors.debeSerNumerico && this.form.get('telefono').touched : null
  }
  get telefonoEnUso(){
    return this.form.get('telefono').errors ? this.form.get('telefono').errors.telefonoEnUso && this.form.get('telefono').touched : null
  }
  get fechaNacimientoRequerido(){
    return this.form.get('fechaNacimiento').errors ? this.form.get('fechaNacimiento').errors.required && this.form.get('fechaNacimiento').touched : null
  }
  get ciudadRequerido(){
    return this.form.get('ciudad').errors ? this.form.get('ciudad').errors.required && this.form.get('ciudad').touched : null
  }
  get direccionRequerido(){
    return this.form.get('direccion').errors ? this.form.get('direccion').errors.required && this.form.get('direccion').touched : null
  }
  get codigoPostalRequerido(){
    return this.form.get('codigoPostal').errors ? this.form.get('codigoPostal').errors.required && this.form.get('codigoPostal').touched : null
  }
  get codigoPostalNoNumerico(){
    return this.form.get('codigoPostal').errors ? this.form.get('codigoPostal').errors.noEsNumerico && this.form.get('codigoPostal').touched : null
  }
  get empleoRequerido(){
    return this.form.get('empleo').errors ? this.form.get('empleo').errors.required && this.form.get('empleo').touched : null
  }
  get descripcionRequerido(){
    return this.form.get('descripcion').errors ? this.form.get('descripcion').errors.required && this.form.get('descripcion').touched : null
  }

  //Validaciones personalizadas
  checkTelefono(control:FormControl):{[s:string]:boolean}{
    if(isNaN(control.value) || control.value.toString().length !== 9){
      return {
        debeSerNumerico:true
      }
    }
    return null
  }

  checkNumerico(control:FormControl):{[s:string]:boolean}{
    if(isNaN(control.value)){
      return {
        noEsNumerico:true
      }
    }
    return null
  }

  //Validaciones asíncronas
  checkEmailEnUso = (control:FormControl):Promise<any> | Observable<any> => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        this.usuarioService.checkEmail(control.value).subscribe(data => {
          if(data['num'] > 0){
            resolve({emailEnUso:true})
          }else{
            resolve(null)
          }
        })
      }, 1500);
    })
  }

  checkTelefonoEnUso = (control:FormControl):Promise<any> | Observable<any> => {
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        this.usuarioService.checkTelefono(control.value).subscribe(data => {
          if(data['num'] > 0){
            resolve({telefonoEnUso:true})
          }else{
            resolve(null)
          }
        })
      }, 1500);
    })
  }


  //Auxiliares
  change(event){
    this.form.value.trabajador = event.detail.checked
    const {trabajador} = this.form.value
    if(trabajador){
      this.trabajadorForm(this.form.value)
      this.esTrabajador = true
    }else{
      this.iniciarFormConValores(this.form.value)
      this.esTrabajador = false
    }
  }

  async tomarFoto(){
    const image = await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.DataUrl,
      source:CameraSource.Photos
    })

    this.imagen = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))

    console.log('Foto tratada',this.imagen)
  }

  //Submit
  submit(){
    if(this.form.valid){
      // const foto = {
      //   url:this.imagen.dataUrl,
      //   extension:this.imagen.format
      // }
      const usuario:Usuario = {
        ...this.form.value,
        fechaRegistro:new Date(),
        foto:this.imagen.changingThisBreaksApplicationSecurity
      }
      this.usuarioService.registro(usuario).subscribe(data => {
        const msg = data['msg']
        if(msg==='Registro realizado con exito'){
          //   const token = data['token']
          //   this.usuarioService.asignarFoto(this.imagenArchivo, token).subscribe(res => {
          //     const mensaje = res['msg']
          //     if( mensaje === 'Foto asignada'){
          //       this.router.navigateByUrl('/login')
          //     }else{
          //       console.log('error al cargar la foto')
          //       return;
          //     }
          //   })
          // }
          this.router.navigateByUrl('/login')
        }else{
          return ;
        }
      })
    }else{
      console.log(this.form)
      this.form.markAllAsTouched()
    }
  }

}
