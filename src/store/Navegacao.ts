import { Store } from "pullstate";

interface iNavegacao {
  urlAtual: string;
}

interface iMenuFavoritos{
  selecionado:string
}

export const Navegacao = new Store<iNavegacao>({
    urlAtual: "/",
});

export const MenuFavoritos = new Store<iMenuFavoritos>({
  selecionado: "vagas",
});