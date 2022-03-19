import Axios from '../../utils/axios'
import configs from '../../configs'
import axios from 'axios'  

export default async function handler(req, res) { 
 
  const companyId = await axios.post(`${configs.siteUrl}/api/getCompanyIdByName`,{name: req.body.company})
  const placeId = await axios.post(`${configs.siteUrl}/api/getPlaceIdByName`,{name:req.body.place})

  function string_to_slug (str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase(); 
    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiioooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-'); // collapse dashes
    var rdm = Math.floor(Math.random() * 100000) + 1;
    return str+"-"+rdm;
}
  
  var data = { 
    status: "published",
    owner: 1, 
    title: req.body.title,
    slug: string_to_slug(req.body.title),
    company: companyId.data,
    category:req.body.category,
    type:  req.body.type,
    application: req.body.application,
    description: req.body.description,
    place: placeId.data
}  

  const response = await Axios.post(`/items/${configs.sufix}_jobs`,data)  
  res.json(response.data)  

  }