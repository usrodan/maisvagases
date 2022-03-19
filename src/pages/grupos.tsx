import React, { useEffect, useState } from 'react'
import configs from '../configs'
import Head from 'next/head'
import Link from 'next/link'
import Footer from "../components/Footer"
import Image from 'next/image'

import { useRouter } from 'next/dist/client/router'
import SEO from '../components/SEO'
import Axios from '../utils/axios'

import { Whatsapp } from "@styled-icons/boxicons-logos/Whatsapp"
import { Whatsapp as WhatsappFill } from "@styled-icons/remix-fill/Whatsapp"
import { Telegram } from '@styled-icons/boxicons-logos/Telegram'
import { LeftArrowAlt as ArrowLeft } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import PageHeaderWithTitle from '../components/PageHeaderWithTitle'
import AdsQuadrado from '../components/AdsQuadrado'
import FooterDesktop from '../components/FooterDesktop'
import PageHeaderDesktop from '../components/PageHeaderDesktop'
import AvisoGruposDesktop from '../components/AvisoGruposDesktop'

interface Vagas {
  slug: string;
  titulo: string;
  publishedAt: string;
  cidade: {
    nome: string;
  }
  tipo: {
    tipo: string;
    textColor: {
      hex: string;
    }
    backgroundColor: {
      hex: string;
    };
  }
  empresa: {
    logotipo: {
      url: string;
    }
    nome: string;
  }
};

interface HomeProps {
  vagas: Vagas[]
}

export default function FavoritosPage() {

  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    getGrupos()
  }, [])

  async function getGrupos() {
    const req = await Axios.get(`items/${configs.prefixo}groups?fields=*`)
    setGrupos(req.data.data) 
  }

  const router = useRouter()
  function handleBackButton() {
    //console.log(router)
    router.back()
  }

  //console.log(FavoritosStore.vagas)

  return (
    <div id="Container" className="flex flex-col bg-gray-100 min-h-screen w-full">
      <SEO
        title={configs.title}
        description=""
        shoudExcludeTitleSuffix
        siteName={configs.title}
      />
      {/* -----  MOBILE ---- */}
      <div className="md:hidden" >
        <PageHeaderWithTitle title="Grupos Whatsapp" icon={<Whatsapp size={24} />}>  </PageHeaderWithTitle>

        <div id="InnerContainer" className=" rounded-tr-2xl relative w-full bg-gray-100 flex -mt-9">

          <div id="TreeColumns" className="flex w-full">

            <div className="w-full flex flex-col items-center p-4 mb-16">

              <span className="mb-4">
                Ficamos felizes em saber que você deseja participar do nosso grupo de vagas no WhatsApp.<br />
          Mas pedimos que dê preferência por entrar em nosso canal no <strong>Telegram.</strong><br />
          Lá às vagas são postadas <strong>imediatamente</strong> assim que publicadas em nosso site.<br /> <br />

          Mas se preferir mesmo assim entrar no grupo do WhatsApp, disponibilizamos abaixo nossos grupos, caso o grupo esteja cheio, volte aqui e selecione outro grupo!
          </span>

              <a href={configs.grupoTelegram} target="_blank" rel="noreferrer" className="px-10 py-4 space-x-8 text-white text-xl opensans-bold  rounded-md items-center flex bg-telegram justify-between ">
                <Telegram size={24} />
            CANAL DO TELEGRAM
          </a>

              <span className="opensans-regular text-center mt-4 mb-2 ">
                <strong className="opensans-bold text-md">GRUPOS NO WHASTASPP</strong><br />
            Grupos em <strong className="text-vermelho opensans-bold text-sm">VERMELHO</strong> estão possivelmente cheios!<br />
            [98% ocupados]
          </span>

              <div className="text-white opensans-bold flex text-sm justify-center flex-wrap space-x-4  mt-3">
                {
                  grupos.map(grupo => {
                    return (<a href={grupo.link} target='_blank' rel="noreferrer" className={`p-2 mb-2 justify items-center rounded-md ${!grupo.full ? 'bg-whatsapp' : 'bg-vermelho'}`} key={grupo.id}> <WhatsappFill className="mr-1" size={18} />{grupo.title}</a>)
                  })}
              </div>


            </div>

          </div>
        </div>

        {<Footer />}

      </div>
      {/* ---FIM MOBILE ----*/}

      {/* --- DESKTOP ----*/}
      <div className="hidden md:block">
        <PageHeaderDesktop hideLogo={false} />
        <div id="desktop" className="flex flex-col p-4 w-full items-center justify-center">




          <div id="TwoColumns" className="flex mt-4 w-full max-w-5xl">


            <div className="ml-4 flex flex-col w-full ">

              <div id="TreeColumns" className="flex w-full">

                <div className="w-full flex flex-col items-center p-4 mb-16">

                  <span className="mb-4">
                    Ficamos felizes em saber que você deseja participar do nosso grupo de vagas no WhatsApp.<br />
          Mas pedimos que dê preferência por entrar em nosso canal no <strong>Telegram.</strong><br />
          Lá às vagas são postadas <strong>imediatamente</strong> assim que publicadas em nosso site.<br /> <br />

          Mas se preferir mesmo assim entrar no grupo do WhatsApp, disponibilizamos abaixo nossos grupos, caso o grupo esteja cheio, volte aqui e selecione outro grupo!
          </span>

                  <a href={configs.grupoTelegram} target="_blank" rel="noreferrer" className="px-10 py-4 space-x-8 text-white text-xl opensans-bold  rounded-md items-center flex bg-telegram justify-between ">
                    <Telegram size={24} />
            CANAL DO TELEGRAM
          </a>

                  <span className="opensans-regular text-center mt-4 mb-2 ">
                    <strong className="opensans-bold text-md">GRUPOS NO WHASTASPP</strong><br />
            Grupos em <strong className="text-vermelho opensans-bold text-sm">VERMELHO</strong> estão possivelmente cheios!<br />
            [98% ocupados]
          </span>

                  <div className="text-white opensans-bold flex text-sm justify-center flex-wrap space-x-4 mt-3">
                    {
                      grupos.map(grupo => {
                        return (<a href={grupo.link} target='_blank' rel="noreferrer" className={`p-2 mb-2 justify items-center rounded-md ${!grupo.full ? 'bg-whatsapp' : 'bg-vermelho'}`} key={grupo.id}> <WhatsappFill className="mr-1" size={18} />{grupo.title}</a>)
                      })}
                  </div>


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
