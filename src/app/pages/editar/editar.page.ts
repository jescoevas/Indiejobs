import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/usuario';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core'
import { decode } from 'base64-arraybuffer'
import { environment } from 'src/environments/environment';

const { Camera } = Plugins
const URL = environment.apiUrl


@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit{

  usuario:Usuario
  formularioActivo:boolean = false
  form:FormGroup
  esTrabajador:boolean = false
  imagen:any
  imagenArchivo:File

  constructor(private fb:FormBuilder, private usuarioService:UsuarioService, private router:Router) {}

  async ngOnInit(){
    this.usuario = await this.usuarioService.getUsuario(localStorage.getItem('usuarioId'))
    if(this.usuario.trabajador){
      this.iniciarFormTrabajador()
    }else{
      this.iniciarFormNoTrabajador()
    }
    this.imagen = `${ URL }/${ this.usuario._id }/foto`
    
  }

  iniciarFormNoTrabajador(){
    this.formularioActivo = true
    this.esTrabajador = false
    this.form = this.fb.group({
      nombre:[this.usuario.nombre, [Validators.required, Validators.minLength(4)]],
      email:[this.usuario.email, [Validators.required, Validators.email], [this.checkEmailEnUso]],
      fechaNacimiento:[this.usuario.fechaNacimiento, [Validators.required]],
      telefono:[this.usuario.telefono, [this.checkTelefono], [this.checkTelefonoEnUso]],
      ciudad:[this.usuario.ciudad, [Validators.required]],
      direccion:[this.usuario.direccion, [Validators.required]],
      codigoPostal:[this.usuario.codigoPostal, [Validators.required, this.checkNumerico]],
      trabajador:[false]
    })
  }

  iniciarFormTrabajador(){
    this.formularioActivo = true
    this.esTrabajador = true
    this.form = this.fb.group({
      nombre:[this.usuario.nombre, [Validators.required, Validators.minLength(4)]],
      email:[this.usuario.email, [Validators.required, Validators.email], [this.checkEmailEnUso]],
      fechaNacimiento:[this.usuario.fechaNacimiento, [Validators.required]],
      telefono:[this.usuario.telefono, [this.checkTelefono], [this.checkTelefonoEnUso]],
      ciudad:[this.usuario.ciudad, [Validators.required]],
      direccion:[this.usuario.direccion, [Validators.required]],
      codigoPostal:[this.usuario.codigoPostal, [Validators.required, this.checkNumerico]],
      trabajador:[true],
      empleo:[this.usuario.empleo, [Validators.required]],
      descripcion:[this.usuario.descripcion, [Validators.required]],
    })
  }

  iniciarFormConValores(value:any){
    this.form = this.fb.group({
      nombre:[value['nombre'] || '', [Validators.required, Validators.minLength(4)]],
      email:[value['email'] || '', [Validators.required, Validators.email], [this.checkEmailEnUso]],
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
  async submit(){
    if(this.form.valid){
      console.log(this.form)
      // const usuario:Usuario = {
      //   ...this.form.value,
      //   id:this.usuario._id
      // }
      // const data = await this.usuarioService.editar(usuario)
      // if(data['msg'] === 'Edicion realizada con exito'){
      //   if(this.imagen !== 'assets/images/avatar_vacio.png'){
      //     await this.usuarioService.asignarFoto(this.imagenArchivo, data['token'])
      //   }
      //   this.router.navigateByUrl('/login')
      // }else{
      //   return ;
      // }
    }else{
      this.form.markAllAsTouched()
    }
  }

}
