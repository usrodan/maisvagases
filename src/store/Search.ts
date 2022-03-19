import { Store } from "pullstate";
import VagaProps from '../models/VagaProps'
 
interface iVagas {
  slug:string;
  title:string; 
  created_on:string;
  assuntoemail:string;
  application:string;
  expiration_date:string;

  description: string;
  company :{
    title:string;
    logo: {
      data:{
        full_url:string;
      }
    }
    logourl:string;
    slug:string;
  } 
  category: {
    slug:string;
    title:string;
    image:{
      data:{
        full_url:string;
      }
    }
  }
  type :{
      title:string;
      textcolor:string;
      backgroundcolor:string;
  }
  place :{
    title:string;
    slug:string;
  }
 } 

interface iEmpresas {
    slug:string;
    nome: string;
    logo:string;
    local:string;
}

interface iSearch {
  vagas:iVagas[]; 
  keyword: string;
  categoria:string;
  cidade:string;
  tipo:string;
  offset:number;
  itensPorPagina:number;
  showLoadMore:boolean; 
}
 

export const Search = new Store<iSearch>({
    vagas:[], 
    keyword:"",
    categoria:"",
    cidade:"",
    tipo:"",
    offset:0,
    itensPorPagina:10,
    showLoadMore:true

});
 