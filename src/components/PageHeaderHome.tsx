
import { Close as FiX } from '@styled-icons/material-rounded/Close'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import configs from '../configs'
import SearchAndFilterVagas from './SearchAndFilterVagas'
import Image from 'next/image'

import { Options } from '../store/Options'

import { MenuAlt2 as MenuIcon } from "@styled-icons/heroicons-solid/MenuAlt2"

import { Filter as FilterOutline } from "@styled-icons/heroicons-outline/Filter"
import { Filter as FilterSolid } from "@styled-icons/heroicons-solid/Filter"
interface PageHeaderProps {
  bg?: string;
}
interface Categories {
  id: number;
  name: string;
  slug: string;
}
const PageHeader: React.FC<PageHeaderProps> = (props) => {

  const { showFilters } = Options.useState(s => s);
  const [urlSlug, setUrlSlug] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const { slug } = router.query
    setUrlSlug(slug)
    menuOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'unset')
  },[router.query])

  function handleMenuOpen() {
    setMenuOpen(!menuOpen)
  }

  function handleShowFilters() {
    Options.update(s => {
      s.showFilters = !showFilters;
    })
  }


  return (
    <>
      {menuOpen ? (
        <div id="MenuHeader" className={`absolute flex w-full h-full bg-opacity-95 bg-primary z-50 flex-col p-2`}>
          <div className="flex h-12 justify-end text-white"  >
            <button className="" onClick={handleMenuOpen}><FiX size={30} /></button>
          </div>
          <ul>
            <li><a href="/">
              <h3 onClick={handleMenuOpen} >Home</h3>
            </a></li>

            <li><a href="/contacto">
              <h3 onClick={handleMenuOpen}>Contacto</h3>
            </a></li>

          </ul>
        </div>
      )
        : null
      }
      <div id="TopBar" className={`pb-2 flex justify-center bg-primary`} style={props.bg ? { background: `linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(${props.bg})`, backgroundSize: 'cover' } : {}} >
        <div className="block_container">
          <div id="PageHeaderDiv" className="flex px-4 justify-between space-x-4 items-center pt-2  w-full">
            <div id="esquerda" className="cursor-pointer">
              <a onClick={() => handleMenuOpen()}><MenuIcon color="#fff" size={24} /></a>
            </div>

            <div id="centro" className="cursor-pointer" >
              <a href="/">
                <Image width={150} height={50} alt={configs.title} src={configs.logo} />
              </a>

            </div>

            <div id="direita" className="cursor-pointer" >
              <a onClick={() => handleShowFilters()}>{showFilters ? <FilterSolid color="#fff" size={24} /> : <FilterOutline color="#fff" size={24} />}</a>
            </div>

          </div>

          <SearchAndFilterVagas />
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

