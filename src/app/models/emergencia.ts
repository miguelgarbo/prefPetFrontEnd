import { Contato } from './contato';

export class Emergencia {
  id?: number;
  nome!: string;
  contatos?: Contato[] = [];
}
