import configs from '../../configs'
import axios from 'axios'
import Axios from '../../utils/axios'

export default async function handler(req, res) { 

    const urlReq = `items/${configs.sufix}_jobs?single=1&filter[slug][eq]=${req.body.slug}&fields=*.*.*.*`
    //console.log(urlReq)
    const ax = await Axios.get(urlReq)
    const vaga = ax.data.data 

await axios.get(`${configs.siteUrl}/t/${vaga.slug}`)
await axios.get(`${configs.siteUrl}/l/${vaga.slug}`)
await axios.get(`${configs.urlCompartilhamento}/f/${vaga.slug}`)
await axios.get(`${configs.siteUrl}/w/${vaga.slug}`)


const mensagem = `📢 CONFIRA ESTA OPORTUNIDADE!
🏭 EMPRESA: ${vaga.company.title}
💼 CARGO: ${vaga.title}
📍 LOCAL:  ${vaga.place.title}
🔗 Candidate-se em: 
${configs.siteUrl}/w/${vaga.slug}`


const mensagemTelegram = `📢 CONFIRA ESTA OPORTUNIDADE!
🏭 EMPRESA: ${vaga.company.title}
💼 CARGO: ${vaga.title}
📍 LOCAL: ${vaga.place.title}
🔗 Candidate-se em: 
${configs.siteUrl}/t/${vaga.slug}` 


await axios.get(`https://api.telegram.org/bot${configs.tokenTelegram}/sendMessage?chat_id=${configs.chatId}&text=${encodeURI(mensagemTelegram)}`)
 
await axios.get(`https://api.callmebot.com/whatsapp.php?phone=${configs.numeroTel}&text=${encodeURI(mensagem)}&apikey=${configs.apiWhatsapp}`)

 
res.end(`ok `)
}