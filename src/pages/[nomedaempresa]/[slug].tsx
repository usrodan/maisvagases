
import React, {  useEffect,  useState } from 'react';
import TimeAgo from 'react-timeago'
import PortugueseStrings from 'react-timeago/lib/language-strings/pt-br'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import { useClipboard } from 'use-clipboard-copy';
import Image from 'next/image'
import moment from 'moment'
import Head from 'next/head'
import LinearProgress from '@material-ui/core/LinearProgress'
import PageHeaderDesktop from '../../components/PageHeaderDesktop'
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Collapse } from '@material-ui/core';
import SEO from '../../components/SEO'
import { BookmarkPlus, BookmarkDashFill } from "@styled-icons/bootstrap"
import { AlertTriangleOutline as Alert } from '@styled-icons/evaicons-outline/AlertTriangleOutline'
import { ShareAlt as FiShare2 } from '@styled-icons/boxicons-regular/ShareAlt'
import { Facebook as FaFacebookF } from '@styled-icons/boxicons-logos/Facebook'
import { Linkedin as FaLinkedinIn } from '@styled-icons/boxicons-logos/Linkedin'
import { Twitter as FaTwitter } from '@styled-icons/boxicons-logos/Twitter'
import { Copy as FaRegCopy } from '@styled-icons/fa-regular/Copy'
import { Whatsapp as FaWhatsapp } from '@styled-icons/boxicons-logos/Whatsapp'
import { Briefcase as BriefcaseIcon } from '@styled-icons/boxicons-regular/Briefcase'
import { Clock as FiClock } from '@styled-icons/fa-regular/Clock'
import { LocationPin as FiMapPin } from '@styled-icons/entypo/LocationPin'
import { Briefcase as FiBriefcase } from '@styled-icons/boxicons-regular/Briefcase'
import { LeftArrowAlt as IconVoltar } from "@styled-icons/boxicons-regular/LeftArrowAlt"
import { CloseCircle as CloseIcon } from "@styled-icons/ionicons-sharp/CloseCircle"
import { ArrowRight as RightIcon } from '@styled-icons/bootstrap/ArrowRight'
import { Instagram as InstagramIcon } from '@styled-icons/feather/Instagram'
import { Mail as FiMail } from '@styled-icons/heroicons-outline/Mail'
import { CheckSquare as FiCheckSquare } from '@styled-icons/feather/CheckSquare'
import { Link as FiExternalLink } from '@styled-icons/boxicons-regular/Link'
import { Copy as FiCopy } from '@styled-icons/fa-regular/Copy'
import PageHeader from '../../components/PageHeader';
import configs from '../../configs';
import VagaProps from '../../models/VagaProps'
import { PaginaAtual } from '../../store/PaginaAtual'
import { Options } from '../../store/Options';
import { toast } from 'react-toastify';


import FooterDesktop from '../../components/FooterDesktop';

import Axios from '../../utils/axios';
import { Favoritos } from '../../store/Favoritos';
import AvisoGruposDesktopHorizontal from '../../components/AvisoGruposDesktopHorizontal';
import AdsQuadrado from '../../components/AdsQuadrado';
import AdsHorizontal from '../../components/AdsHorizontal';
import AdsHorizontalMobile from '../../components/AdsHorizontalMobile';
import LoadingComponent from '../../components/LoadingComponent';


