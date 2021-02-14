import { Usuario } from './usuario';
import { Chat } from './chat';

export interface Mensaje{
    _id?:string,
    chat?:Chat,
    autor:Usuario,
    fecha:Date,
    cuerpo:string
}