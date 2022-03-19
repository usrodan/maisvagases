import React, { useEffect, useState } from 'react'
import configs from '../configs'
import Head from 'next/head'
import Link from 'next/link'
import { Collapse } from '@material-ui/core';
import Axios from '../utils/axios'
import { toast } from 'react-toastify';
import PageHeaderHome from "../components/PageHeaderHome"
import PageHeaderDesktop from "../components/PageHeaderDesktop"
import Footer from "../components/Footer"
import VagaProps from '../models/VagaProps'
import VagaItem from '../components/VagaItem'
import VagaItemDesktop from '../components/VagaItemDesktop'
import VagaItem_Skeleton from '../components/VagaItem_Skeleton'
import SEO from '../components/SEO'
import { Search } from '../store/Search'
import { Options } from '../store/Options'
import VagaADS from '../components/VagaADS'
import { SearchOutline as SearchIcon } from '@styled-icons/evaicons-outline/SearchOutline'
import { Trash as TrashIcon } from '@styled-icons/boxicons-regular/Trash'
import { CloseCircle as CloseIcon } from "@styled-icons/ionicons-sharp/CloseCircle"
import { SlidersH as FilterIcon } from "@styled-icons/fa-solid/SlidersH"
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown'
import { ChevronUp } from '@styled-icons/boxicons-regular/ChevronUp'
import { CheckboxChecked } from '@styled-icons/boxicons-solid/CheckboxChecked'
import { Checkbox } from '@styled-icons/boxicons-regular/Checkbox'

import CircularProgress from '@material-ui/core/CircularProgress';
import FooterDesktop from '../components/FooterDesktop'
import AvisoGruposDesktop from '../components/AvisoGruposDesktop'
import AdsQuadrado from '../components/AdsQuadrado'
import AdsHorizontal from '../components/AdsHorizontal'
import { Form } from "@unform/web"
import Input from "../components/Input"
import AdsHorizontal750 from '../components/AdsHorizontal750';
import { useRouter } from 'next/router';
import AdsHorizontalMobile from '../components/AdsHorizontalMobile';


interface HomeProps {
  vagas: VagaProps[]
}


