import { Imagem } from "./imagem";
import { UsuarioComum } from "./usuario-comum";

export class Publicacao {
    
    id!: number;
    titulo!: string;
    descricao!: string;
    dataCriacao!: string;
    imagens!: Imagem[];
    usuario!: UsuarioComum;
}
