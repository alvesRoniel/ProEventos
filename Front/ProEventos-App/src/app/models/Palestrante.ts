import { PalestranteEvento } from "./PalestranteEvento";
import { RedeSocial } from "./RedeSocial";

export interface Palestrante {
  id: number;
  nome: string;
  miniCurriculo: string;
  imagemURL: string;
  telefone: string;
  email: string;

  //Chave estrangeira
  redesSociais: RedeSocial
  palestrantesEventos: PalestranteEvento;
}
