import React, { useState } from 'react';
import Link from 'next/link';
 
interface Props {

}

const VagaItem: React.FC<Props> = () => {

  return (
    <div className="w-full px-2 mt-3"> 
    <div id="PostItemDiv" className="relative w-full flex items-center justify-center content-center bg-backgroundSecondary   rounded-md" >
      <a className="flex w-full space-x-4 p-2">
        <div id="imagem" className=" w-16 h-16 bg-gray-200 rounded-md">
        </div>
        <div id="twocolums" className="flex w-full flex-col justify-center">
          <span className="flex w-56 h-5 rounded-md bg-gray-200 m-1">  </span>
          <span className="flex content-center justify-between">
            <span className="flex w-20 h-3 rounded-md  bg-gray-200 m-1"> </span>
            <span className="flex justify-center absolute rounded-md h-6 r-4 ">  </span>
          </span>
          <span className="flex content-center justify-between">
            <span className="flex w-20 h-3 rounded-md bg-gray-200 m-1">   </span>
          </span>

        </div>
      </a>
    </div>
    </div>
  );
}

export default VagaItem