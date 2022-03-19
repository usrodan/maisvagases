export default function shareOn(socialMedia,url){
let finalUrl = ""
   switch(socialMedia){
       case "twitter" :
           finalUrl = "https://twitter.com/share?ref_src="+url
        break
        
        case "facebook" :
            finalUrl = "https://twitter.com/share?ref_src="+url
        break

        case "linkedin" :
            finalUrl = "https://twitter.com/share?ref_src="+url
        break

        case "whatsapp" :
            finalUrl = "https://twitter.com/share?ref_src="+url
        break

        default:
        break
   }

     
}