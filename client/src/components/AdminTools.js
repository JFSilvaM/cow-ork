import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import Typography from "./Typography";

export default function AdminTools({ value, handleDelete, handleEdit }) {
  return (
    <li key={value.id} className="flex">
      <Typography>{value.name}</Typography>

      <section className="flex space-x-2">
        <button title="Editar" onClick={handleEdit}>
          <EditIcon />
        </button>
        <button title="Borrar" onClick={handleDelete}>
          <DeleteIcon />
        </button>
      </section>
    </li>
  );
}
