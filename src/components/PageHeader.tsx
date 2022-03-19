
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft';
import { BookmarkPlus, BookmarkDashFill } from "@styled-icons/bootstrap"
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import configs from '../configs'
import Image from 'next/image'
import { PaginaAtual } from '../store/PaginaAtual'
import { Favoritos } from '../store/Favoritos'
import { toast } from 'react-toastify';
import { Collapse } from '@material-ui/core';

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
  const router = useRouter()

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

  return (
    <>
      <div id="TopBar" className={`px-4 pb-16 flex justify-center bg-primary shadow-sm`} style={props.bg ? { background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${props.bg})`, backgroundSize: 'cover' } : {}}   >
        <div className="block_container">
          <div id="PageHeaderDiv" className="flex items-center w-full justify-between -mt-2 px-2 py-4">
            <div id="esquerda" className="flex text-white">
              <a onClick={() => handleBackButton()} href="#">
                {PaginaAtualStore.slug ? <ArrowLeft size={24} /> : <></>}
              </a>

            </div>

            <div id="centro" className="flex w-full justify-center">
              <a href="/">
                <Image width={150} height={50} alt={configs.title} src={configs.logo} />
              </a>
            </div>

            <div id="direita" className="text-white" >
              <a onClick={handleFavorite}>
                <Collapse in={isFavorited}><BookmarkDashFill size={24} /></Collapse>
                <Collapse in={!isFavorited}><BookmarkPlus size={24} /> </Collapse>
              </a>
            </div>

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
    revalidate: 10
  }
}




export default PageHeader

