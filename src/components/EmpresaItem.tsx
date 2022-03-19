import React, { useState } from 'react';
import Link from 'next/link';
import NumberFormat from 'react-number-format';
import configs from '../configs/'


import { ChevronRightOutline as SetaDireita } from '@styled-icons/evaicons-outline/ChevronRightOutline'
import { Briefcase as BriefcaseIcon } from '@styled-icons/boxicons-regular/Briefcase'


interface Props {
  nome: string;
  img: string;
  url: string;
  qtdVagas: number;
  exibirQtd?: boolean;
}

const EmpresaItem: React.FC<Props> = ({ nome, img, url, qtdVagas, exibirQtd = true }) => {

  function zeroEsquerda(numero, comprimento) {
    numero = numero.toString();
    while (numero.length < comprimento)
      numero = "0" + numero;
    return numero;
  }

  return (
    <div id="PostItemDiv" className="flex  mt-2  w-full bg-white rounded-md p-2 shadow-md" >
      <a href={`/empresa/${url}`} className="flex w-full space-x-4  items-center ">

        <div className="flex w-12 h-10 rounded-md bg-cover" style={{ backgroundImage: `url(${img})` }} />

        <section className="flex w-full justify-between items-between  ">
          <span className={`text-md flex  opensans-regular text-primary`}>
            {nome}
          </span>
          <div className="flex space-x-4 justify-between text-gray-400 items-center">
            {exibirQtd ?
              <>
                <BriefcaseIcon size="20" />
                <span className={`text-md  opensans-bold `}>{zeroEsquerda(qtdVagas, 2)}</span>
              </>
              : <></>}
            <SetaDireita size="20" />
          </div>
        </section>

      </a>
    </div>

  );
}

export default EmpresaItem