
import React, { useEffect, useState } from 'react';
import PortugueseStrings from 'react-timeago/lib/language-strings/pt-br'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Axios from '../../utils/axios';
import { LeftArrowAlt as IconVoltar } from "@styled-icons/boxicons-regular/LeftArrowAlt"
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image'


import SEO from '../../components/SEO'


import PageHeader from '../../components/PageHeader';

import CircularProgress from '@material-ui/core/CircularProgress';
import { Mail as FiMail } from '@styled-icons/heroicons-outline/Mail'
import { Telephone as FiPhone } from '@styled-icons/bootstrap/Telephone'
import { Link as FiLink } from '@styled-icons/boxicons-regular/Link'
import { Linkedin as LinkedinIcon } from '@styled-icons/feather/Linkedin'
import { Facebook as FacebookIcon } from '@styled-icons/feather/Facebook'
import { Instagram as InstagramIcon } from '@styled-icons/feather/Instagram'
import { LocationPin as FiMapPin } from '@styled-icons/entypo/LocationPin'

import configs from '../../configs';
import VagaItemPagEmpresa from '../../components/VagaItemPagEmpresa';

import EmpresaProps from '../../models/EmpresaProps'
import { PaginaAtual } from '../../store/PaginaAtual';
import Footer from '../../components/Footer';
import { toast } from 'react-toastify';
import FooterDesktop from '../../components/FooterDesktop';
import AvisoGruposDesktop from '../../components/AvisoGruposDesktop';
import AdsHorizontalMobile from '../../components/AdsHorizontalMobile';
import Collapse from '@material-ui/core/Collapse';
import { Options } from '../../store/Options';
import { Favoritos } from '../../store/Favoritos';

import { useClipboard } from 'use-clipboard-copy';
import VagaItemDesktop from '../../components/VagaItemDesktop';

import AvisoGruposDesktopHorizontal from '../../components/AvisoGruposDesktopHorizontal';
import PageHeaderDesktop from '../../components/PageHeaderDesktop';
import AdsHorizontal from '../../components/AdsHorizontal';
import AdsQuadrado from '../../components/AdsQuadrado';
import LoadingComponent from '../../components/LoadingComponent';

