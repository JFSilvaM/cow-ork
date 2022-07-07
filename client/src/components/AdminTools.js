import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";
import Typography from "./Typography";

export default function AdminTools({ value, handleDelete, handleEdit }) {
  return (
    <li key={value.id} className="flex items-center gap-3 sm:px-10">
      <Typography>{value.name}</Typography>

      <section className="flex gap-3">
        <button
          title="Editar"
          onClick={handleEdit}
          className="rounded border-2 p-1 shadow focus:outline-none dark:bg-gray-200 dark:shadow-none"
        >
          <EditIcon />
        </button>

        <button
          title="Borrar"
          onClick={handleDelete}
          className="rounded border-2 p-1 shadow focus:outline-none dark:bg-gray-200 dark:shadow-none"
        >
          <DeleteIcon />
        </button>
      </section>
    </li>
  );
}
