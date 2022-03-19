import Image from 'next/image'
import { Place } from '@styled-icons/material-outlined/Place'
interface Props {
  title: string;
  img: string;
  url: string;
  empresa: string;
  type: string;
  city: string;
  textColor: string;
  backgroundColor: string;
  slugEmpresa: string;
  category: string
}
const VagaItemDesktop: React.FC<Props> = ({ title, category, img, url, empresa, slugEmpresa, type, city, textColor, backgroundColor }) => {

  return (
    <div className="flex w-full hover:opacity-80">
      <div id="PostItemDiv" className="relative p-2 flex w-full bg-white rounded-md shadow-md   " >

        <a href={`/${slugEmpresa}/${url}`} className="w-full">
          <div id="Collumns" className="flex w-full justify-between items-center">
            <div className="flex w-8/12">
              <div className="w-14 h-14 shadow-md bg-white flex justify-center items-center rounded-md " >
                <Image className="rounded-md" alt={title} src={img} width={60} height={60} />
              </div>
              <div className="flex  justify-between align-center">
                <div className="flex pl-2 flex-col w-full justify-center">
                  <span className="text-primary w-full opensans-semi-bold text-lg">{title}</span>
                  <span className="text-gray-400 opensans-regular text-xs">{empresa}</span>
                </div>
              </div>
            </div>


            <div className="flex flex-col   w-2/12">
              <span className="text-gray-400 opensans-regular flex items-center text-xs"><Place className="mr-1" size={16} />{city}</span>
            </div>


            <div className="flex flex-col  w-2/12 justify-center">
              <span className="opensans-bold text-xs rounded-md text-center p-1  " style={{ background: backgroundColor, color: textColor }}> {type}</span>

            </div>

          </div>
        </a>
      </div>
    </div>
  );
}

export default VagaItemDesktop