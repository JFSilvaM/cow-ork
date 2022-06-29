import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function AdminTools({ data }) {
  const handleEdit = (e) => {};

  const handleDelete = (e) => {};

  return (
    <section className="flex space-x-2">
      <button title="Editar" onClick={(e) => handleEdit(e)}>
        <EditIcon />
      </button>
      <button title="Borrar" onClick={(e) => handleDelete(e)}>
        <DeleteIcon />
      </button>
    </section>
  );
}
