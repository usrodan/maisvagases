import { Store } from "pullstate";

interface iTipo{
    id:number;
    title:string;
    slug:string;
}

interface iCategoria{
    id:number;
    title:string;
    slug:string;
}

interface iCidade{
    id:number;
    title:string;
    slug:string;
}


interface iOptions {
    showFilters: boolean;
    candidaturaUrl:string;
    assuntoCandidatura:string;
    showShareButtons:boolean;
    categorias:iCategoria[]; 
    tipos:iTipo[]; 
    cidades:iCidade[];
    loading:boolean;
    loadingMore:boolean;
}

export const Options = new Store<iOptions>({
    showFilters:false,
    candidaturaUrl:"",
    assuntoCandidatura:"",
    showShareButtons:false,
    categorias:[],
    cidades:[], 
    tipos:[],
    loading:false,
    loadingMore:false,
});
