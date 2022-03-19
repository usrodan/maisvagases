
import { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import { Navegacao } from '../store/Navegacao'
import { useRouter } from 'next/router'

import { Home } from "@styled-icons/boxicons-regular/Home"
import { Home as HomeSolid } from "@styled-icons/boxicons-solid/Home"

import { Briefcase } from "@styled-icons/boxicons-regular/Briefcase"
import { Briefcase as BriefcaseSolid } from "@styled-icons/boxicons-solid/Briefcase"

import { Buildings } from "@styled-icons/boxicons-regular"
import { Buildings as BuildingsSolid } from "@styled-icons/boxicons-solid/Buildings"

import { Newspaper } from "@styled-icons/ionicons-outline/Newspaper"
import { Newspaper as NewspaperSolid } from "@styled-icons/ionicons-solid/Newspaper"

import { Heart } from "@styled-icons/boxicons-regular/Heart"
import { Heart as HeartSolid } from "@styled-icons/boxicons-solid/Heart"
import configs from '../configs'

interface Categories {
  id: number;
  name: string;
  slug: string;
}

function PageHeader() {

  const [menuOpen, setMenuOpen] = useState(false)

  const urlAtual = Navegacao.useState(s => s.urlAtual);

  const router = useRouter()

  useEffect(() => {
    menuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')

    handleChangeUrl(router.pathname)
  }, [router.pathname])

  function handleMenuOpen() {
    setMenuOpen(!menuOpen)
  }

  function handleChangeUrl(url) {
    Navegacao.update(s => {
      s.urlAtual = url;
    })
  }

  function classCSSAtivo(url) {
    return urlAtual == url ? `text-primary` : ""
  }


  return (
    <>
      <div id="topbar" className="flex bg-white fixed py-4 px-6 shadow-2xl   bottom-0 w-full rounded-tl-3xl rounded-tr-3xl" >
        <div className="flex w-full">
          <div id="footerdiv" className="flex items-center justify-between w-full text-textSecondary rounded-tl-3xl rounded-tr-3xl">

            <a href="/" className={`flex flex-col items-center text-textSecondary opensans-regular text-xs ${classCSSAtivo("/")}`}  >
              {urlAtual == "/" ? <HomeSolid size={20} /> : <Home size={20} />}
              <span>Início</span>
            </a>


            <a href="/empresas" className={`flex flex-col items-center text-textSecondary opensans-regular text-xs ${classCSSAtivo("/empresas")}`}  >
              {urlAtual == "/empresas" ? <BuildingsSolid size={20} /> : <Buildings size={20} />}


              <span>Empresas</span>
            </a>


            <a href="/favoritos" className={`flex flex-col items-center text-textSecondary opensans-regular text-xs ${classCSSAtivo("/favoritos")}`}  >

              {urlAtual == "/favoritos" ? <HeartSolid size={20} /> : <Heart size={20} />}

              <span>Favoritos</span>
            </a>

            {/*
              <a href="/blog" className={`flex flex-col items-center text-textSecondary opensans-regular text-xs ${classCSSAtivo("/blog")}`}   >
              {urlAtual == "/blog" ? <NewspaperSolid size={20}/> : <Newspaper size={20}/>}
               
              <span>Blog</span>
              </a>

              */}

          </div>

        </div>
      </div >
    </>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  return {
    props: {
      slug
    },
    revalidate: 60
  }
}




export default PageHeader

