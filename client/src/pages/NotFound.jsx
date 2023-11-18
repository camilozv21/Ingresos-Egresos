import { FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='flex flex-col justify-center items-center mt-20'>
      <FaExclamationTriangle className='text-red-500' size='5em' />
      <span className='font-bold text-xl'>404</span>
      <p className="lead p-8 text-center text-xl">Lo sentimos 😥, esta página aún no existe<br />¡Te invitamos a que sigas navegando y descubiendo nuestros servicios y productos en el siguiente botón!</p>

      <Link to='/' className='py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700'>
        Página principal
      </Link>
    </div>
  )
}