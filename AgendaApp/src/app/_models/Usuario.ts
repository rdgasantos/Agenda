import { Evento } from './Evento';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  dataNasc: Date;
  sexo: number;
  eventos?: Evento[];
}