export default function Vaga({ vaga }: VagaProps) {
  const clipboard = useClipboard();
  const clipboardEmail = useClipboard();
  const [isFavorited, setIsFavorited] = useState(false);
  const PaginaAtualStore = PaginaAtual.useState(s => s);
  const FavoritosStore = Favoritos.useState(s => s);
  const formatter = buildFormatter(PortugueseStrings)
  const router = useRouter()


  const [ShowCandidatura, setShowCandidatura] = useState(false)

  const showShareButtons = Options.useState(s => s.showShareButtons);


  useEffect(() => {
    Options.update(s => { s.showShareButtons = false })
    const emp = JSON.parse(localStorage.getItem("FavoritosEmpresas"))
    const vag = JSON.parse(localStorage.getItem("FavoritosVagas"))
    Favoritos.update(s => {
      s.empresas = emp ? emp : []
      s.vagas = vag ? vag : []
    })
    CheckisFavorited()

  }, [])


  if (router.isFallback) {
    return <LoadingComponent />
  }


  function handleCopyClipboardEmail() {
    clipboardEmail.copy()

    toast.success('Email copiado para a Área de Transferência!', {
      position: "bottom-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })
  }

  function handleOpenEmail() {
    vaga.assuntoemail == null ? window.location.href = `mailto:${vaga.application}?subject=Candidatura: ${vaga.title}` : window.location.href = `mailto:${vaga.application}?subject=${vaga.assuntoemail}`
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  function CheckisFavorited() {
    setIsFavorited(false)
    switch (PaginaAtualStore.tipo) {
      case "vaga":
        FavoritosStore.vagas.forEach(fav => {
          if (fav.slug == PaginaAtualStore.slug) {
            setIsFavorited(true)
          }
        })
        break

      case "empresa":
        FavoritosStore.empresas.forEach(fav => {
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
        FavoritosStore.vagas.forEach(fav => {
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
        FavoritosStore.empresas.forEach(fav => {
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

  function ExpiracaoDate(date: any, dias: number): Date {
    return moment(date).add(dias, 'days').toDate();
  }
  function CalcularDiasExpiracao(d, e) {
    var dia, hoje

    if (e != null) {
      dia = moment(e)
      hoje = moment()
      return dia.diff(hoje, 'days') + 2
    }
    else {
      dia = moment(d)
      hoje = moment()
      return dia.diff(hoje, 'days') + 15
    }
  }


  function valorPorcentagem(x) {
    return x * 15 / 100
  }

  function handleCandidatura(aplicacao) {

    Options.update(s => {
      s.candidaturaUrl = aplicacao;

    })

    Options.update(s => {
      vaga.assuntoemail ? s.assuntoCandidatura = vaga.assuntoemail : s.assuntoCandidatura = ""
    })

    router.push({
      pathname: '/candidatar'
    })

  }

  function handleCopyClipboard() {

    clipboard.copy(shareText)
    handleShowShareButtons()

    toast.success('Copiado para a Área de Transferência!', {
      position: "bottom-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })

  }

  function handleShowShareButtons() {
    if (navigator.share !== undefined) {
      navigator.share({
        title: vaga.title,
        url: `${configs.urlCompartilhamento}/${vaga.company.slug}/${vaga.slug}`
      })
    }
    else {
      Options.update(s => { s.showShareButtons = !s.showShareButtons })
    }
  }

  PaginaAtual.update(s => {
    s.tipo = "vaga"
    s.nome = vaga.title
    s.type = vaga.type.title
    s.slug = vaga.slug
    s.empresa = vaga.company.title
    s.empresaSlug = vaga.company.slug
    s.logo = vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage
    s.local = vaga.place.title
    s.backgroundColor = vaga.type.backgroundcolor
    s.textColor = vaga.type.textcolor
  })


  const shareText = `📢 CONFIRA ESTA OPORTUNIDADE!
  🏭 EMPRESA: ${vaga.company.title} 
  💼 CARGO: ${vaga.title}
  📍 LOCAL:  ${vaga.place.title}   
  🔗 Candidate-se em: 
  ${configs.urlCompartilhamento}/f/${vaga.slug} `

  const JSON_LD = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": vaga.title,
    "description": vaga.description.replace(/<[^>]*>?/gm, ''),
    "identifier": {
      "@type": "PropertyValue",
      "name": vaga.company.title,
      "value": vaga.slug
    },
    "datePosted": vaga.created_on,
    "validThrough": vaga.expiration_date ? vaga.expiration_date : ExpiracaoDate(vaga.created_on, 15),
    "employmentType": "CONTRACTOR",
    "hiringOrganization": {
      "@type": "Organization",
      "name": vaga.company.title,
      "sameAs": vaga.company.site ? vaga.company.site : '""',
      "logo": vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "-",
        "addressLocality": "-",
        "addressRegion": vaga.place.title,
        "postalCode": "-",
        "addressCountry": "PT"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": {
        "@type": "QuantitativeValue",
        "value": 0.00,
        "unitText": "HOUR"
      }
    }
  }



  return (
    <div id="Container" className="flex flex-col bg-gray-100 min-h-screen w-full">
      <SEO
        title={vaga.title}
        image={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage}
        description={vaga.description.replace(/(<([^>]+)>)/gi, "")}
        siteName={configs.title}
      />

      <Head>
        <script
          key={`jobJSON-${vaga.slug}`}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

      </Head>
      {/*Mobile*/}
      <div className="md:hidden" >
        <PageHeader hideLogo={false} bg={vaga.category.image != null ? vaga.category.image.data.full_url : ""} />

        <div id="InnerContainer" className="bg-gray-100 flex flex-col justify-center items-center rounded-t-3xl -top-9  relative p-4 ">
          <div className="m-4 w-16 h-1 bg-gray-200 rounded-md" />

          <a href={`/empresa/${vaga.company.slug}`} className="flex flex-col items-center">
            <div className="relative mb-2  flex items-center justify-center bg-white h-20 w-20 shadow-md rounded-xl">
              <Image className="rounded-xl bg-white" src={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage} alt={vaga.company.title} width={80} height={80} />
            </div>

            <span id="title_empresa" className="text-primary opensans-semi-bold text-lg" >{vaga.company.title}</span>
          </a>
          <span id="title_vaga" className={`opensans-bold text-xl mb-2 py-4 text-secondary text-center`} >{vaga.title}</span>

          <div id="itens" className="flex w-full opensans-regular text-sm md:text-md text-gray-400 justify-between items-center flex-wrap pb-5">
            {vaga.place.title && <span className="flex space-x-4  items-center " ><FiMapPin size="16" /> {vaga.place.title} </span>}
            {vaga.type.title && <span className="flex  space-x-4 items-center " ><FiBriefcase size="16" />{vaga.type.title}</span>}
            {vaga.created_on && <span className="flex space-x-4 items-center text-sm " ><FiClock size="16" /> <TimeAgo date={vaga.created_on} formatter={formatter} /> </span>}
          </div>

          <h2 className="opensans-bold w-full flex justify-start text-xl">INFORMAÇÕES DA VAGA</h2>
          <AdsHorizontalMobile />
          <div className="opensans-regular text-sm mb-4" dangerouslySetInnerHTML={{ __html: vaga.description }} ></div>
          <AdsHorizontalMobile />
          <div className="fixed bottom-0 w-full px-2 pb-2 pt-20 bg-gradient-to-b from-transparent to-white">
            <div className="flex relative justify-between   opensans-bold text-xl space-x-4 w-full">


              {CalcularDiasExpiracao(vaga.created_on, vaga.expiration_date) > 0 ?
                <a className={`flex w-full cursor-pointer justify-center items-center rounded-md bg-primary text-white p-2`} onClick={() => handleCandidatura(vaga.application)}>
                  Candidatar à vaga
                </a> :
                <a className={`flex w-full justify-center items-center rounded-md bg-gray-400 text-white p-2`}   >
                  Essa vaga já expirou!
                </a>}


              <a className={`flex rounded-md cursor-pointer justify-center items-center bg-secondary text-white p-2 px-3`} onClick={() => handleShowShareButtons()}>
                <FiShare2 size={20} />

              </a>
              <Collapse timeout={150} in={showShareButtons}>
                <div className="absolute flex flex-col z-1  right-4 -mt-60 space-y-1">
                  <a className={`rounded-md flex p-3 bg-primary text-white shadow-sm`} onClick={() => handleCopyClipboard()}><FaRegCopy size={20} /></a>
                  <a className={`rounded-md flex p-3 bg-whatsapp text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`https://api.whatsapp.com/send?text=${shareText}`} target="_blank" data-action="share/whatsapp/share"><FaWhatsapp size={20} /></a>
                  <a className={`rounded-md flex p-3 bg-facebook  text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${configs.urlCompartilhamento}/f/${vaga.slug}&display=popup`} target="_blank" ><FaFacebookF size={20} /></a>
                  <a className={`rounded-md flex p-3 bg-linkedin text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`https://www.linkedin.com/sharing/share-offsite/?url=${configs.urlCompartilhamento}/l/${vaga.slug}`} target="_blank" ><FaLinkedinIn size={20} /></a>
                  <a className={`rounded-md flex p-3 bg-twitter text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`http://www.twitter.com/share?url=${configs.urlCompartilhamento}/tw/${vaga.slug}`} target="_blank"  ><FaTwitter size={20} /></a>
                  <input ref={clipboard.target} style={{ display: "none" }} type="text" readOnly value={`${shareText}`} id="CopytoClipboard"></input>
                </div>
              </Collapse>
            </div>
          </div>
        </div>
      </div>


      {/*DESKTOP*/}
      <div className="hidden relative md:block" >
        <PageHeaderDesktop hideLogo={false} />
        <div id="ContainerDesktop" className="flex flex-col w-full items-center">

          <div className="flex w-full max-w-5xl mt-4 justify-center">
            <AvisoGruposDesktopHorizontal />
          </div>

          <div onClick={() => router.back()} className="flex opensans-bold cursor-pointer text-md items-center mt-4 space-x-2 w-full max-w-5xl">
            <IconVoltar size={20} />
            <span>Voltar</span>
          </div>

          <div id="TwoColumns" className="flex mt-4 w-full space-x-10 max-w-5xl">

            <div className="flex flex-col w-full max-w-3xl relative items-center  rounded-lg bg-white border-1 border-gray-400">

              <div className="w-full">
                <div className={` pb-40 rounded-t-lg  bg-primary shadow-sm`} style={{ background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${vaga.category.image != null ? vaga.category.image.data.full_url : ""})`, backgroundSize: 'cover', backgroundPosition: "center" }} />
              </div>
              <a href={`/empresa/${vaga.company.slug}`}>
                <div className="rounded-lg cursor-pointer w-20 h-20 shadow-md  relative bg-white flex items-center justify-center -top-8"><Image className='rounded-lg bg-white' src={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage} alt={vaga.company.title} width={80} height={80} /></div>
              </a>


              <div id="ConteudoBox" className='flex w-full flex-col px-8 pb-4'>
                <div id="MetaHeader" className='flex w-full justify-between'>
                  <div id="InfoEsquerda" className="flex space-y-2 flex-col">
                    <span className={`text-2xl opensans-extra-bold text-primary`}>{vaga.title}</span>

                    <span onClick={() => router.push(`/empresa/${vaga.company.slug}`)} className={`text-sm cursor-pointer opensans-bold text-secondary`} > {vaga.company.title}</span>
                    <div className={`text-verdinho text-sm flex space-x-2  opensans-regular`} >

                      <a href={`/?t=${vaga.type.id}`}>
                        <span className="cursor-pointer underline">{vaga.type.title} </span>
                      </a>

                      <span> • </span>

                      <a href={`/?c=${vaga.category.id}`}>
                        <span className="cursor-pointer underline" >{vaga.category.title}</span>
                      </a>

                    </div>


                    <span className={`text-gray-400 text-sm    flex`}>
                      <span></span>
                      <span></span>
                    </span>
                  </div>

                  <div id="InfoDireita" className="flex  flex-col text-gray-400  opensans-regular text-sm text-right">

                    <div id="iconesDireita" className="flex   space-x-4 mb-4 justify-end">
                      <a className=" cursor-pointer" onClick={handleFavorite}>
                        <Collapse in={isFavorited}><BookmarkDashFill size={20} /></Collapse>
                        <Collapse in={!isFavorited}><BookmarkPlus size={20} /> </Collapse>
                      </a>
                      <Alert size={20} />
                    </div>

                    <span>Publicado <TimeAgo date={vaga.created_on} formatter={formatter} /></span>

                    {CalcularDiasExpiracao(vaga.created_on, vaga.expiration_date) > 0 ?
                      <span>A vaga encerra em <strong className="opensans-bold">{CalcularDiasExpiracao(vaga.created_on, vaga.expiration_date) - 1} dias</strong></span>
                      :
                      <span>Essa vaga já expirou</span>
                    }


                    <LinearProgress className="rounded-md mt-1" color="secondary" variant="determinate" value={CalcularDiasExpiracao(vaga.created_on, vaga.expiration_date) > 0 ? (15 - CalcularDiasExpiracao(vaga.created_on, vaga.expiration_date)) * 100 / 15 : 100} />

                  </div>
                </div>

                <div className="bg-gray-100 rounded-md my-4 w-full h-0.5" />
                <AdsHorizontal />
                <div className="opensans-regular text-sm mb-4" dangerouslySetInnerHTML={{ __html: vaga.description }} />
                <AdsHorizontal />
                <div className=" bottom-0 w-full   pb-2   bg-gradient-to-b from-transparent to-white">
                  <div className="flex relative justify-between   opensans-bold text-xl space-x-4 w-full">
                    {CalcularDiasExpiracao(vaga.created_on, vaga.expiration_date) > 0 ?
                      <a className={`flex w-full cursor-pointer justify-center items-center rounded-md bg-primary text-white p-2`} onClick={() => setShowCandidatura(true)} >
                        Candidatar à vaga
                      </a>
                      :
                      <a className={`flex w-full justify-center items-center rounded-md bg-gray-400 text-white p-2`}   >
                        Essa vaga já expirou!
                      </a>
                    }

                    <a className={`flex rounded-md cursor-pointer justify-center items-center bg-secondary text-white p-2 px-3`} onClick={() => handleShowShareButtons()}>
                      <FiShare2 size={20} />

                    </a>
                    <Collapse timeout={150} in={showShareButtons}>
                      <div className="absolute flex flex-col z-1  right-4 -mt-60 space-y-1">
                        <a className={`rounded-md flex p-3 bg-primary text-white shadow-sm`} onClick={() => handleCopyClipboard()}><FaRegCopy size={20} /></a>
                        <a className={`rounded-md flex p-3 bg-whatsapp text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`https://api.whatsapp.com/send?text=${shareText}`} target="_blank" data-action="share/whatsapp/share"><FaWhatsapp size={20} /></a>
                        <a className={`rounded-md flex p-3 bg-facebook  text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=${configs.urlCompartilhamento}/f/${vaga.slug}&display=popup`} target="_blank" ><FaFacebookF size={20} /></a>
                        <a className={`rounded-md flex p-3 bg-linkedin text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`https://www.linkedin.com/sharing/share-offsite/?url=${configs.urlCompartilhamento}/l/${vaga.slug}`} target="_blank" ><FaLinkedinIn size={20} /></a>
                        <a className={`rounded-md flex p-3 bg-twitter text-white shadow-sm`} onClick={() => handleShowShareButtons()} rel="noreferrer"  href={`http://www.twitter.com/share?url=${configs.urlCompartilhamento}/tw/${vaga.slug}`} target="_blank"  ><FaTwitter size={20} /></a>
                      </div>
                    </Collapse>
                  </div>
                </div>

                <span className="opensans-regular mt-4 text-xs text-gray-400">O <strong className="opensans-bold">{configs.title}</strong> é somente um site de divulgação de vagas. Não temos qualquer ligação com as empresas anunciantes das vagas e nem somos responsáveis pelos conteúdos dos anúncios.</span>

              </div>

            </div>


            <div id="BarraLateral" className="w-80 flex flex-col ">


              <div className="flex w-full -mt-3">
                <AdsQuadrado />
              </div>

              <div id="InfoEmpresa" onClick={() => router.push(`/empresa/${vaga.company.slug}`)} className={`cursor-pointer rounded-md p-2 space-x-2 mt-4 flex   justify-center bg-primary `}>
                <div className="rounded-lg w-14 h-full flex items-center justify-center bg-white shadow-md "><Image className='rounded-lg bg-white' src={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage} alt={vaga.company.title} width={80} height={80} /></div>
                <div className="flex flex-col justify-center   w-full">
                  <span className="text-white opensans-extra-bold text-md">{vaga.company.title}</span>

                  <div className="flex items-center h-full justify-between">
                    <span className={`flex  rounded-md p-0.5 items-center  text-white text-xs opensans-bold`}>Ver empresa <RightIcon className="ml-1" size={12} /></span>
                    <span className="flex text-white  items-center text-xs opensans-bold"><BriefcaseIcon className="mr-1" size={14} />
                      { //@type-ignore 
                        ("00" + vaga.company.jobs.length).slice(-2)
                      }</span>
                  </div>
                </div>
              </div>


              <span className="uppercase opensans-bold mt-6 text-md">outras vagas de <span className={`text-secondary`}>{vaga.company.title}</span> </span>
              <div className={`w-full h-0.5 bg-primary my-1`} />
              { //@type-ignore 
                vaga.company.jobs.map(v => (
                  <div key={v.slug} onClick={() => router.push(`/${vaga.company.slug}/${v.slug}`)} className={`rounded-md p-2 cursor-pointer space-x-2 mt-2 flex  justify-center bg-white`}>
                    <div className="rounded-lg w-14 h-full flex items-center "><Image className='rounded-lg bg-white' src={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage} alt={vaga.company.title} width={80} height={80} /></div>
                    <div className="flex flex-col justify-center   w-full">
                      <span className={`opensans-bold text-secondary text-xs`}>{v.title}</span>
                      <div className="flex items-center justify-between">
                        <span className={` rounded-md p-0.5   text-xs opensans-regular`}>{v.place.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

          </div>
        </div>
        <FooterDesktop />
        <div className={`${ShowCandidatura ? '' : 'hidden'} flex fixed  p-8 top-0 right-0 w-screen h-screen backdrop-blur bg-black bg-opacity-50 justify-center items-center text-2xl`}>
          <div className="w-full p-12 flex flex-col max-w-2xl  ">

            <div className="flex flex-col w-full  justify-center items-center   bg-white rounded-md   ">
              <div className={`w-full px-2 py-1 flex bg-secondary rounded-t-md justify-end text-white`}> <CloseIcon onClick={() => setShowCandidatura(false)} className="cursor-pointer" size={20} /> </div>
              <div className="w-full flex items-center flex-col p-4">

                <AdsQuadrado />

                {validateEmail(vaga.application) ?
                  <>
                    <span className={`flex w-full opensans-bold text-xl text-secondary text-center justify-center my-2`}>
                      ENVIAR CANDIDATURA
                    </span>

                    <div id="Aviso" className={`flex space-x-4 w-full items-center justify-center   opensans-regular text-sm text-primaryAlternative text-center`}>
                      <FiCheckSquare size={20} />
                      <span>Não esqueça de mencionar no <strong><u>assunto</u></strong> do e-mail, o título da vaga desejada.</span>
                    </div>

                    <div className="flex w-full space-x-4 pt-2 my-2">
                      <div id="EmailPlaceholder" className={`relative rounded-md opensans-regular items-center text-center text-sm flex w-full border border-secondary p-2`} onClick={() => handleCopyClipboardEmail()}>
                        <span className={`absolute -top-2 px-2 space-x-4 left-2 text-xs bg-white text-secondary`}>Envie seu currículo para</span>
                        <FiCopy size={24} />
                        <span className="pl-2">{vaga.application}</span>
                        <input className="hidden" ref={clipboardEmail.target} type="text" readOnly value={vaga.application} id="CopytoClipboardEmail"></input>

                      </div>

                      <div id="BotaoEnviar" className={`flex space-x-4 items-center w-full bg-secondary rounded-md text-white  p-2 opensans-regular text-sm text-center cursor-pointer`} onClick={() => handleOpenEmail()}>

                        <FiMail size={24} />
                        <span>Abrir e-mail e enviar</span>

                      </div>
                    </div>


                  </> :

                  <>


                    <div id="TituloExterno" className={`flex w-full opensans-bold text-xl text-secondary text-center justify-center my-2`}>
                      CANDIDATURA EXTERNA
                    </div>

                    <div id="SpanText" className={`opensans-regular text-sm flex text-primary text-center`}>Esta vaga exige que a  sua incrição seja feita em seu site
                      ou no site de recrutamento.
                    </div>


                    <div id="FixOnFooter" className="pt-2 flex flex-col items-center">
                      <a className={`flex space-x-4 opensans-bold text-sm justify-center    text-white rounded-md p-2 mb-2 bg-secondary`}  rel="noreferrer" target="_blank" href={vaga.application}>
                        <FiExternalLink size={24} />
                        <span className="flex ">Candidatar-se em site externo  </span>
                      </a>




                    </div>


                  </>
                }

                <div id="TresColunasBotoes" className="flex w-full mb-2 space-x-4 justify-center text-sm opensans-bold text-white">
                  <span className={`opensans-bold text-xl text-primary`}>SIGA-NOS</span>
                  <a target="_blank" rel="noreferrer"  className="bg-facebook rounded-md  flex items-center px-2 py-1 space-x-4" href={configs.facebook}><FaFacebookF size={20} />Seguir</a>
                  <a target="_blank" rel="noreferrer"  className="bg-instagram rounded-md flex items-center px-2 py-1 space-x-4" href={configs.instagram}><InstagramIcon size={20} />Seguir</a>
                  <a target="_blank" rel="noreferrer"  className="bg-linkedin rounded-md  flex items-center px-2 py-1  space-x-4" href={configs.linkedin}><FaLinkedinIn size={20} />Seguir</a>
                </div>

                <span id="Rodape" className="opensans-regular text-xs text-gray-400 flex text-center w-full">
                  <span>O <strong>{configs.title}</strong> é somente um site de divulgação de vagas. Não
                    temos qualquer ligação com as empresas anunciantes das vagas e
                    nem somos responsáveis pelos conteúdos dos anúncios. Qualquer
                    irregularidade nas notícias, favor denunciar para que possamos
                    removê-la.</span>
                </span>

              </div>
            </div>
          </div>
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

export const getStaticProps: GetStaticProps<VagaProps> = async (context) => {
  const { slug } = context.params;
  const urlReq = `items/es_jobs?single=1&filter[slug][eq]=${slug}&fields=*.*.*.*`
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