
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import configs from '../configs'
import Image from 'next/image'
import { PaginaAtual } from '../store/PaginaAtual'
import { Favoritos } from '../store/Favoritos'
import { toast } from 'react-toastify';
import { Navegacao } from '../store/Navegacao'
import { Home } from "@styled-icons/boxicons-regular/Home"
import { Home as HomeSolid } from "@styled-icons/boxicons-solid/Home"

import { Buildings } from "@styled-icons/boxicons-regular"
import { Buildings as BuildingsSolid } from "@styled-icons/boxicons-solid/Buildings"

import { Newspaper } from "@styled-icons/ionicons-outline/Newspaper"
import { Newspaper as NewspaperSolid } from "@styled-icons/ionicons-solid/Newspaper"

import { Heart } from "@styled-icons/boxicons-regular/Heart"
import { Heart as HeartSolid } from "@styled-icons/boxicons-solid/Heart"


interface PageHeaderProps {
  bg?: string;
  style?: string;
  hideLogo: boolean;
}
interface Categories {
  id: number;
  name: string;
  slug: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const PaginaAtualStore = PaginaAtual.useState(s => s);
  const FavoritosStore = Favoritos.useState(s => s);
  const [menuOpen, setMenuOpen] = useState(false)
  const urlAtual = Navegacao.useState(s => s.urlAtual)
  const router = useRouter()

  useEffect(() => {
    menuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
    handleChangeUrl(router.pathname)
  }, [router.pathname,menuOpen])

  function handleMenuOpen() {
    setMenuOpen(!menuOpen)
  }

  function handleChangeUrl(url) {
    Navegacao.update(s => {
      s.urlAtual = url;
    })
  }

  function classCSSAtivo(url) {
    return urlAtual == url ? `text-primaryAlternative opensans-bold border-b-2 border-primaryAlternative` : ""
  }


  useEffect(() => {
    const emp = JSON.parse(localStorage.getItem("FavoritosEmpresas"))
    const vag = JSON.parse(localStorage.getItem("FavoritosVagas"))
    Favoritos.update(s => {
      s.empresas = emp ? emp : []
      s.vagas = vag ? vag : []
    })
    CheckisFavorited()
  }, [])

  function handleBackButton() {
    //console.log(router)
    router.back()
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
  return (
    <>
      <div id="topbar" className={`bg-primary   flex justify-center `}    >
        <div id="PageHeaderDiv" className="flex max-w-5xl w-full items-center justify-between  py-2">
          <div id="esquerda" className="flex">

            <a href="/">

              {props.hideLogo ? "" : <Image height={60} width={260} alt={configs.title} src={configs.logo} />}

            </a>

          </div>

          <div id="centro">

          </div>

          <div id="direita"  >
            <div id="menudiv" className="flex space-x-4 pr-3 items-center text-sm opensans-semi-bold justify-between text-white">

              <a href="/" className={`flex space-x-2  pb-1 items-center text-white ${classCSSAtivo("/")}`}  >
                {urlAtual == "/" ? <HomeSolid size={20} /> : <Home size={20} />}
                <span>Início</span>
              </a>


              <a href="/empresas" className={`flex space-x-2  pb-1 items-center text-white ${classCSSAtivo("/empresas")}`}  >
                {urlAtual == "/empresas" ? <BuildingsSolid size={20} /> : <Buildings size={20} />}


                <span>Empresas</span>
              </a>
              {/* 
              <a  href="/favoritos" className={`flex space-x-2  pb-1 items-center text-white ${classCSSAtivo("/favoritos")}`  } >
               
               {urlAtual == "/favoritos" ? <HeartSolid size={20}/> : <Heart size={20}/>  }
              
              <span>Favoritos</span>
              </a> 
              

 
                <a href="/blog" className={`flex space-x-2  pb-1 items-center text-white ${classCSSAtivo("/blog")}`}  >
                  {urlAtual == "/blog" ? <NewspaperSolid size={20} /> : <Newspaper size={20} />}

                  <span>Blog</span>
                </a> 

              */}



            </div>
          </div>

        </div>
      </div>

    </>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  return {
    props: {
      slug
    },
    revalidate: 10
  }
}




export default PageHeader

