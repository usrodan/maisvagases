import Axios from '../../utils/axios'
import configs from '../../configs'
import { useState } from 'react'
 

export default async function handler(req, res) {  

  const getCidade = async () => {
    try {
        const resp = await Axios.get(`/items/${configs.prefixo}places?filter[title][eq]=Vitoria&single=1`)
        return resp
    } catch (err) {
        // Handle Error Here
        console.error(err);
        return null
    }
};
  //await Axios.get(`/items/${configs.prefixo}places?filter[title][eq]=${req.place}&single=1`).then(response => setCidadeCod(response.data.id))
  // await Axios.get(`/items/${configs.prefixo}places?filter[title][eq]=Vitoria&single=1`).then( response =>setCidade(response.data.id))
  
  console.log(getCidade)
  
  var data = { 
    status: "published",
    owner: 1, 
    title: "Teste",
    slug: null,
    logo: null,
    logourl: null,
    site: null,
    email: null,
    phone: null,
    facebook: null,
    instagram: null,
    linkedin: null,
    description: null,
    place: getCidade
}
    
  await Axios.post(`/items/${configs.prefixo}company`,data)

    res.end(`ok `)
  }