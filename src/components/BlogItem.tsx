import configs from '../configs/' 
interface Props {
  title: string;
  img: string;
  url: string;
  empresa: string;
  city: string;
}

const VagaItem: React.FC<Props> = ({ title, img, url, empresa, city }) => {

  return (
    <div id="postitemdiv" className={`relative flex items-center justify-center bg-backgroundSecondary m-1 rounded-md p-3`}>
      <a href={`blog/${url}`} >
        <div className="w-32 bg-cover bg-white rounded-md" style={{ backgroundImage: `url(${img})` }}>
        </div>
        <div id="twocollums" className="flex flex-col justify-center w-full">
          <span className={`flex w-full m-2 opensans-semi-bold text-md text-primary`}>
            {title}
          </span>
          <span className="flex content-center justify-between">
            <span className={`flex content-center m-1 ml-2 opensans-regular text-secondary`}>{empresa}</span>
          </span>
          <span className="flex content-center justify-between">
            <span className={`flex content-center m-1 ml-2 opensans-regular text-secondary`}>{city}</span>
          </span>

        </div>
      </a>
    </div>

  );
}

export default VagaItem