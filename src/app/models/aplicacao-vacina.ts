import { Animal } from "./animal";
import { Vacina } from "./vacina";
import { Veterinario } from "./veterinario";

export class AplicacaoVacina {

    id!: number
    dataAplicacao!: string;
    dataValidade!: string;
    numeroDose!: number
    vacina!: Vacina;
    animal!: Animal;
    veterinario!:Veterinario;

}
