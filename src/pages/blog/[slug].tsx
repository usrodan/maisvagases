
import React, { useCallback, useRef, useState } from 'react'; 
 
import { useRouter } from 'next/router';
import LoadingComponent from '../../components/LoadingComponent';
 
 
 

export default function BlogSingle( ) {  
  const router = useRouter()

  if (router.isFallback) {
    return <LoadingComponent/>
  } 
  return (
  <div>ok</div> 
  )
}  

