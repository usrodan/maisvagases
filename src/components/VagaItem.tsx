import Image from 'next/image'
import { LocationPin as FiMapPin } from '@styled-icons/entypo/LocationPin'
import { Buildings as BiBuildings } from '@styled-icons/boxicons-regular/Buildings'
import configs from '../configs'

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
}

const VagaItem: React.FC<Props> = ({ title, img, url, empresa, slugEmpresa, type, city, textColor, backgroundColor }) => {

  return (
    <div className="flex w-full px-2 mt-3 ">
      <div id="PostItemDiv" className="flex relative w-full   bg-white  shadow-md rounded-md p-2  " >

        <a href={`${slugEmpresa}/${url}`} className="flex w-full  space-x-4 items-center content-center">

          <div className="    w-20  h-20 justify-center items-center flex bg-white  rounded-md shadow-md" >
            <Image className="rounded-md " alt={title} src={img} width={80} height={80} />
          </div>

          <div id="flex flex-col justify-between w-full">
            <span className={`flex w-full m-0.5 opensans-semi-bold text-md text-primary`}>
              {title}
            </span>
            <span className={`flex w-full content-center justify-between text-secondary`}>
              <span className="flex content-center m-0.5 space-x-2 opensans-regular text-sm" ><BiBuildings size={16} /> {empresa}</span>
              <span className="opensans-semi-bold rounded-md absolute right-4 py-1 px-2 justify-center flex text-xs" style={{ background: backgroundColor, color: textColor }}> {type}</span> </span>
            <span className={`flex w-full content-center justify-between text-secondary`}>
              <span className="flex content-center m-0.5 space-x-2 opensans-regular text-sm" ><FiMapPin size={16} /> {city}</span>
            </span>

          </div>
        </a>
      </div>
    </div>
  );
}

export default VagaItem