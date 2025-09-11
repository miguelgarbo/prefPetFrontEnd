import { Entidade } from "./entidade";
import { Imagem } from "./imagem";

export class Publicacao {
    
    id!: number;
    tipoPublicacao!:string;
    descricao!: string;
    dataCriacao!: string;
    imagens!: Imagem[];
    entidade!: Entidade;
}
