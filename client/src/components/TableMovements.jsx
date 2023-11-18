import { useState, useEffect } from 'react'
import { RowMovement } from './RowMovement'
import axiosConfig from '../api/axiosConfig'

export const TableMovements = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axiosConfig.get('/movements')
      .then(response => {
        const sortedData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data: ', error)
      })
  }, [data])

  return (
    <table className="min-w-full table-auto hover:table-fixed mt-11">
      <thead className="justify-between border">
        <tr>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Tipo de Monto</th>
          <th className="px-4 py-2">Monto</th>
          <th className="px-4 py-2">Categoria</th>
          <th className="px-4 py-2">Descripcion</th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((item, index) => (
          <tr key={index} className={`text-center text-lg font-semibold ${item.typeAmount === 'Ingreso' ? 'text-green-500' : 'text-red-400'} ${index % 2 === 1 ? 'bg-white' : 'bg-gray-100'} border hover:bg-gray-300`}>
            <RowMovement
              date={new Date(item.date).toLocaleDateString()}
              typeMount={item.typeAmount}
              mount={item.amount}
              category={item.category}
              description={item.description}
            />
          </tr>
        ))}
      </tbody>
    </table>
  )
}
