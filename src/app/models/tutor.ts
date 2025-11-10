import { Animal } from "./animal";

export class Tutor {

        id!: number;
        role!:string;
        nome!: string;
        senha!: string;
        email!: string;
        telefone!: string;
        cpf!: string;
        cnpj!: string;
        cep!: string;
        cidade!: string;
        estado!:string;
        animais!: Animal[]
        imagemUrlPerfil!: string;
}
