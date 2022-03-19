

import { ArrowLeft } from '@styled-icons/typicons/ArrowLeft'

import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import configs from '../configs'
import Image from 'next/image'

import { PaginaAtual } from '../store/PaginaAtual'

import { Favoritos } from '../store/Favoritos'
import { toast } from 'react-toastify';
import { MenuAlt2 as MenuIcon } from "@styled-icons/heroicons-solid/MenuAlt2"

interface PageHeaderProps {
  bg?: string;
  style?: string;
}
interface Categories {
  id: number;
  name: string;
  slug: string;
}
const PageHeader: React.FC<PageHeaderProps> = (props) => {

  const router = useRouter()

  return (
    <>
      <div id="TopBar" className={`flex justify-center px-1 pb-20 bg-primary shadow-md`} style={props.bg ? { background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${props.bg})`, backgroundSize: 'cover' } : {}}   >
        <div className="block_container">
          <div id="PageHeaderDiv" className="flex items-center justify-between w-full px-2 py-4" >
            <div id="flex">

              <a onClick={() => router.back()} href="#">
                <button className="backButton"><ArrowLeft color="#FFF" size={24} /></button>
              </a>

            </div>

            <div id="flex w-full justify-center">
              <a href="/">

                <Image width={150} height={50} alt={configs.title} src={configs.logo} />

              </a>
            </div>

          </div>
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

