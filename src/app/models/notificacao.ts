import { Animal } from "./animal";
import { Tutor } from "./tutor";

export class Notificacao {

    id!: number;
    texto!: string;
    nivel!: number;
    tutorDestinatario!: Tutor;  
    tutorRemetente?: Tutor;     
    animal?:Animal;       
}     
