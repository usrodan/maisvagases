import Axios from '../../utils/axios'
import configs from '../../configs'
import axios from 'axios'


export default async function handler(req, res) {

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
    return str;
}

  const facebookID = req.body.facebook ? req.body.facebook.replace("https://www.facebook.com/pages/", "").replace("https://www.facebook.com/", "").replace("/", "") : null
  const linkedinID = req.body.linkedin ? req.body.linkedin.replace("https://www.linkedin.com/company/", ""):null

  const placeDados = {
    name: req.body.place
  }
  const placeId = await axios.post(`${configs.siteUrl}/api/getPlaceIdByName`, placeDados)


    var Logo = req.body.logourl ? req.body.logourl : null

    var Logo2 = facebookID ? `https://graph.facebook.com/${facebookID}/picture?type=large&width=720&height=720` : Logo
    
    var data = { 
      status: "published",
      owner: 1, 
      title: req.body.name ? req.body.name :null,
      slug: req.body.name ? string_to_slug(req.body.name) :null,
      logo: null,
      logourl: Logo2,
      site: req.body.site ? req.body.site :null,
      email: req.body.email ? req.body.email :null,
      phone: req.body.phone ? req.body.phone :null,
      facebook: facebookID,
      instagram: null,
      linkedin: linkedinID,
      description: req.body.description ? req.body.description :null,
      place: placeId.data
  }
      
  const response = await Axios.post(`/items/${configs.prefixo}company`, data)
 

  res.json(response.data)
}