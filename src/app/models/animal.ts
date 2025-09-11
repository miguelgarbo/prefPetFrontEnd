import { Tutor } from "./tutor";
import { Vacina } from "./vacina";


export class Animal {

    id!: number;
    nome!: string;
    registroGeral!: string;
    especie!: string;
    castrado!: boolean;
    cor!: string;
    sexo!: string; 
    microchip!: boolean;
    numeroMicrochip!: string;
    dataNascimento!: string;
    naturalidade!: string;
    imagemUrl!: string;
    vacinas!: Vacina[];
    tutor!: Tutor;
    idade!: number;
}
