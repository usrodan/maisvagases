import React, { useEffect, useState } from 'react'
import PageHeaderHome from '../components/PageHeaderHome' 
import configs from '../configs'
import { Options } from '../store/Options' 
import axios from 'axios'
import Axios from '../utils/axios' 
import { toast } from 'react-toastify';

export default function Vagas() {
 const [itJobsData, setItJobsData] = useState([])

useEffect(()=>{
  axios.get("https://api.itjobs.pt/job/list.json?api_key=7851814acde84ad743cde8c8bc69f45e&limit=25").then(response=>{
    setItJobsData(response.data.results)
  })
},[])  

            function addNewVaga(vaga){  
              /*
                toast.success(`Vaga ${vaga.slug} postada!`, {
                  position: "bottom-center",
                  autoClose: 3500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                })
                */

                axios.post("/api/addNewVaga",vaga)
              
            
            }

            function addNewCompany(company){   
              axios.post("/api/addNewCompany",company)  
          }

    return (
        <div id="Container" className="flex flex-col min-h-screen bg-gray-100">
           
            <div className="mt-2 text-md">
            <p className="flex justify-between   p-2"  ><span>Ação</span> <span>ID </span> <span>Título da Vaga</span> <span>ID Empresa</span> <span>ID Cidade</span></p>
            {itJobsData.map(vaga => {
                return <p className="flex justify-between text-left  p-1 " key={vaga.id}> <span onClick={()=>addNewVaga({
                    title: vaga.title,
                    slug: vaga.slug,
                    application:"null",
                    description:vaga.body,
                    place:vaga.locations? vaga.locations[0].name: "Lisboa",
                    company:vaga.company.name 
                  })} className=" bg-gray-800 rounded-md p-2 text-white cursor-pointer" >Postar Vaga </span>
                  
                  <span className="text-gray-800 ">{vaga.id}</span> 
                  <span className="text-gray-800 ">{vaga.title}</span>
                  <span onClick={()=> addNewCompany({
                    name: vaga.company.name,
                    slug: vaga.company.slug,
                    logo:vaga.company.logo,
                    site:vaga.company.url,
                    email:vaga.company.email,
                    facebook:vaga.company.url_facebook,
                    linkedin:vaga.company.url_linkedin, 
                    description:vaga.company.description,
                    place:vaga.locations? vaga.locations[0].name: "Lisboa"
                  })}
                  className="text-verdinho">{vaga.company.name} </span> <span className="text-facebook">{vaga.locations? vaga.locations[0].name: "Lisboa"}</span> 
                  
                  </p>
            })}
            </div>
        </div>

    )
}
