import React, { useState } from 'react'
import configs from '../configs' 
import CircularProgress from '@material-ui/core/CircularProgress';
import Image from 'next/image'

const LoadingComponent: React.FC  = () => {
  return (
    <div id="container" className={`flex z-30 fixed flex-col items-center justify-center  h-screen w-full bg-primary`} >
    <Image alt="loading" height={60} width={260} src= {configs.logo}/>
     <CircularProgress color='inherit'  className="text-white" size={30 } /> 
    </div>

  );
}

export default LoadingComponent