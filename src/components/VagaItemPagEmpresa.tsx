import { LocationPin as FiMapPin } from '@styled-icons/entypo/LocationPin'
import configs from '../configs';
import Image from 'next/image'
interface Props {
  title: string;
  img: string;
  url: string;
  type: string;
  city: string;
  textColor: string;
  backgroundColor: string;
  slugEmpresa: string;
}

const VagaItem: React.FC<Props> = ({ title, img, url, slugEmpresa, type, city, textColor, backgroundColor }) => {

  return (

    <div id="PostItemDiv" className="relative shadow-md   mt-4 rounded-md bg-backgroundSecondary flex w-full ">

      <a href={`/${slugEmpresa}/${url}`} className="flex w-full">
        <div className="h-12 w-12 shadow-md flex bg-white justify-center items-center  rounded-md m-2  ">
          <Image className="rounded-md" alt={title} src={img} width={80} height={80} />
        </div>
        <div id="TwoCollumns" className="flex flex-col justify-center">
          <span className="flex content-center justify-between">
            <span className="opensans-semi-bold rounded-md flex justify-center text-sm p-1 absolute top-4 right-4" style={{ background: backgroundColor, color: textColor }}> {type}</span>   </span>
          <span className={`flex w-full opensans-semi-bold text-md text-primary`}>
            {title}
          </span>

          <span className="flex content-center justify-between">
            <span className={`flex content-center opensans-regular text-md  text-secondary  space-x-2 items-center`}><FiMapPin size={16} /> {city}</span>
          </span>

        </div>
      </a>
    </div>
  );
}

export default VagaItem