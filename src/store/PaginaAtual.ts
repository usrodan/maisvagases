import { Store } from "pullstate";

interface iPaginaAtual {
  tipo:string;
  slug: string; 
  empresa:string;
  empresaSlug?:string;
  nome?:string;
  logo:string;
  local:string;
  status:boolean;
  type?:string;
  backgroundColor?:string;
  textColor?:string;
  qtd?:number;
}

export const PaginaAtual = new Store<iPaginaAtual>({
    slug: '',
    tipo:'',
    empresa:'',
    logo:'',
    local:'', 
    nome:'',
    status:false

});