import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AvisoCookies: React.FC = () => {

    const [CookiesAceitos , setCookiesAceitos] = useState(false)
    const router = useRouter()

    function Aceito(){ 
        setCookiesAceitos(true)
        localStorage.setItem('MaisVagas@Lido','lido')
    }

    function PoliticadePrivacidade(){
        router.push("/politica-de-privacidade")
    }

    useEffect(()=>{
        localStorage.getItem('MaisVagas@Lido') && setCookiesAceitos(true)
    },[])

    return (
        <div className={`${CookiesAceitos && "hidden" } w-full shaddow-md xs:text-xs sm:text-sm fixed bottom-0 z-20 p-4 flex items-center justify-between  bg-primary shadow-md `}>
            <p className="text-white opensans-bold">Este site usa cookies para garantir que você obtenha a melhor experiência.</p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-x-2 md:space-y-0"><span onClick={Aceito} className={`flex rounded-md cursor-pointer text-white opensans-bold p-2 bg-secondary`}>Aceitar!</span> <span onClick={PoliticadePrivacidade}  className={`flex rounded-md cursor-pointer text-white  opensans-bold p-2 bg-primaryAlternative`}>Saiba Mais!</span></div>
        </div>

    );
}
export default AvisoCookies