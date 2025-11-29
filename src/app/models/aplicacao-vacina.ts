import { Animal } from "./animal";
import { Vacina } from "./vacina";
import { Veterinario } from "./veterinario";

export class AplicacaoVacina {

    id!: number;
    dataPrevista!: string;
    dataAplicacao!: string;
    dataValidade!: string;
    numeroDose!: string
    vacina!: Vacina;
    animal!: Animal;
    status?: "APLICADA" | "PENDENTE" | "PROXIMA";

    veterinario!: Veterinario | null;
}
