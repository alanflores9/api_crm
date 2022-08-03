import {useParams}  from 'react-router-dom'
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
const VerCliente = () => {
    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(false)
    const {id} = useParams()
    useEffect(()=>{
        setCargando(!cargando)
        const obtenerClienteAPI = async ()=> {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch (url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error)
            }
           
            setCargando(false)
        }
        obtenerClienteAPI()
    },[])
  return (
   cargando ? <Spinner/> : Object.keys(cliente).length === 0 ? <p>No hay Resultados</p> : ( 
    <>
    <div>
       
         <>
         <h1 className='font-black text-4xl text-blue-900'>Informacion Cliente: {cliente.nombre}</h1>
       <p className='mt-3'>
         <span className='text-gray-700 uppercase font-bold'>Cliente: </span>
         {cliente.nombre}
       </p>
       <p className='mt-2'>
         <span className='text-gray-700 uppercase font-bold'>Email: </span>
         {cliente.email}
       </p>
       { cliente.telefono &&(
         <p className='mt-2'>
         <span className='text-gray-700 uppercase font-bold'>Telefono: </span>
         {cliente.telefono}
       </p>
       )
 
       }
       <p className='mt-2'>
         <span className='text-gray-700 uppercase font-bold'>Empresa: </span>
         {cliente.empresa}
       </p>
       {
         cliente.notas && (
             <p className='mt-2'>
         <span className='text-gray-700 uppercase font-bold'>Notas: </span>
         {cliente.notas}
       </p>
         )
       }
         </>
    </div>
    </>
    )
  );
}

export default VerCliente;
