import configs from "../configs";
import AdSense from 'react-adsense';

interface Props {

}

const AdsHorizontal: React.FC<Props> = () => {
  return (
    <div className="w-full flex h-24 items-center justify-center p-2 rounded-md bg-white shadow-md mb-4">
         <AdSense.Google
          client={configs.AdsCaPub}
          slot={configs.AdsHorizontal}
          style={{ width: 740, height: 80, float: 'left' }}
          format=''
        />
       
    </div>

  );
}

export default AdsHorizontal