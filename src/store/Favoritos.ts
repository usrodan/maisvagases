import { Store } from "pullstate";

interface iVagas {
    slug: string;
    nome: string;
    local:string;
    logo:string;
    tipo:string;
    empresa:string;
    empresaSlug:string;
    type:string;
    backgroundColor:string;
    textColor:string;
}
interface iEmpresas {
    slug:string;
    nome: string;
    logo:string;
    qtd:number;
}

interface iFavoritos {
  vagas:iVagas[]
  empresas: iEmpresas[];
}

interface iIsFavorited{
    option:boolean
}

export const Favoritos = new Store<iFavoritos>({
    vagas:[],
    empresas: []
});

export const isFavorited = new Store<iIsFavorited>({
    option:false
});