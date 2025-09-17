import { Contato } from './contato';

export interface Emergencia {
  id?: number;
  nome: string;
  contatos?: Contato[];
}
