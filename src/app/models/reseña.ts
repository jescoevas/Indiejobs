import { Usuario } from './usuario';

export interface Reseña{
    _id?:string,
    autor:Usuario,
    receptor:Usuario,
    cuerpo:string
}