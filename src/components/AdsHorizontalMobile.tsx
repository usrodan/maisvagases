import configs from "../configs";
import AdSense from 'react-adsense';

interface Props {

}

const AdsHorizontal: React.FC<Props> = () => {

  return (
    <div className="w-full flex items-center justify-center p-3  mb-4 ">
      <AdSense.Google
        client={configs.AdsCaPub}
        slot={configs.AdsHorizontal}
        style={{ width: 350, height: 80, float: 'left' }}
        format=''
      />

    </div>

  );
}

export default AdsHorizontal