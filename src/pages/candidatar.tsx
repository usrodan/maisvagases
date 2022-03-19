import React, { useState, useEffect } from 'react'
import configs from '../configs'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { Facebook as FacebookIcon } from '@styled-icons/feather/Facebook'
import { Instagram as InstagramIcon } from '@styled-icons/feather/Instagram'
import { Linkedin as LinkedinIcon } from '@styled-icons/feather/Linkedin'

import { Mail as FiMail } from '@styled-icons/heroicons-outline/Mail'
import { CheckSquare as FiCheckSquare } from '@styled-icons/feather/CheckSquare'
import { Link as FiExternalLink } from '@styled-icons/boxicons-regular/Link'
import { Copy as FiCopy } from '@styled-icons/fa-regular/Copy'



import { useRouter } from 'next/dist/client/router';
import SEO from '../components/SEO';
import { Options } from '../store/Options';
import { LeftArrowAlt as FaArrowLeft } from "@styled-icons/boxicons-regular/LeftArrowAlt"

import { useClipboard } from 'use-clipboard-copy';

import { toast } from 'react-toastify';
import { PaginaAtual } from '../store/PaginaAtual';
import AdsQuadrado from '../components/AdsQuadrado'

export default function Candiatar() {
  const candidaturaUrl = Options.useState(s => s.candidaturaUrl);
  const assuntoCandidatura = Options.useState(s => s.assuntoCandidatura);
  const nomeDaVaga = PaginaAtual.useState(s => s.nome)
  const router = useRouter()
  const clipboard = useClipboard()

  function handleCopyClipboard() {
    clipboard.copy()

    toast.success('Email copiado para o clipboard!', {
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
    assuntoCandidatura == null ? window.location.href = `mailto:${candidaturaUrl}?subject=Candidatura: ${nomeDaVaga}` : window.location.href = `mailto:${candidaturaUrl}?subject=${assuntoCandidatura}`
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  return (
    <div id="Container" className="flex flex-col w-full">
      <SEO
        title="Enviar Candidatura"
        description=""
        notIndexPage
        siteName={configs.title}
      />
      <div id="InnerContainer" className="flex flex-col w-full items-centet justify-center px-2 py-2 bg-white ">

        <div id="PageHeader" className="flex w-full justify-between items-center">
          <span className={`w-10 h-10 cursor-pointer text-primary`} onClick={() => router.back()}  >
            <FaArrowLeft size={40} />
          </span>
          <a href="/">
            <Image width={150} height={50} alt={configs.title} src={configs.logoAlternative} />
          </a>

          <FaArrowLeft size={24} color="#fff" />
        </div>

        <div id="Ads" className="flex w-full justify-center items-center p-1 bg-white rounded-md border border-gray-200 ">
          <AdsQuadrado />
        </div>
        {validateEmail(candidaturaUrl) ?
          <>
            <span className={`flex w-full opensans-bold text-2xl text-secondary text-left justify-start my-2`}>
              ENVIAR CANDIDATURA
            </span>

            <div id="Aviso" className={`flex space-x-1   w-full items-start justify-start text-left   opensans-regular text-md text-primaryAlternative  `}>
              <FiCheckSquare size={20} />
              <span>Não esqueça de mencionar no <strong><u>assunto</u></strong> do e-mail, o título da vaga desejada.</span>
            </div>

            <div className="flex w-full flex-col space-y-4 pt-2 my-2">
              <div id="EmailPlaceholder" className={`relative rounded-md opensans-regular items-center text-center text-md flex w-full border border-secondary p-4`} onClick={() => handleCopyClipboard()}>
                <span className={`absolute -top-2 px-2 space-x-4 left-2 text-xs bg-white text-secondary`}>Envie seu currículo para</span>
                <FiCopy size={24} />
                <span className="pl-2">{candidaturaUrl}</span>
                <input className="hidden" ref={clipboard.target} type="text" readOnly value={candidaturaUrl} id="CopytoClipboard"></input>

              </div>

              <div id="BotaoEnviar" className={`flex space-x-4 items-center w-full bg-secondary rounded-md text-white  p-4 opensans-regular text-md text-center cursor-pointer`} onClick={() => handleOpenEmail()}>

                <FiMail size={24} />
                <span>Abrir e-mail e enviar</span>

              </div>
            </div>


          </>
          :

          <>


            <div id="TituloExterno" className={`flex w-full opensans-bold text-2xl text-secondary text-left justify-start my-4`}>
              CANDIDATURA EXTERNA
            </div>

            <div id="SpanText" className={`opensans-regular text-md flex text-primary text-left  `}>Esta vaga exige que a  sua incrição seja feita em seu site
              ou no site de recrutamento.
            </div>


            <div id="FixOnFooter" className="pt-4">
              <a className={`flex space-x-4 opensans-bold text-md justify-center w-full text-white rounded-md p-4 mb-4 bg-secondary`} rel="noreferrer" target="_blank" href={candidaturaUrl}>
                <FiExternalLink size={24} />
                <span className="flex w-full">Candidatar-se em site externo  </span>
              </a>

              <span className="opensans-bold text-xl">SIGA-NOS</span>

              <div id="TresColunasBotoes" className="flex w-full opensans-bold space-x-4">
                <a target="_blank" rel="noreferrer" className="bg-facebook rounded-md text-white flex items-center px-2 py-1  " href={configs.facebook}><FacebookIcon className="mr-2" size={20} />Seguir</a>
                <a target="_blank" rel="noreferrer" className="bg-instagram rounded-md text-white flex items-center px-2 py-1  " href={configs.instagram}><InstagramIcon className="mr-2" size={20} />Seguir</a>
                <a target="_blank" rel="noreferrer" className="bg-linkedin rounded-md text-white flex items-center px-2 py-1  " href={configs.linkedin}><LinkedinIcon className="mr-2" size={20} />Seguir</a>
              </div>

              <span id="Rodape" className="mt-2 opensans-regular text-sm text-gray-400 flex text-center w-full">
                <span>O <strong>{configs.title}</strong> é somente um site de divulgação de vagas. Não
                  temos qualquer ligação com as empresas anunciantes das vagas e
                  nem somos responsáveis pelos conteúdos dos anúncios. Qualquer
                  irregularidade nas notícias, favor denunciar para que possamos
                  removê-la.</span>
              </span>
            </div>

          </>
        }

      </div>

    </div>
  )
}
