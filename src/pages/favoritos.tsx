import React, { useEffect } from 'react'
import configs from '../configs'
import Head from 'next/head'
import Link from 'next/link'
import Footer from "../components/Footer"
import Image from 'next/image'

import { useRouter } from 'next/dist/client/router'
import VagaItem from '../components/VagaItem'
import SEO from '../components/SEO'
import { Favoritos } from '../store/Favoritos'
import { MenuFavoritos } from '../store/Navegacao'
import EmpresaItem from '../components/EmpresaItem'

import { Heart as HeartIcon } from "@styled-icons/boxicons-regular/Heart"
import { LeftArrowAlt as ArrowLeft } from '@styled-icons/boxicons-regular/LeftArrowAlt'
import PageHeaderWithTitle from '../components/PageHeaderWithTitle'
import PageHeaderDesktop from '../components/PageHeaderDesktop'
import AdsQuadrado from '../components/AdsQuadrado'
import AvisoGruposDesktop from '../components/AvisoGruposDesktop'
import FooterDesktop from '../components/FooterDesktop'

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

  const router = useRouter()

  const FavoritosStore = Favoritos.useState(s => s);
  const MenuFavoritosStore = MenuFavoritos.useState(s => s.selecionado);

  useEffect(() => {
    const emp = JSON.parse(localStorage.getItem("FavoritosEmpresas"))
    const vag = JSON.parse(localStorage.getItem("FavoritosVagas"))
    Favoritos.update(s => {
      s.empresas = emp ? emp : []
      s.vagas = vag ? vag : []
    })
  }, [])

  function handleBackButton() {
    //console.log(router)
    router.back()
  }

  //console.log(FavoritosStore.vagas)

  return (
    <div id="Container" className="flex flex-col min-h-screen bg-gray-100">
      <SEO
        title={configs.title}
        description=""
        shoudExcludeTitleSuffix
        siteName={configs.title}
      />

      {/* -----  MOBILE ---- */}
      <div className="md:hidden" >
        <PageHeaderWithTitle title="Favoritos" icon={<HeartIcon size={24} />}>  </PageHeaderWithTitle>
        <div id="InnerContainer" className=" rounded-tr-2xl relative w-full bg-gray-100 flex -mt-9">

          <div id="TreeColumns" className="flex w-full">

            <div className="w-full flex flex-col items-center">

              <div className="flex w-full px-5">
                <div id="MenuFavorites" className={`flex text-primary bg-gray-100 border-primary border w-full opensans-bold text-lg rounded-md m-4 `}>
                  <a onClick={() => MenuFavoritos.update(s => { s.selecionado = "vagas" })} className={`rounded-md text-center px-2 py-1 w-full ${(MenuFavoritosStore == "vagas") ? `bg-primary text-white` : "inactive"}`} >
                    Vagas
          </a>
                  <a onClick={() => MenuFavoritos.update(s => { s.selecionado = "empresas" })} className={`rounded-md text-center px-2 py-1 w-full ${(MenuFavoritosStore == "empresas") ? `bg-primary text-white` : "inactive"}`}  >
                    Empresas
          </a>
                </div>
              </div>

              {
                (MenuFavoritosStore == "vagas") ? (
                  FavoritosStore.vagas.length ? FavoritosStore.vagas.map(vaga => {

                    return (

                      <VagaItem
                        key={vaga.slug}
                        img={vaga.logo}
                        title={vaga.nome}
                        empresa={vaga.empresa}
                        type={vaga.type}
                        city={vaga.local}
                        textColor={vaga.textColor}
                        backgroundColor={vaga.backgroundColor}
                        slugEmpresa={vaga.empresaSlug}
                        url={`${vaga.slug}`} />

                    )
                  }) : <span className="text-md opensans-regular">Não possui nenhuma vaga salva aqui!</span>
                ) : (

                    FavoritosStore.empresas.length ? FavoritosStore.empresas.map(vaga => {

                      return (
                        <div key={vaga.slug} className="flex w-full px-2">
                          <EmpresaItem
                            
                            img={vaga.logo ? vaga.logo : configs.notFoundImage}
                            nome={vaga.nome}
                            qtdVagas={vaga.qtd}
                            exibirQtd={false}
                            url={vaga.slug} /> </div>

                      )
                    }) : <span className="text-md opensans-regular">Não possui nenhuma empresa salva aqui</span>)

              }

            </div>

          </div>
        </div>

        <Footer />
      </div>
      {/* ---FIM MOBILE ----*/}


      {/* -----  DESKTOP ---- */}
      <div className="hidden md:block">
        <PageHeaderDesktop hideLogo={false} />
        <div id="desktop" className="flex flex-col p-4 w-full items-center justify-center">




          <div id="TwoColumns" className="flex mt-4 w-full max-w-5xl">

            <div id="BarraLateral" className="w-80 flex flex-col">
              <AdsQuadrado />
              <AvisoGruposDesktop />
            </div>

            <div className="ml-4 flex flex-col w-full ">

              <div id="TreeColumns" className="flex w-full">

                <div className="w-full flex flex-col items-center">

                  <div className="flex w-full px-5">
                    <div id="MenuFavorites" className={`flex text-primary bg-gray-100 border-primary border w-full opensans-bold text-lg rounded-md m-4 `}>
                      <a onClick={() => MenuFavoritos.update(s => { s.selecionado = "vagas" })} className={`rounded-md text-center px-2 py-1 w-full ${(MenuFavoritosStore == "vagas") ? `bg-primary text-white` : "inactive"}`} >
                        Vagas
</a>
                      <a onClick={() => MenuFavoritos.update(s => { s.selecionado = "empresas" })} className={`rounded-md text-center px-2 py-1 w-full ${(MenuFavoritosStore == "empresas") ? `bg-primary text-white` : "inactive"}`}  >
                        Empresas
</a>
                    </div>
                  </div>

                  {
                    (MenuFavoritosStore == "vagas") ? (
                      FavoritosStore.vagas.length ? FavoritosStore.vagas.map(vaga => {

                        return (

                          <VagaItem
                            key={vaga.slug}
                            img={vaga.logo}
                            title={vaga.nome}
                            empresa={vaga.empresa}
                            type={vaga.type}
                            city={vaga.local}
                            textColor={vaga.textColor}
                            backgroundColor={vaga.backgroundColor}
                            slugEmpresa={vaga.empresaSlug}
                            url={`${vaga.slug}`} />

                        )
                      }) : <span className="text-md opensans-regular">Não possui nenhuma vaga salva aqui!</span>
                    ) : (

                        FavoritosStore.empresas.length ? FavoritosStore.empresas.map(vaga => {

                          return (
                            <div   key={vaga.slug} className="flex w-full px-2">
                              <EmpresaItem
                              
                                img={vaga.logo ? vaga.logo : configs.notFoundImage}
                                nome={vaga.nome}
                                qtdVagas={vaga.qtd}
                                exibirQtd={false}
                                url={vaga.slug} /> </div>

                          )
                        }) : <span className="text-md opensans-regular">Não possui nenhuma empresa salva aqui</span>)

                  }

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
