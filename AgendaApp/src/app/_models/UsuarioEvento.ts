import { Evento } from './Evento';
import { Usuario } from './Usuario';
export interface UsuarioEvento {
  userId: number;
  eventId: number;
  usuarios?: Usuario;
  eventos?: Evento;
}
