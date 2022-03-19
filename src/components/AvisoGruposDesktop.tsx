import { Megaphone as MegaphoneIcon } from '@styled-icons/boxicons-solid/Megaphone'
import { Whatsapp as WhatsappIcon } from '@styled-icons/remix-fill/Whatsapp'
import { Telegram as TelegramIcon } from '@styled-icons/boxicons-logos/Telegram'
import configs from '../configs/'
import { useRouter } from 'next/router'

const AvisoGruposDesktop: React.FC = () => {
  const router = useRouter()

  return (
    <div id="avisogrupos" className={`p-4 bg-secondary bg-opacity-10 rounded-md  `}>
      <div className="flex space-x-4">
        <MegaphoneIcon size={24} />
        <div className="opensans-regular text-md w-5/6 mb-2">
          Faça parte dos nossos canais de divulgação, e não perca nenhuma vaga publicada.<br />
          Todo dia novas vagas divulgadas!
        </div>
      </div>
      <div className="flex text-white text-xs space-y-3 text-center opensans-bold flex-col">
        <a href="#" onClick={() => router.push("/grupos")} className="bg-whatsapp p-1 px-2 items-center flex w-full rounded-md">
          <WhatsappIcon color="#FFF" size={24} />
          <div className="flex flex-col w-full">
            GRUPO DE VAGAS NO WHATSAPP
          </div>
        </a>
        <a href={configs.grupoTelegram} target="_blank" rel="noreferrer" className="bg-telegram p-1 px-2 items-center flex w-full rounded-md">
          <TelegramIcon color="#FFF" size={24} /><div className="flex flex-col w-full">
            <span>CANAL DE VAGAS NO TELEGRAM</span>
            <span className="opensans-regular text-xs">
              (AQUI AS VAGAS CHEGAM PRIMEIRO)
            </span>
          </div>
        </a>
      </div>
    </div>

  );
}

export default AvisoGruposDesktop