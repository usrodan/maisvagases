import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Axios from '../utils/axios'
import { Form } from '@unform/web'
import Input from '../components/Input'
import Select from '../components/Select'
import configs from '../configs'
import TextArea from '../components/TextArea'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Vagas() {
  const formRefAddEmpresa = useRef(null)
  const formRefAddVaga = useRef(null)
  const [addEmpresa, setAddEmpresa] = useState(false)
  const [empresas, setEmpresas] = useState([])
  const [categories, setCategories] = useState([])
  const [locais, setLocais] = useState([])
  const [tipos, setTipos] = useState([])


  useEffect(() => {
    fetchData()
    fetchEmpresas()
    document.onkeyup = function (e) {
      if (e.ctrlKey && e.which == 66) {
        ColarConteudo();
      }
    };

  }, [])

  async function fetchData() {
    const reqCategorias = await Axios.get(`items/${configs.prefixo}categories?limit=-1&sort=title&fields=*`)
    const reqLocais = await Axios.get(`items/${configs.prefixo}places?limit=-1&sort=title&fields=*`)
    const reqTipos = await Axios.get(`items/${configs.prefixo}types?limit=-1&sort=title&fields=*`)

    setCategories(reqCategorias.data.data)
    setLocais(reqLocais.data.data)
    setTipos(reqTipos.data.data)
  }

  async function fetchEmpresas() {
    const reqEmpresas = await Axios.get(`items/${configs.prefixo}company?limit=-1&sort=title&fields=*`)
    setEmpresas(reqEmpresas.data.data)

  }

  async function ColarConteudo() {
    const text = await navigator.clipboard.readText();
    const jsonText = await JSON.parse(text)
    console.log(jsonText.vaga.title)
    //@ts-ignore
    formRefAddVaga.current.setFieldValue("title", jsonText.vaga.title)
    formRefAddVaga.current.setFieldValue("empresa", jsonText.vaga.empresa)
    formRefAddVaga.current.setFieldValue("description", jsonText.vaga.description)
    formRefAddVaga.current.setFieldValue("local", jsonText.vaga.place)
    formRefAddVaga.current.setFieldValue("application", jsonText.vaga.application.replace(/\s/g, ''))



    formRefAddEmpresa.current.setFieldValue("title", jsonText.empresa.name)
    formRefAddEmpresa.current.setFieldValue("local", jsonText.empresa.place)
    formRefAddEmpresa.current.setFieldValue("logoUrl", jsonText.empresa.logo)
  }



  async function handleSubmitAddVaga(data) {

    const sendData = {
      title: data.title,
      company: data.empresa,
      category: data.categoria,
      type: data.tipo,
      application: data.application,
      description: data.description,
      place: data.local
    }

    axios.post("/api/addNewVaga", sendData)
  }


  function handleSubmitAddEmpresa(data) {

    const sendData = {
      name: data.title,
      facebook: data.empresa,
      linkedin: data.categoria,
      description: data.description,
      place: data.local,
      site: data.site,
      phone: data.site,
      email: data.email,
      logourl: data.logoUrl,
    }


    axios.post("/api/addNewCompany", sendData)

    setTimeout(function () {
      setAddEmpresa(false)
      fetchEmpresas()
    }, 1000);

    setTimeout(function () {
      ColarConteudo()
    }, 3000);



  }



  return (
    <div id="Container" className="flex flex-col min-h-screen bg-gray-100">


      <div className="mt-2 text-md">


        <Form ref={formRefAddEmpresa} className={`${!addEmpresa && 'hidden'} p-2`} onSubmit={handleSubmitAddEmpresa}  >
          <div id="InputContainer" className="flex flex-col w-full bg-white rounded-md gap-2  p-2  ">

            <a href="#" className="flex w-full justify-end opensans-bold" onClick={() => { setAddEmpresa(false) }}>x</a>
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="title" placeholder="Nome da Empresa" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="site" placeholder="Site" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="email" placeholder="E-mail" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="phone" placeholder="Telefone" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="facebook" placeholder="Facebook" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="instagram" placeholder="Instagram" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="linkedin" placeholder="Linkedin" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="logoUrl" placeholder="Logo URL" />

            <Select name="local" className="bg-gray-100 p-2 rounded-md">
              <option value="">Local</option>
              {locais.map(e => (<option value={e.title} key={e.id} >{e.title}</option>))}
            </Select>


            <TextArea className="bg-gray-100 p-2 rounded-md" label="" name="description" placeholder="Descrição da Empresa" />

            <button className="bg-transparent border-0 p-2" type="submit">Adicionar Empresa</button>
          </div>
        </Form>


        <Form ref={formRefAddVaga} className={`${addEmpresa && 'hidden'} p-2`} onSubmit={handleSubmitAddVaga}  >
          <div id="InputContainer" className="flex flex-col w-full bg-white rounded-md gap-2  p-2  ">

            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="title" placeholder="Titulo" />
            <Select name="empresa" className="bg-gray-100 p-2 rounded-md" >
              <option value="">Empresa</option>
              {empresas.map(e => (<option value={e.title} key={e.id} >{e.title}</option>))}
            </Select>
            <a href="#" className="text-xs pl-2" onClick={() => { setAddEmpresa(true) }}>Não encontra a empresa? Clique aqui para adicionar!</a>
            <Select name="categoria" className="bg-gray-100 p-2 rounded-md">
              <option value={19}>Categoria</option>
              {categories.map(e => (<option value={e.id} key={e.id} >{e.title}</option>))}
            </Select>
            <Select name="local" className="bg-gray-100 p-2 rounded-md">
              <option value="">Local</option>
              {locais.map(e => (<option value={e.title} key={e.id} >{e.title}</option>))}
            </Select>
            <Select name="tipo" className="bg-gray-100 p-2 rounded-md">
              <option value={5}>Tipo</option>
              {tipos.map(e => (<option value={e.id} key={e.id} >{e.title}</option>))}
            </Select>

            <TextArea className="bg-gray-100 p-2 rounded-md" label="" name="description" placeholder="Descrição da vaga" />
            <Input type="text" label="" className="bg-gray-100 p-2 rounded-md" name="application" placeholder="Email ou URl para aplicação da vaga" />

            <button className="bg-transparent border-0 p-2" type="submit">Enviar</button>
          </div>
        </Form>




      </div>
    </div>

  )
}
