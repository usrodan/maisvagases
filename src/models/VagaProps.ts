
export default interface VagaProps { 
  vaga:{
  slug:string;
  title:string; 
  created_on:string;
  assuntoemail:string;
  application:string;
  expiration_date:string;
  description: string;
  company :{
    title:string; 
    site:string;
    logo: {
      data:{
        full_url:string;
      }
    }
    logourl:string;
    slug:string;
    jobs:any[];
  } 
  category: {
    slug:string;
    id:string;
    title:string;
    image:{
      data:{
        full_url:string;
      }
    }
  }
  type :{
      id:string;
      title:string;
      textcolor:string;
      backgroundcolor:string;
  }
  place :{
    id:string;
    title:string;
    slug:string;
  }
 }
}
 
