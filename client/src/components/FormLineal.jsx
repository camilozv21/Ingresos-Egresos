import { useState } from 'react';
import axiosConfig from '../api/axiosConfig';

function FormLineal() {
  const [date, setDate] = useState('');
  const [typeAmount, setTypeAmount] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const movimiento = {
      date,
      typeAmount,
      amount,
      category,
      description
    };

    const postData = async (movimiento) => {
      try {
        await axiosConfig.post('/add', movimiento);
      } catch (err) {
        console.log(err);
      }
    };

    postData(movimiento);

  }

  return (
    <form className="w-full" onSubmit={e => handleSubmit(e)}>
      <div className="flex flex-col sm:flex-row sm:justify-around items-center sm:flex-nowrap border-b border-teal-500 py-2 gap-2">
        <input
          type="date"
          name="date"
          value={date}
          className="w-28 md:w-36"
          onChange={e => setDate(e.target.value)}
        />
        <select
          name="typeAmount"
          value={typeAmount}
          className="w-28 md:w-32"
          onChange={e => setTypeAmount(e.target.value)}
        >
          <option value="">Tipo de Monto</option>
          <option value="Ingreso">Ingreso</option>
          <option value="Egreso">Egreso</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder='Monto'
          value={amount}
          className="w-20 md:w-24 placeholder-black"
          onChange={e => setAmount(e.target.value)}
        />
        <select
          name="category"
          value={category}
          className="w-28 md:w-24"
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">Categoría</option>
          <option value="Transporte">Transporte</option>
          <option value="Comida">Comida</option>
          <option value="Cuota Mensual Padres">Cuota Mensual Padres</option>
          <option value="Ahorro Confiar">Ahorro Confiar</option>
          <option value="Otro">Otro</option>
        </select>
        <textarea
          name="description"
          value={description}
          placeholder='Descripción'
          className="w-28 md:w-24 h-6  placeholder-black"
          onChange={e => setDescription(e.target.value)}
        />
        <button
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default FormLineal;