export default function Empresa({ empresa }: EmpresaProps) {

  const clipboard = useClipboard();
  const [isFavorited, setIsFavorited] = useState(false);
  const PaginaAtualStore = PaginaAtual.useState(s => s);
  const FavoritosStore = Favoritos.useState(s => s);
  const formatter = buildFormatter(PortugueseStrings)
  const router = useRouter()


  if (router.isFallback) {
    return <LoadingComponent />
  }


  function CheckisFavorited() {
    setIsFavorited(false)
    switch (PaginaAtualStore.tipo) {
      case "vaga":
        FavoritosStore.vagas.map(fav => {
          if (fav.slug == PaginaAtualStore.slug) {
            setIsFavorited(true)
          }
        })
        break

      case "empresa":
        FavoritosStore.empresas.map(fav => {
          if (fav.slug == PaginaAtualStore.slug) {
            setIsFavorited(true)
          }
        })
        break
      default:
        break;
    }
  }
  function handleFavorite() {

    setIsFavorited(true)
    let newFavorites = []
    switch (PaginaAtualStore.tipo) {
      case "vaga":
        FavoritosStore.vagas.map(fav => {
          if (fav.slug != PaginaAtualStore.slug) {
            newFavorites.push(fav)
          }
          else {
            setIsFavorited(false)
          }
        })
        !isFavorited && newFavorites.push(PaginaAtualStore)

        isFavorited ? (toast.warn('Vaga removida dos favoritos!', {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        })) :
          (toast.success('Vaga adicionada aos favoritos!', {
            position: "bottom-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }))

        localStorage.setItem('FavoritosVagas', JSON.stringify(newFavorites));
        Favoritos.update(s => {
          s.vagas = newFavorites;
        })
        break;

      case "empresa":
        FavoritosStore.empresas.map(fav => {
          if (fav.slug != PaginaAtualStore.slug) {
            newFavorites.push(fav)
          }
          else {
            setIsFavorited(false)
          }
        })

        !isFavorited && newFavorites.push(PaginaAtualStore)
        isFavorited ? (toast.warn('Empresa removida dos favoritos!', {
          position: "bottom-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        })) :
          (toast.success('Empresa adicionada aos favoritos!', {
            position: "bottom-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
          }))
        localStorage.setItem('FavoritosEmpresas', JSON.stringify(newFavorites));
        Favoritos.update(s => {
          s.empresas = newFavorites;
        })
        break;

      default:
        break;
    }
  }

  PaginaAtual.update(s => {
    s.tipo = "empresa"
    s.nome = empresa.title
    s.slug = empresa.slug
    s.logo = empresa.logourl ? empresa.logourl : (empresa.logo ? empresa.logo.data.full_url : configs.notFoundImage)

    s.local = empresa.place.title;
    s.qtd = empresa.vagas.length;
  })

  function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen w-full">
      <SEO
        title={`${empresa.title}`}
        image={empresa.logourl ? empresa.logourl : (empresa.logo ? empresa.logo.data.full_url : configs.notFoundImage)
        }
        description={empresa.description && empresa.description.replace(/(<([^>]+)>)/gi, "")}
        siteName={configs.title}
      />

      {/*Mobile*/}
      <div className="md:hidden" >
        <PageHeader hideLogo bg={empresa.logourl ? empresa.logourl : (empresa.logo ? empresa.logo.data.full_url : configs.notFoundImage)
        } />
        <div id="InnerContainer" className="bg-gray-100 flex flex-col justify-center items-center rounded-t-3xl -top-9  relative p-4 ">

          <div className="relative mb-2 shadow-md w-20 h-20 rounded-xl flex bg-white justify-center items-center ">
            <Image  alt={empresa.title} className="rounded-xl" src={empresa.logourl ? empresa.logourl : (empresa.logo ? empresa.logo.data.full_url : configs.notFoundImage)
            } width={80} height={80} />
          </div>
          <h1 className="opensans-bold text-xl mb-4 ">{empresa.title && empresa.title}</h1>
          <div className="flex justify-between items-center text-sm opensans-regular w-full flex-col text-gray-400">

            {empresa.place &&
              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center space-x-2"><FiMapPin size={15} /><strong>Cidade de atuação</strong></div>
                <div><span>{empresa.place.title}</span></div>
              </div>
            }

            {empresa.site &&

              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center space-x-2"><FiLink size={15} /><strong>Site</strong></div>
                <div><a target="_blank" rel="noreferrer" href={empresa.site}><span> {empresa.site.replace("https://", "").replace("http://", "").replace("/", "")}</span></a></div>
              </div>
            }

            {empresa.phone &&

              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center space-x-2"><FiPhone size={15} /><strong>Telefone</strong> </div>
                <div><a href={`tel:${empresa.phone}`}><span>{empresa.phone}</span></a></div>
              </div>
            }

            {empresa.email &&

              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center space-x-2"><FiMail size={15} /><strong>E-mail</strong></div>
                <div><a href={`mailto:${empresa.email}`}><span>{empresa.email}</span></a></div>
              </div>
            }

            {empresa.linkedin &&

              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center space-x-2"><LinkedinIcon size={15} /><strong>Linkedin</strong></div>
                <div><a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/company/${empresa.linkedin}`}><span>{empresa.linkedin}</span></a></div>
              </div>
            }

            {empresa.facebook &&

              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center space-x-2"><FacebookIcon size={15} /><strong>Facebook</strong></div>
                <div><a target="_blank" rel="noreferrer" href={`https://www.facebook.com/${empresa.facebook}`}><span>{empresa.facebook}</span></a></div>
              </div>
            }


            {empresa.instagram &&

              <div className="w-full flex justify-between mb-2 items-center">
                <div className="flex items-center  space-x-2"><InstagramIcon size={15} /><strong>Instagram</strong></div>
                <div><a target="_blank" rel="noreferrer" href={`https://www.instagram.com/${empresa.instagram}`}><span>{empresa.instagram}</span></a></div>
              </div>
            }

          </div>

          {empresa.description &&
            <>
              <AdsHorizontalMobile />
              <h2 className="flex justify-start w-full opensans-bold mb-2 mt-2 text-xl uppercase">Sobre a Empresa</h2>
              <main className="opensans-regular text-sm" dangerouslySetInnerHTML={{ __html: empresa.description }} />
              <AdsHorizontalMobile />
            </>
          }

          <h2 className="flex justify-start w-full opensans-bold my-3 text-xl uppercase">Últimas vagas da Empresa</h2>



          {empresa.vagas &&
            <div className="flex flex-col w-full space-y-2 mb-5">
              {empresa.vagas.map(vaga => {

                return (
                  <VagaItemPagEmpresa
                    key={vaga.slug}
                    img={vaga.company.logourl ? vaga.company.logourl : (vaga.company.logo ? vaga.company.logo.data.full_url : configs.notFoundImage)
                    }
                    title={vaga.title}
                    type={vaga.type.title}
                    city={vaga.place.title}
                    textColor={vaga.type.textcolor}
                    backgroundColor={vaga.type.backgroundcolor}
                    slugEmpresa={vaga.company.slug}
                    url={vaga.slug} />
                )
              })}
            </div>
          }
        </div>

        <Footer />
      </div>


      {/*DESKTOP*/}
      <div className="hidden md:block" >
        <PageHeaderDesktop hideLogo={false} />
        <div id="ContainerDesktop" className="flex flex-col w-full items-center">

          <div className="flex w-full max-w-5xl mt-4 justify-center">
            <AvisoGruposDesktopHorizontal />
          </div>

          <div onClick={() => router.back()} className="flex opensans-bold cursor-pointer text-md items-center  mt-4 space-x-2 w-full max-w-5xl">
            <IconVoltar size={20} />
            <span>Voltar</span>
          </div>

          <div className="flex w-full space-x-4 max-w-5xl">
            <div id="barralateralempresa" className="flex flex-col mt-4 bg-white w-80 space-y-4 p-4 rounded-lg  ">
              <div className="flex flex-col bg-white justify-center items-center min-h-64 min-w-64   ">
                <Image alt={empresa.title} className="rounded-xl " src={empresa.logourl ? empresa.logourl : (empresa.logo ? empresa.logo.data.full_url : configs.notFoundImage)
                } width={250} height={250} />

                <h1 className="opensans-extra-bold my-2 text-xl">{empresa.title}</h1>

                <div className="flex mt-2 justify-between items-center text-xs opensans-regular w-full flex-col  ">


                  {empresa.place &&
                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><FiMapPin size={15} /><strong>Cidade de atuação</strong></div>
                      <div><span>{empresa.place.title}</span></div>
                    </div>
                  }

                  {empresa.site &&

                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><FiLink size={15} /><strong>Site</strong></div>
                      <div><a target="_blank" rel="noreferrer" className="underline" href={empresa.site}><span> {empresa.site.replace("https://", "").replace("http://", "").replace("/", "")}</span></a></div>
                    </div>
                  }

                  {empresa.phone &&

                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><FiPhone size={15} /><strong>Telefone</strong> </div>
                      <div><a className="underline" href={`tel:${empresa.phone}`}><span>{empresa.phone}</span></a></div>
                    </div>
                  }

                  {empresa.email &&

                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><FiMail size={15} /><strong>E-mail</strong></div>
                      <div><a className="underline" href={`mailto:${empresa.email}`}><span>{empresa.email}</span></a></div>
                    </div>
                  }

                  {empresa.linkedin &&

                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><LinkedinIcon size={15} /><strong>Linkedin</strong></div>
                      <div><a target="_blank" rel="noreferrer" className="underline" href={`https://www.linkedin.com/company/${empresa.linkedin}`}><span>{empresa.linkedin}</span></a></div>
                    </div>
                  }

                  {empresa.facebook &&

                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><FacebookIcon size={15} /><strong>Facebook</strong></div>
                      <div><a target="_blank" rel="noreferrer" className="underline" href={`https://www.facebook.com/${empresa.facebook}`}><span>/{empresa.facebook}</span></a></div>
                    </div>
                  }


                  {empresa.instagram &&

                    <div className="w-full flex justify-between mb-2 items-center">
                      <div className="flex items-center opensans-bold space-x-2"><InstagramIcon size={15} /><strong>Instagram</strong></div>
                      <div><a target="_blank" rel="noreferrer" className="underline" href={`https://www.instagram.com/${empresa.instagram}`}><span>@{empresa.instagram}</span></a></div>
                    </div>
                  }

                </div>
              </div>
              <div className="flex flex-col w-full">
                <span className="opensans-extra-bold my-2 text-xl">Sobre a Empresa</span>
                <main className="opensans-regular text-xs" dangerouslySetInnerHTML={{ __html: empresa.description && empresa.description }} />
              </div>

              <AdsQuadrado />
            </div>

            <div className="flex w-full max-w-3xl mt-4 justify-center">
              <div id="ConteudoBox" className='flex w-full flex-col '>

                {empresa.vagas &&
                  <div className="flex flex-col w-full space-y-2 ">
                    <span className="opensans-regular mb-2"><strong className={`opensans-bold text-secondary`}>{empresa.vagas.length > 0 ? empresa.vagas.length : ''}</strong> {empresa.vagas.length > 0 ? (empresa.vagas.length == 1 ? "vaga de emprego disponível" : "vagas de emprego disponíveis") : "Nenhuma vaga encontrada."}</span>

                    <AdsHorizontal />

                    {empresa.vagas.map(vaga => {

                      return (
                        <VagaItemDesktop
                          key={vaga.slug}
                          category={vaga.category.title}
                          img={vaga.company.logourl ? vaga.company.logourl : (vaga.company.logo ? vaga.company.logo.data.full_url : configs.notFoundImage)
                          }
                          title={vaga.title}
                          empresa={vaga.company.title}
                          type={vaga.type.title}
                          city={vaga.place.title}
                          textColor={vaga.type.textcolor}
                          backgroundColor={vaga.type.backgroundcolor}
                          url={vaga.slug}
                          slugEmpresa={vaga.company.slug}
                        />

                      )
                    })}
                    <AdsHorizontal />
                  </div>
                }


                <span className="opensans-regular mt-4 text-xs text-gray-400">O <strong className="opensans-bold">{configs.title}</strong> é somente um site de divulgação de vagas. Não temos qualquer ligação com as empresas anunciantes das vagas e nem somos responsáveis pelos conteúdos dos anúncios.</span>



              </div>
            </div>
          </div>


          <FooterDesktop />
        </div>
      </div>

    </div>

  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
};
export const getStaticProps: GetStaticProps<EmpresaProps> = async (context) => {
  const { slug } = context.params;

  const req = await Axios.get(`items/${configs.sufix}_company?single=1&filter[slug][eq]=${slug}&fields=*.*.*.*`)
  const empresa = req.data.data

  const req_vagas = await Axios.get(`items/${configs.sufix}_jobs?filter[company.slug][eq]=${slug}&fields=*.*.*.*`)
  empresa.vagas = req_vagas.data.data

  /*
  if (!req.status) {
    return {
      notFound: true,
    }
  }
 */

  return {
    props: {
      empresa
    },
    revalidate: 60
  }
};



