export interface Usuario{
    _id?:string,
    fechaRegistro?:Date,
    foto?:string,
    nombre?:string,
    email?:string,
    password?:string,
    fechaNacimiento?:Date,
    telefono?:number,
    ciudad?:string,
    direccion?:string,
    codigoPostal?:number,
    trabajador?:boolean,
    empleo?:string,
    descripcion?:string
}