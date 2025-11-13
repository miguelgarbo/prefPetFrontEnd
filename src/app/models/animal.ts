import { AplicacaoVacina } from "./aplicacao-vacina";
import { Tutor } from "./tutor";
import { Usuario } from "./usuario";
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
    aplicacoes!: AplicacaoVacina[];
    usuario!: Usuario;
    idade!: number;
    
}
