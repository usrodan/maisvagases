import configs from "../configs"; 
import AdSense from 'react-adsense';

const AdsQuadrado: React.FC = () => {

  return (
    <div className="w-full p-2 flex items-center justify-center rounded-md bg-white shadow-md my-3"> 
        <AdSense.Google
           client={configs.AdsCaPub}
           slot={configs.AdsQuadrado}
          style={{ width: 230, height: 230, float: 'left' }}
          format='' 
        /> 
    </div> 
  );
}
export default AdsQuadrado