
import React  from 'react';
 

import CircularProgress from '@material-ui/core/CircularProgress'; 
import PageHeaderDesktop from '../../components/PageHeaderDesktop'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'; 

import SEO from '../../components/SEO'
 
import PageHeader from '../../components/PageHeader';
import configs from '../../configs'; 

import VagaProps from '../../models/VagaProps'   

import FooterDesktop from '../../components/FooterDesktop';

import Axios from '../../utils/axios'; 

import AvisoGruposDesktopHorizontal from '../../components/AvisoGruposDesktopHorizontal';
import LoadingComponent from '../../components/LoadingComponent';


export default function Vaga({ vaga }: VagaProps) { 

  

  const router = useRouter() 

  if (router.isFallback) {
    return <LoadingComponent/>
  }
  
  return (
    <div id="Container" className="flex flex-col bg-gray-100 min-h-screen w-full">
      <SEO
        title={`${vaga.title}`}
        image={``}
        description={vaga.description.replace(/(<([^>]+)>)/gi, "")}
        siteName={configs.title}
      />
      {/*Mobile*/}
      <div className="md:hidden" >
        <PageHeader hideLogo={false} />

        <div id="InnerContainer" className="bg-gray-100 flex flex-col justify-center items-center rounded-t-3xl -top-9  relative p-4 ">
          <div className="m-4 w-16 h-1 bg-gray-200 rounded-md" />
           
          <h1 id="title_vaga" className={`opensans-bold text-xl mb-2 py-4 text-secondary text-center`} >{vaga.title}</h1>
          <main className="opensans-regular text-sm mb-4" dangerouslySetInnerHTML={{ __html: vaga.description }} />  

         
        </div>
      </div>


       {/* --- DESKTOP ----*/}
       <div className="hidden md:block">
        <PageHeaderDesktop hideLogo={false} />
        <div id="desktop" className="flex flex-col p-4 w-full items-center justify-center">




          <div id="TwoColumns" className="flex mt-4 w-full max-w-5xl">

            
            <div className="ml-4 flex flex-col w-full ">
            <AvisoGruposDesktopHorizontal />
              <div id="TreeColumns" className="flex w-full">

                <div className="w-full flex flex-col items-center p-4 mb-16">
                
                <h1 className="mb-3 text-4xl opensans-bold flex w-full text-left "> {vaga.title} </h1>
                <main className="opensans-regular text-sm mb-4" dangerouslySetInnerHTML={{ __html: vaga.description }} /> 
  </div>

              </div>


            </div>
          </div>


        </div>
        <FooterDesktop />
      </div>
      {/* ---FIM DESKTOP ----*/} 
    </div>
  )
}



export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps<VagaProps> = async (context) => {
  const { nomedaempresa } = context.params;
  const req = await Axios.get(`items/${configs.sufix}_pages?single=1&filter[slug][eq]=${nomedaempresa}&fields=*.*.*.*`)
  

  const vaga = req.data.data 
 /*
  if (!req.status) {
    return {
      notFound: true,
    }
  }
  */

  return {
    props: {
      vaga
    },  
    revalidate: 60
  }

  /*
  if (req.data.error) {
    return {
      notFound: true,
    }
  }
  else{
    return {
      props: {
        vaga
      },  
      revalidate: 60
    }

  }
*/

 
}