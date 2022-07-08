import Button from "./Button";
import DeleteIcon from "./icons/DeleteIcon";
import EditIcon from "./icons/EditIcon";

export default function AdminTools({ handleDelete, handleEdit }) {
  return (
    <aside className="flex space-x-2">
      {handleEdit && (
        <Button
          variant="flat"
          size="xs"
          shape="rounded"
          title="Editar"
          onClick={handleEdit}
        >
          <EditIcon />
        </Button>
      )}

      {handleDelete && (
        <Button
          variant="flat"
          color="error"
          size="xs"
          shape="rounded"
          title="Borrar"
          onClick={handleDelete}
        >
          <DeleteIcon />
        </Button>
      )}
    </aside>
  );
}
