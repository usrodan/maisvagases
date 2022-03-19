
import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEO from '../../components/SEO'
import configs from '../../configs';
import VagaProps from '../../models/VagaProps'
import Axios from '../../utils/axios';
import LoadingComponent from '../../components/LoadingComponent';

export default function Vaga({ vaga }: VagaProps) {

  const router = useRouter()


  useEffect(() => {
    vaga &&
      setTimeout(() => {
        router.push(`${configs.urlCompartilhamento}/${vaga.company.slug}/${vaga.slug}/?utm_source=Facebook&utm_medium=Facebook&utm_campaign=Facebook`)
      }, 2500);
  }, [vaga])


  if (router.isFallback) {
    return <LoadingComponent />
  }

  return (
    <div id="Container" className="flex flex-col bg-gray-100 min-h-screen w-full">
      <SEO
        title={vaga.title}
        image={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage}
        description={vaga.description.replace(/(<([^>]+)>)/gi, "")}
        siteName={configs.title}
      />

      <LoadingComponent />
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
  const { slug } = context.params;
  const urlReq = `items/${configs.sufix}_jobs?single=1&filter[slug][eq]=${slug}&fields=*.*.*.*`
  //console.log(urlReq)
  const req = await Axios.get(urlReq)
  const vaga = req.data.data


  if (!req.status) {
    return {
      notFound: true,
    }
  }


  return {
    props: {
      vaga
    },
    revalidate: 60
  }
}