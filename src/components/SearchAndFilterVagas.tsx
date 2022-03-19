

import React, { useState, useEffect } from 'react';

import { Search as SearchIcon } from '@styled-icons/boxicons-regular/Search'
import { Category as CategoryIcon } from '@styled-icons/material-outlined/Category'
import { Place as LocateIcon } from '@styled-icons/material-outlined/Place'
import { Telegram as TelegramIcon } from '@styled-icons/boxicons-logos/Telegram'
import { Whatsapp as WhatsappIcon } from '@styled-icons/remix-fill/Whatsapp'

import { Search } from '../store/Search'
import { Options } from '../store/Options'
import configs from '../configs'
import client from '../utils/apollo'   
import { gql } from '@apollo/client';
import { useRouter } from 'next/router'
import { Form } from "@unform/web"
import Input from "../components/Input"
import Select from "../components/Select" 

import { Collapse } from '@material-ui/core';
import Axios from '../utils/axios';

const SearchAndFilterVagas: React.FC = () => {
  const { categorias, cidades, tipos, loading, showFilters } = Options.useState(s => s);
  const { offset, itensPorPagina, keyword, categoria, cidade } = Search.useState(s => s)

  const StoreOptions = Options.useState(s => s);
  const router = useRouter()

  useEffect(() => { 
    fetchDados() 
  }, [])

  const fetchDados = async () => {

    const { data } = await client.query({
      query: gql` 
      query {
        cidades {
          data {
            id
            attributes {
              cidade
              slug 
            }
          }
        }
        categorias {
          data {
            id
            attributes {
              categoria
              slug 
            }
          }
        }
        tipos {
          data {
            id
            attributes {
              tipo
              slug 
            }
          }
        }

      }
    `,
    });

    console.log(data)
    const cidades = data.cidades.data
    const categorias = data.categorias.data
    const tipos = data.tipos.data


    Options.update(s => {
      s.cidades = cidades;
      s.categorias = categorias;
      s.tipos = tipos;
    })
  } 

  function handleSubmit(data) {
    Options.update(s => {
      s.loading = true;
    })

    Search.update(s => {
      s.offset = 0;
    })

    const fetchProducts = async (queryKeyword = "", queryCidadeID = "", queryCategoriaID = "", queryTipoID="") => {

      const req = await Axios.get(`items/${configs.prefixo}jobs?offset=${offset}&limit=${itensPorPagina}&fields=*.*.*${queryKeyword && `&filter[description][contains]=${queryKeyword}`}${queryCategoriaID && `&filter[category][eq]=${queryCategoriaID}`}${queryCidadeID && `&filter[place][eq]=${queryCidadeID}`}${queryTipoID && `&filter[type][eq]=${queryTipoID}`}&sort=-created_on`)
      const vagas = req.data.data 
 

      Search.update(s => {
        s.vagas = vagas
        s.keyword = queryKeyword
        s.categoria = queryCategoriaID
        s.cidade = queryCidadeID
        s.tipo = queryTipoID
      })

      Options.update(s => {
        s.loading = false;
      })
    };
    fetchProducts(data.textSearch, data.cidade, data.categoria, data.tipo)
  }

  return (

    <div id="container" className="flex flex-col p-4 pt-0 pb-8 w-full">
      <Form onSubmit={handleSubmit}>
        <div id="InputContainer" className="flex w-full bg-white rounded-md p-1">
          <Input type="text" className="pl-2" name="textSearch" label="" placeholder="Pesquisar Vaga" />
          <button className="bg-transparent border-0 p-2" type="submit">  <SearchIcon size="16" /> </button>
        </div>

        <Collapse in={showFilters}>
          <section className="flex space-x-4 mt-2 justify-between">
            <div className="flex space-x-2 bg-white bg-opacity-10 p-2 rounded-md items-center w-full text-white">
              <CategoryIcon size="16" />
              <Select className="w-4/5" name="categoria" >
                <option value="">Categoria</option>
                {categorias.map(c => {

                  return <option key={c.id} value={c.id}> {c.attributes.categoria}</option>
                })}
              </Select>
            </div>
            <div className="flex space-x-2 bg-white  bg-opacity-10 p-2 rounded-md items-center w-full text-white" >
              <LocateIcon size="16" />
              <Select className="w-4/5" name="cidade" >
                <option value="">Cidade</option>
                {cidades.map(c => {
                  return <option key={c.id} value={c.id}> {c.attributes.cidade}</option>
                })}
              </Select>
            </div>
          </section>

          <section className="flex space-x-4 mt-2 justify-between">
            <div className="flex space-x-2 bg-white bg-opacity-10 p-2 rounded-md items-center w-full text-white">
              <CategoryIcon size="16" />
              <Select className="w-4/5" name="tipo" >
                <option value="">Tipo</option>
                {tipos.map(c => {
                  return <option key={c.id} value={c.id}> {c.attributes.tipo}</option>
                })}
              </Select>
            </div>

            <div id="aplicarFiltro" className={`flex space-x-2 rounded-md p-2 bg-primaryAlternative  items-center w-full text-white`}>
              <SearchIcon size="16" />
              <span className="w-4/5"  ><button type="submit">Aplicar Filtro</button></span>
            </div>

          </section>
        </Collapse>

        <Collapse in={!showFilters}>
          <section className="flex space-x-4 mt-2 justify-between">
            <div onClick={()=>router.push('/grupos')} className="flex items-center w-full bg-whatsapp text-white opensans-bold text-xs p-1 pl-2 rounded-md">
              <WhatsappIcon size="20" />
              <span className="w-full text-center ">VAGAS NO WHATSAPP</span>
            </div>

            <a  href={configs.grupoTelegram} target="_blank" rel="noreferrer" className="flex items-center w-full bg-telegram text-white  opensans-bold text-xs p-1 pl-2 rounded-md">
              <TelegramIcon size="20" />
              <span className="w-full text-center ">CANAL NO TELEGRAM</span>
            </a>
          </section>

        </Collapse>
      </Form>
    </div>
  );
}

export default SearchAndFilterVagas