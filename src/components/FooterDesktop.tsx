import React, { useState } from 'react'
import configs from '../configs'
import Image from 'next/image'

import { Android as AndroidIcon } from '@styled-icons/boxicons-logos/Android'
import { FacebookSquare as FacebookIcon } from '@styled-icons/boxicons-logos/FacebookSquare'
import { LinkedinSquare as LinkedinIcon } from '@styled-icons/boxicons-logos/LinkedinSquare'
import { InstagramAlt as InstagramIcon } from '@styled-icons/boxicons-logos/InstagramAlt'

interface Props {

}

const FooterDesktop: React.FC<Props> = () => {

    return (
        <div id="container" className="flex p-4 mt-4 justify-center  w-full bg-white" >
            <div className="max-w-5xl w-full">
                <div id="innercontainer" className="flex flex-col w-full ">
                    <Image className="mt-18 mb-3 w-40" alt={configs.title} height={20} width={160} src={configs.logoAlternative} />
                    <div id="treecolums" className="flex w-full justify-between">
                        <div className="opensans-regular text-textSecondary max-w-md text-sm">
                            <span dangerouslySetInnerHTML={{ __html: configs.description }} />
                            <a className={`flex items-center opensans-bold text-secondary`} href={configs.AndroidUrl}>Baixe nosso App:<AndroidIcon size={48} /></a>
                        </div>

                        <div className="flex flex-col opensans-semi-bold text-md space-y-2 ">
                            <a href="#">Empresas</a>
                            <a href="#">Favoritos</a>
                            <a href="#">Cursos e Concursos</a>
                            <a href="/grupos">Grupos WhatsApp</a>
                            <a href="#">Parcerias</a>
                        </div>

                        <div className="flex flex-col opensans-semi-bold text-md space-y-2 ">
                            <a href="#">Contato</a>
                            <a href="#">Anunciar Vagas</a>
                            <div className={`mt-6`}>
                                <span>Siga-nos</span>
                                <div className=" flex mt-space-x-2">
                                    <a href={configs.facebook} className="text-facebook"  rel="noreferrer" target="_blank"><FacebookIcon size={24} /></a>
                                    <a href={configs.instagram} className="text-instagram"  rel="noreferrer" target="_blank"><InstagramIcon size={24} /></a>
                                    <a href={configs.linkedin} className="text-linkedin"  rel="noreferrer" target="_blank"><LinkedinIcon size={24} /></a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <hr className="my-2" />
                    <div id="rodapelinks" className={`flex text-center justify-center w-full space-x-4 opensans-semi-bold  text-sm  text-primary my-6`}>
                        <a href="#">Politica de privacidade</a>
                        <a href="#">Termos de uso</a>
                        <a href="#">Sobre</a>
                        <a href="#">Anuncie</a>
                        <a href="#">FAQ</a>
                    </div>
                    <div id="copyrigth" className="flex text-center justify-center w-full mb-19 opensans-semi-bold text-sm text-textSecondary ">
                        <span>Copyright © 2020 - </span><strong className={`text-secondary`}> {configs.title}</strong>
                    </div>

                </div>

            </div>
        </div>

    );
}

export default FooterDesktop