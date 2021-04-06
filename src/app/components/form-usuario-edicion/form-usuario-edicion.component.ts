import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { decode } from 'base64-arraybuffer';
import { CameraSource, CameraResultType, Camera } from '@capacitor/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';

const URL = environment.apiUrl

@Component({
  selector: 'app-form-usuario-edicion',
  templateUrl: './form-usuario-edicion.component.html',
  styleUrls: ['./form-usuario-edicion.component.scss'],
})
export class FormUsuarioEdicionComponent implements OnInit{

  form:FormGroup
  esTrabajador:boolean = false
  imagen:any = 'assets/images/avatar_vacio.png'
  imagenArchivo:File
  @Output() emiteDatos = new EventEmitter<Object>()
  @Input() usuario:Usuario
  formularioActivo:boolean = false

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router, private toastController:ToastController) { }

  async ngOnInit(){
    this.iniciarForm()
    if(this.usuario.foto !== this.imagen){
      this.imagen = `${ URL }/${ this.usuario._id }/foto`
    }
  }

  iniciarForm(){
    this.formularioActivo = true
    this.form = this.fb.group({
      nombre:[this.usuario.nombre, [Validators.required, Validators.minLength(4)]],
      email:[this.usuario.email, [Validators.required, Validators.email], [this.checkEmailEnUso]],
      password:[this.usuario.password, [Validators.required, Validators.minLength(4)]],
      fechaNacimiento:[this.usuario.fechaNacimiento, [Validators.required]],
      telefono:[this.usuario.telefono, [this.checkTelefono], [this.checkTelefonoEnUso]],
      ciudad:[this.usuario.ciudad, [Validators.required]],
      direccion:[this.usuario.direccion, [Validators.required]],
      codigoPostal:[this.usuario.codigoPostal, [Validators.required, this.checkNumerico]],
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
    return new Promise(resolve => {
      setTimeout(async () => {
        const num = await this.usuarioService.checkEmail(control.value)
        if(num > 0 && control.value !== this.usuario.email)resolve({emailEnUso:true})
        else resolve(null)
      }, 1500);
    })
  }

  checkTelefonoEnUso = (control:FormControl):Promise<any> | Observable<any> => {
    return new Promise(resolve => {
      setTimeout(async () => {
        const num = await this.usuarioService.checkTelefono(control.value)
        if(num > 0 && control.value !== this.usuario.telefono) resolve({telefonoEnUso:true})
        else resolve(null)
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
      quality:40,
      allowEditing:false,
      resultType:CameraResultType.Base64,
      source:CameraSource.Photos
    })

    this.imagen = 'data:image/jpeg;base64,' + image.base64String;
    const blob = new Blob([new Uint8Array(decode(image.base64String))], {
      type: `image/${image.format}`,
    })
    const file = new File([blob], "foto", {
      type: blob.type,
    })

    this.imagenArchivo = file
  }

  //Submit
  submit(){
    if(this.form.valid){
      const usuario:Usuario = {
        ...this.form.value,
        id:this.usuario._id,
        emailUsuario:this.usuario.email,
        telefonoUsuario:this.usuario.telefono
      }
      this.emiteDatos.emit(usuario)
    }else{
      this.form.markAllAsTouched()
    }
  }

  async cambiarFoto() {
    await this.usuarioService.asignarFoto(this.imagenArchivo, localStorage.getItem('token'))
    // const toast = await this.toastController.create({
    //   message: 'Foto actualizada',
    //   duration: 2000,
    //   color:'success'
    // });
    // toast.present();
    window.location.reload()
  }

}
