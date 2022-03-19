interface Vagas{
  slug:string| null;
  title:string| null;
  created_on:string;
  place: {
    title:string| null;
  } |null;
  type: {
    title:string| null; 
    textcolor:string| null;
    backgroundcolor:string| null;
  }
  category: {
    title:string| null;  
  }
  company: {
    logo: {
      data:{
        full_url:string| null;
      } | null
    }
    logourl:string | null;
    title:string | null;
    slug:string | null;
    jobs:any[];
  }
};
export default interface EmpresaProps { 
    empresa:{ 
        email:string| null;
        facebook:string| null;
        instagram:string| null;
        linkedin:string| null;
        description: string| null;
        
        place:{
          title:string| null;
        } |null;
        logo :{
          data:{
            full_url:string| null
          }  | null
        }
        logourl:string| null;
        title:string| null;
        site:string| null;
        slug:string| null;
        phone:string| null;
        vagas:Vagas[]| null;
        jobs:any[];
    }
        }