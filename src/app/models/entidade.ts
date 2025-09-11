import { Publicacao } from "./publicacao";

export class Entidade {

    id!: number;
    nome!: string;
    senha!: string;
    email!: string;
    telefone!: string;
    cnpj!: string;
    tipoEntidade!:string;
    cep!: string;
    cidade!: string;
    estado!:string;
    publicacoes!: Publicacao[]
    imagemUrlPerfil!: string;

}
