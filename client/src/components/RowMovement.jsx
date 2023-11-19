import { useState } from 'react'
import { BsTrash3 } from "react-icons/bs"
import { FaPencil } from "react-icons/fa6"
import Modal from 'react-bootstrap/Modal';
import axiosConfig from '../api/axiosConfig'

export const RowMovement = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [date, setDate] = useState(props.date);
  const [typeAmount, setTypeAmount] = useState(props.typeAmount);
  const [amount, setAmount] = useState(props.mount);
  const [category, setCategory] = useState(props.category);
  const [description, setDescription] = useState(props.description);

  const handleDeleteClick = (e) => {
    e.preventDefault();

    const deleteData = async () => {
      try {
        await axiosConfig.delete(`/delete/${props.id}`);
      } catch (err) {
        console.log(err);
      }
    };

    deleteData().then(() => {
      window.location.reload();
    });

    setShowModalDelete(false);
  };

  const handleUpdateMovement = (e) => {
    e.preventDefault();
    const movimiento = {
      date,
      typeAmount,
      amount,
      category,
      description
    };

    const putData = async (movimiento) => {
      try {
        await axiosConfig.put(`/update/${props.id}`, movimiento);
      } catch (err) {
        console.log(err);
      }
    };

    putData(movimiento).then(() => {
      window.location.reload();
    });

    setShowModal(false);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    setShowModalDelete(true);
  }

  const handleCloseDelete = () => {
    setShowModalDelete(false);
  }

  const handleEditClick = (e) => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    let year = date.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  return (
    <>
      <td className="px-4 py-2">{props.date}</td>
      <td className="px-4 py-2">{props.typeMount}</td>
      <td className="px-4 py-2">$ {props.mount}</td>
      <td className="px-4 py-2">{props.category}</td>
      <td className="px-4 py-2">{props.description}</td>
      <td className="px-4 py-2">
        <button className="text-red-400 px-3" onClick={(e) => handleDelete(e)}><BsTrash3 /></button>
        <button className="text-teal-500" onClick={(e) => handleEditClick(e)}><FaPencil /></button>
      </td>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="text-xl font-bold">Editar Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-base">
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleUpdateMovement}
          >
            <input
              type="date"
              name="date"
              value={formatDate(date)}
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              onChange={e => setDate(e.target.value)}
            />
            <select
              name="typeAmount"
              value={typeAmount}
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
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
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              onChange={e => setAmount(e.target.value)}
            />
            <select
              name="category"
              value={category}
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Categoría</option>x
              <option value="Pago Nomina">Pago Nomina</option>
              <option value="Transporte">Transporte</option>
              <option value="Comida">Comida</option>
              <option value="Cuota Mensual Padres">Cuota Mensual Padres</option>
              <option value="Ahorro Confiar">Ahorro Confiar</option>
              <option value="Otro">Otro</option>
            </select>
            <textarea
              name="description"
              placeholder='Descripción'
              value={description}
              className="border-2 border-gray-400 rounded-md p-2 m-2 w-80"
              onChange={e => setDescription(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Realizar Cambios
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <Modal show={showModalDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-xl font-bold">Editar Movimiento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-base">
          <form onSubmit={(e) => handleDeleteClick(e)}>
            <p className='pb-3'>Estas seguro que lo quieres eliminar?</p>
            <div className='flex justify-center gap-11'>
              <button className='btn bg-red-600 text-white hover:bg-black' type='submit'>Eliminar</button>
              <button className='btn bg-teal-600 text-white hover:bg-black' type='button' onClick={(e) => handleCloseDelete(e)}>Cerrar</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
