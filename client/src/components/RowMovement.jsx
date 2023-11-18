export const RowMovement = (props) => {
  return (
    <>
      <td className="px-4 py-2">{props.date}</td>
      <td className="px-4 py-2">{props.typeMount}</td>
      <td className="px-4 py-2">$ {props.mount}</td>
      <td className="px-4 py-2">{props.category}</td>
      <td className="px-4 py-2">{props.description}</td>
    </>
  )
}
