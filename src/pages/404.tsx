import React from 'react'
import configs from '../configs'
import Image from 'next/image'
import { Home as HomeIcon } from '@styled-icons/heroicons-outline/Home'
import SEO from '../components/SEO'
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft'
import Footer from '../components/Footer'
import FooterDesktop from '../components/FooterDesktop'
import PageHeaderDesktop from '../components/PageHeaderDesktop' 


export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100" id="Container">
      <SEO
        title="Página não encontrada"
        description=""
        notIndexPage
        siteName={configs.title}
      />
      {/* -----  MOBILE ---- */}
      <div className="md:hidden" >
        <div className="bg-gray-100 min-h-screen px-2 py-4 w-full justify-start items-center flex flex-col" id="InnerContainer">
          <div id="NotFound404" className="flex flex-col w-full justify-center">
            <div className="flex w-full justify-between items-center">
              <a href="/">
                <ArrowLeft size={24} />
              </a>

              <a href="/">
                <Image height={50} width={150} alt={configs.title} src={configs.logoAlternative} />
              </a>

              <ArrowLeft size={24} className="text-gray-100" />

            </div>




            <main className="flex w-full justify-center items-center p-1">
              <Image width={300} height={250} src={`/assets/404.svg`} alt="Página não encontrada" />
            </main>

            <span className="flex w-full justify-center text-center opensans-extra-bold text-xl text-primaryAlternative">Ooops! <br />
              Está tudo tão calmo...</span>

            <span className="flex w-full justify-center text-center text-primaryAlternative opensans-regular text-md pt-2">
              Parece que não há nada por aqui <br />e que você está em uma página que não existe mais.
            </span>


            <a href="/" className={`items-center space-x-4  text-white bg-primary rounded-md flex justify-center  mt-5 p-2`}>
              <HomeIcon size="20" />
              <span>
                Voltar para o início
              </span>
            </a>


          </div>

        </div>

        <Footer />
      </div>
      {/* ---FIM MOBILE ----*/}


      {/* --- DESKTOP ----*/}
      <div className="hidden md:block">
        <PageHeaderDesktop hideLogo={false} />
        <div id="desktop" className="flex flex-col p-4 w-full items-center justify-center">




          <div id="TwoColumns" className="flex mt-4 w-full max-w-5xl">


            <div id="NotFound404Desktop" className="flex flex-col w-full items-center justify-center">


              <main className="flex w-full justify-center items-center p-1">
                <Image width={300} height={250} src={`/assets/404.svg`} alt="Página não encontrada" />
              </main>

              <span className="flex w-full justify-center text-center opensans-extra-bold text-xl text-primaryAlternative">Ooops! <br />
                Está tudo tão calmo...</span>

              <span className="flex w-full justify-center text-center text-primaryAlternative opensans-regular text-md pt-2">
                Parece que não há nada por aqui <br />e que você está em uma página que não existe mais.
              </span>

              <a href="/" className={`items-center space-x-4  max-w-sm text-white bg-primary rounded-md flex justify-center  mt-5 p-2`}>
                <HomeIcon size="20" />
                <span>
                  Voltar para o início
                </span>
              </a>


            </div>
          </div>


        </div>
        <FooterDesktop />
      </div>
      {/* ---FIM DESKTOP ----*/}

    </div>
  )
}
