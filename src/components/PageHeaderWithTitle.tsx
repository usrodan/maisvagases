
import { ArrowLeft } from '@styled-icons/fa-solid/ArrowLeft';
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import configs from '../configs'
import Image from 'next/image'

interface PageHeaderProps {
  bg?: string;
  style?: string;
  title: string;
  icon: any;
}
interface Categories {
  id: number;
  name: string;
  slug: string;
}


const PageHeader: React.FC<PageHeaderProps> = (props, children) => {

  const router = useRouter()


  function handleBackButton() {
    //console.log(router)
    router.back()
  }



  return (
    <>
      <div id="TopBar" className={`px-2  pb-12 flex flex-col  bg-primary shadow-sm`} style={props.bg ? { background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${props.bg})`, backgroundSize: 'cover' } : {}}   >
        <div className="flex w-full justify-center">
          <div id="PageHeaderDiv" className="flex items-center w-full justify-between -mt-2 px-2 py-4">
            <div id="esquerda" className="flex text-white  ">
              <a onClick={() => handleBackButton()} href="#">
                <ArrowLeft size={24} />
              </a>

            </div>

            <div id="centro" className="flex w-full justify-center">
              <a href="/">
                <Image width={150} height={50} alt={configs.title} src={configs.logo} />
              </a>
            </div>

            <div id="direita" className={`flex text-primary`} >
              <ArrowLeft size={24} />
            </div>

          </div>

        </div>

        <div className="flex px-2 -mt-2 opensans-extra-bold items-center  space-x-2 text-2xl text-white">
          <div>{props.icon}</div>
          <div>{props.title}</div>
        </div>




      </div >




    </>
  );
}


export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  return {
    props: {
      slug
    },
    revalidate: 10
  }
}




export default PageHeader

