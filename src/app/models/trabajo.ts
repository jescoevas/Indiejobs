import { Usuario } from './usuario';

export interface Trabajo{
    _id?:string,
    autor:Usuario,
    foto:string,
    cuerpo:string,
    fecha:Date,
    estrellas:number
}