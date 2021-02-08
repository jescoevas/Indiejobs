import { Usuario } from './usuario';
import { Trabajo } from './trabajo';

export interface Valoracion{
    _id?:string,
    autor:Usuario,
    trabajo:Trabajo,
}