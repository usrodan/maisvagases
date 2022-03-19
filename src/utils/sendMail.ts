import axios from'axios';

export default function SendMail(
    clientEmail,
    clientName,
    clientTel,
    clientMessage){

var raw = JSON.stringify({"subject":`Nova Mensagem - ${process.env.NEXT_PUBLIC_SITE_NAME}`,"templateId":2,"sender":{"name":process.env.NEXT_PUBLIC_SITE_NAME,"email":"geral@cardip.pt"},"to":[{"email":process.env.NEXT_PUBLIC_EMAIL_RECIPIENT,"name":process.env.NEXT_PUBLIC_SITE_NAME}],"params":{"NOME":clientName,"TEL":clientTel,"CLIENTEMAIL":clientEmail,"MENSAGEM":clientMessage,"URL_ORIGIN":window.location.href}});


var myHeaders = new Headers();
myHeaders.append("content-type", "application/json");
myHeaders.append("api-key", "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");
myHeaders.append("accept", "application/json");
myHeaders.append("Cookie", "__cfduid=ddf0e5ee843e6e32199d7b549fce29cc41603359639");
 
 

fetch("https://api.sendinblue.com/v3/smtp/email",{
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
})
  .then(response => response.text())
  .then(result => alert("Sua mensagem foi enviada com sucesso. Em breve entraremos em contato."))
  .catch(error => console.log('error', error));
 


        }


 