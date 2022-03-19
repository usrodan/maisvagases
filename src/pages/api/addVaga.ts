import Axios from '../../utils/axios'
import configs from '../../configs'
import { useState } from 'react' 



export default async function handler(req, res) {    
  var data = { 
    status: "published",
    owner: 1, 
    title: req.body.title ? req.body.title : null,
    slug: req.body.slug ? req.body.slug : null,
    company:  req.body.company ? req.body.company : null,
    category:14,
    type:  1,
    application: req.body.application ? req.body.application : null,
    description: req.body.description ? req.body.description : null,
    place: req.body.place ? req.body.place : null
} 


var dataEmpresa = {  
  logourl: req.body.logo ? req.body.logo :null, 
  facebook: req.body.facebook ? req.body.facebook :null,
  instagram: req.body.instagram ? req.body.instagram : null,
  linkedin: req.body.linkedin ? req.body.linkedin : null,
  description: req.body.companydescription ? req.body.companydescription : null,
  place: req.body.place ? req.body.place : null
} 
  await Axios.post(`/items/${configs.sufix}_jobs`,data)
  await Axios.patch(`/items/${configs.sufix}_company/${req.body.company}`,dataEmpresa)

    res.json(data)
  }