export default function Vagas() {
  //const ListarVagas: React.FC<HomeProps> = ({vagas}: HomeProps) => {
  const { categorias, cidades, tipos, loading, loadingMore } = Options.useState(s => s);
  var { vagas, itensPorPagina, offset, keyword, categoria, cidade, tipo, showLoadMore } = Search.useState(s => s)
  const [colapseCategorias, setColapseCategorias] = useState(true)
  const [colapseTipos, setColapseTipos] = useState(true)
  const [colapseCidades, setColapseCidades] = useState(true)

  const router = useRouter()
  const { c, l, t, p } = router.query

  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }


  function limparKeyword() {
    Search.update(s => {
      s.keyword = "";
    })
  }

  function ExibirNotificacao(text) {
    toast.success(text, {
      position: "bottom-center",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    })
  }

  function getTitleByID(arr, arrID) {
    var results = [];
    for (var i = 0; i < arr.length; i++) {

      if (Number(arr[i].id) + 1 == Number(arrID) + 1) {
        results = arr[i].title
      }
    }
    return results
  }

  useEffect(() => {
    setTimeout(function () {
      Search.update(s => {
        s.categoria = String(c ? c : "")
        s.cidade = String(l ? l : "")
        s.tipo = String(t ? t : "")
        s.keyword = String(p ? p : "")
      })

    }, 2000);
  }, [categorias,c,l,p,t])


  useEffect(() => {
    Options.update(s => {
      s.loading = true;
      s.loadingMore = true;
    })
    Search.update(s => {
      s.offset = 0;
    })

    if (categoria || cidade || tipo || keyword) {
      router.push(`/?${categoria && `c=${categoria}&`}${cidade && `l=${cidade}&`}${tipo && `t=${tipo}&`}${keyword && `p=${keyword}`}`)
    }

    fetchVagas(false, vagas, 0)

  }, [categoria, cidade, tipo, keyword])

  async function checkBoxCategoria(v) {
    Search.update(s => {
      s.categoria = v;
      s.offset = 0;
    })
    Options.update(s => { s.loading = true; })
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  async function checkBoxTipo(v) {
    Search.update(s => {
      s.tipo = v;
      s.offset = 0;
    })
    Options.update(s => { s.loading = true; })
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }
  async function checkBoxCidade(v) {
    Search.update(s => {
      s.cidade = v;
      s.offset = 0;
    })
    Options.update(s => { s.loading = true; })
    window.scrollTo({ top: 0, behavior: 'smooth' });

  }

  async function loadMore() {

    await Options.update(s => {
      s.loadingMore = true;
    })

    let novoOffset = offset + itensPorPagina
    await Search.update(s => {
      s.offset = novoOffset;
    })
    await timeout(300)
    fetchVagas(true, vagas, novoOffset)
  }
  function handleSubmit(data) {
    Search.update(s => {
      s.keyword = data.textSearch
    })
  }
  function fetchVagas(add = false, atualVagas, of7) {
    let tempVagas = []

    if (add) {
      atualVagas.map(v => {
        tempVagas.push(v)
      })
    }


    const fetch = async (queryKeyword = "", queryCidadeID = "", queryCategoriaID = "", queryTipoID = "") => {
      const req = await Axios.get(`items/${configs.prefixo}jobs?offset=${of7}&limit=${itensPorPagina}&fields=*.*.*${queryKeyword && `&filter[description][contains]=${queryKeyword}`}${queryCategoriaID && `&filter[category][eq]=${queryCategoriaID}`}${queryCidadeID && `&filter[place][eq]=${queryCidadeID}`}${queryTipoID && `&filter[type][eq]=${queryTipoID}`}&sort=-created_on`)
      const vagas = req.data.data

      vagas.map(v => {
        tempVagas.push(v)
      })

      Search.update(s => {
        s.vagas = tempVagas
      })

      Options.update(s => {
        s.loading = false;
        s.loadingMore = false;
      })

      vagas.length == 0 ?
        Search.update(s => {
          s.showLoadMore = false
        })
        :
        Search.update(s => {
          s.showLoadMore = true
        })
    }

    fetch(keyword, cidade, categoria, tipo)
  }

  return (
    <div id="Container" className="flex flex-col min-h-screen bg-gray-100">
      <SEO
        title={configs.title}
        description={configs.description}
        shoudExcludeTitleSuffix
        siteName={configs.title}
        image={configs.logoAlternative}
      />

      <div className="block md:hidden">
        <PageHeaderHome />
        <div id="column" className="flex flex-col relative -top-4 bg-gray-100 rounded-tr-2xl">
          <span className="ml-4 mt-4 opensans-bold text-xl " >Vagas</span>

          <div id="items" className="flex flex-col ">

            {vagas.length == 0 ? <span className="w-full p-4 text-sm">Nenhuma vaga encontrada com os filtros selecionados.</span> : ''}
            {loading ? (<><VagaItem_Skeleton /><VagaItem_Skeleton /><VagaItem_Skeleton /><VagaItem_Skeleton /></>) :

              vagas.map((vaga, index) => {
                return (<React.Fragment key={vaga.slug} >
                  {(index == 2 || index == 5 || index == 10 || (index > 10 && (Math.abs(index) % 10 == 5 || Math.abs(index) % 10 == 0))) ? <AdsHorizontalMobile /> : ""}
                  <VagaItem
                    img={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage}
                    title={vaga.title}
                    empresa={vaga.company.title}
                    type={vaga.type.title}
                    city={vaga.place.title}
                    textColor={vaga.type.textcolor}
                    backgroundColor={vaga.type.backgroundcolor}
                    url={vaga.slug}
                    slugEmpresa={vaga.company.slug}
                  />
                </React.Fragment>
                )
              })

            }

            <div className="flex flex-col w-full justify-center items-center text-center mt-3 mb-28  ">
              {loadingMore ? <>  <CircularProgress size={24} />  <br /> </> : ""}
              {showLoadMore ? <a onClick={() => loadMore()} className={`text-bold p-2 shadow-md rounded-md opensans-bold text-md text-white bg-primary cursor-pointer`} >CARREGAR MAIS VAGAS</a> : <a className="text-bold p-2 rounded-md opensans-bold text-md text-gray-400 bg-backgroundSecondary  shadow-md cursor-pointer">CARREGAR MAIS VAGAS </a>}
            </div>

          </div>

        </div>
        <Footer />
      </div>
      {/* ------ FIM MOBILE ------ */}


      {/* ------ DESKTOP ------ */}
      <div className="hidden md:block">
        <PageHeaderDesktop hideLogo={false} />

        <div id="desktop" className="flex flex-col p-4 w-full items-center justify-center">

          <div id="searchBox" className="max-w-5xl w-full flex bg-white rounded-md p-1 mt-4 items-center">

            <Form className="flex w-full items-center" onSubmit={handleSubmit}>

              <div className="flex ml-2 w-6 h-6" ><SearchIcon size={22} /></div>
              <Input name="textSearch" label="" className="pl-2 bg-transparent" placeholder="Pesquise aqui sua vaga" />

              <button className={`bg-secondary rounded-md opensans-bold text-white py-2 px-4`} type="submit">Buscar</button>
            </Form>

          </div>

          <div id="TwoColumns" className="flex mt-4 w-full max-w-5xl">

            <div id="BarraLateral" className="w-80 flex flex-col space-y-2">
              <AdsQuadrado />
              <AvisoGruposDesktop />


              <div id="Filtros" className="flex   flex-col">

                <div className="flex items-center  pt-5 opensans-bold text-lg"><FilterIcon className="mr-2" size={20} />Filtros</div>


                <main onClick={() => setColapseCidades(!colapseCidades)} className="flex mb-2 justify-between items-center bg-white rounded-md text-gray-400 mt-2 px-4 py-2"><span className="text-sm opensans-bold">Local</span> <span className="cursor-pointer" > {colapseCidades ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span></main>
                <Collapse in={colapseCidades}>
                  <div className="opensans-regular text-sm flex flex-col h-36 overflow-y-scroll">
                    {cidades.map(c => {
                      return cidade == String(c.id) ? <span className="cursor-pointer block items-center" onClick={() => checkBoxCidade("")} key={c.id}><CheckboxChecked color={configs.secondary} size={24} />{c.attributes.cidade}</span> : <span className="cursor-pointer block items-center" onClick={() => checkBoxCidade(c.id)} key={c.id}><Checkbox size={24} />{c.attributes.cidade}</span>
                    })}
                  </div>
                </Collapse>
              </div>

              <div id="Filtros" className="flex flex-col  ">
                <main onClick={() => setColapseCategorias(!colapseCategorias)} className="flex mb-2 justify-between items-center bg-white rounded-md text-gray-400 mt-8 px-4 py-2"><span className="text-sm opensans-bold">Categoria</span><span className="cursor-pointer" > {colapseCategorias ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span></main>
                <Collapse in={colapseCategorias}>
                  <div className="opensans-regular text-sm flex flex-col h-36 overflow-y-scroll">
                    {categorias.map(c => {
                      return categoria == String(c.id) ? <span className="cursor-pointer block items-center" onClick={() => checkBoxCategoria("")} key={c.id}><CheckboxChecked color={configs.secondary} size={24} /><span  >{c.attributes.categoria}</span></span> : <span className="cursor-pointer block items-center" onClick={() => checkBoxCategoria(c.id)} key={c.id}><Checkbox size={24} />{c.attributes.categoria}</span>
                    })}
                  </div>
                </Collapse>
              </div>



              <div id="Filtros" className="flex flex-col">
                <main onClick={() => setColapseTipos(!colapseTipos)} className="flex mb-2 justify-between items-center bg-white rounded-md text-gray-400 mt-8 px-4 py-2"><span className="text-sm opensans-bold">Tipo de Contrato</span><span className="cursor-pointer"> {colapseTipos ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</span></main>
                <Collapse in={colapseTipos}>
                  <div className="opensans-regular text-sm flex flex-col h-36 overflow-y-scroll">
                    {tipos.map(t => {
                      return tipo == String(t.id) ? <span className="cursor-pointer block items-center" onClick={() => checkBoxTipo("")} key={t.id}><CheckboxChecked color={configs.secondary} size={24} />{t.attributes.tipo}</span> : <span className="cursor-pointer block items-center" onClick={() => checkBoxTipo(t.id)} key={t.id}><Checkbox size={24} />{t.attributes.tipo}</span>
                    })}
                  </div>
                </Collapse>
              </div>


            </div>

            <div className="ml-4 flex flex-col w-full ">

              <span className=" hidden qtdTotal">Encontramos <strong>235</strong> vagas disponíveis</span>
              <div id="filtrosativos" className="flex space-x-6">
                {(categoria || tipo || keyword || cidade) ? "Filtro(s) ativo(s): " : ""}
                {categoria ? <span className={`text-xs opensans-bold flex items-center px-2  ml-2  rounded-md text-white bg-secondary`}>{getTitleByID(categorias, categoria)} <CloseIcon className="ml-2 cursor-pointer" onClick={() => checkBoxCategoria("")} size={12} /></span> : ""}
                {tipo ? <span className={`text-xs opensans-bold flex items-center px-2   ml-2  rounded-md text-white bg-secondary`}>{getTitleByID(tipos, tipo)} <CloseIcon className="ml-2 cursor-pointer" onClick={() => checkBoxTipo("")} size={12} /></span> : ""}
                {cidade ? <span className={`text-xs opensans-bold flex items-center px-2   ml-2  rounded-md text-white bg-secondary`}>{getTitleByID(cidades, cidade)} <CloseIcon className="ml-2 cursor-pointer" onClick={() => checkBoxCidade("")} size={12} /></span> : ""}
                {keyword ? <span className={`text-xs opensans-bold flex items-center px-2   ml-2  rounded-md text-white bg-secondary`}>{keyword} <CloseIcon className="ml-2 cursor-pointer" onClick={() => limparKeyword()} size={12} /></span> : ""}
                {(categoria || tipo || keyword || cidade) ? <span onClick={() => [checkBoxCategoria(""), checkBoxCidade(""), checkBoxTipo(""), limparKeyword(), ExibirNotificacao("Todos os filtros foram removidos 😄  ")]} className={`text-xs cursor-pointer opensans-bold flex items-center px-2  ml-2  rounded-md text-white bg-primaryAlternative`}>Remover Filtros <TrashIcon size={12} /> </span> : ""}


              </div>

              <div style={{ height: "1250px" }} className="flex flex-col mt-2 pr-1 rounded-t-md bg-gray-100 overflow-y-scroll">


                {vagas.length == 0 ? <span className="p-2">Nenhuma vaga encontrada com os filtros selecionados.</span> : ''}

                {loading ? (<><VagaItem_Skeleton /><VagaItem_Skeleton /><VagaItem_Skeleton /><VagaItem_Skeleton /></>) : vagas.map((vaga, index) => {

                  return (<div className="py-2" key={vaga.slug} >
                    {(index == 2 || index == 5 || index == 10 || (index > 10 && Math.abs(index) % 10 == 5)) ? <AdsHorizontal750 /> : ""}
                    <VagaItemDesktop
                      category={vaga.category.title}
                      img={vaga.company.logo ? vaga.company.logo.data.full_url : vaga.company.logourl ? vaga.company.logourl : configs.notFoundImage}
                      title={vaga.title}
                      empresa={vaga.company.title}
                      type={vaga.type.title}
                      city={vaga.place.title}
                      textColor={vaga.type.textcolor}
                      backgroundColor={vaga.type.backgroundcolor}
                      url={vaga.slug}
                      slugEmpresa={vaga.company.slug}
                    />
                  </div>
                  )
                })
                }

                <div className="flex mt-2 w-full justify-center">
                  <div className="flex flex-col w-full max-w-xs items-center">
                    {loadingMore ? <>  <CircularProgress size={24} />  <br /> </> : ""}
                    {showLoadMore ? <a onClick={() => loadMore()} className={`text-bold p-2 shadow-md rounded-md opensans-bold text-md text-white bg-primary cursor-pointer`} >CARREGAR MAIS VAGAS</a> : <a className="text-bold p-2 rounded-md opensans-bold text-md text-gray-400 bg-backgroundSecondary  shadow-md cursor-pointer">CARREGAR MAIS VAGAS </a>}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        <FooterDesktop />

      </div>



    </div>
  )
}
