import { Usuario } from './Usuario';

export interface Evento {
  id: number;
  nome: string;
  descricao: string;
  data: Date;
  local: string;
  tipo: number;
  usuario: Usuario[];

}
