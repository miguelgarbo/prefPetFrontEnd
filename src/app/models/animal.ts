import { Especie } from "./especie";
import { UsuarioComum } from "./usuario-comum";
import { Vacina } from "./vacina";

export class Animal {

    id!: number;
    nome!: string;
    registroGeral!: string;
    especie!: Especie;
    usuario!: UsuarioComum;
    castrado!: boolean;
    cor!: string;
    sexo!: string; 
    microchip!: boolean;
    numeroMicrochip!: string;
    dataNascimento!: string;
    naturalidade!: string;
    imagemUrl!: string;
    vacinas!: Vacina[];
    idade!: number;
}
