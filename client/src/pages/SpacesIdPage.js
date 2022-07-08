import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTools from "../components/AdminTools";
import Alert from "../components/Alert";
import BookingForm from "../components/BookingForm";
import Chip from "../components/Chip";
import CheckIcon from "../components/icons/CheckIcon";
import ErrorIcon from "../components/icons/ErrorIcon";
import MapIcon from "../components/icons/MapIcon";
import UserGroupIcon from "../components/icons/UserGroupIcon";
import Modal from "../components/Modal";
import ReportForm from "../components/ReportForm";
import Spinner from "../components/Spinner";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import decodeToken from "../helpers/decodeToken";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function SpacesIdPage() {
  const { id } = useParams("id");
  const { data: space, loading, error } = useFetch(`/spaces/${id}`);
  const { token } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const admin = token && decodeToken(token).is_admin;
  const navigate = useNavigate();

  useEffect(() => {
    if (space) {
      setSelectedItem(space);
    }
  }, [space]);

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchEndpoint(`/spaces/${id}`, token, "DELETE");

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert color="error" icon="error">
        Error: {error.message}
      </Alert>
    );
  }

  return (
    <section className="flex w-full flex-col items-center px-2 xl:px-0">
      <article className="flex w-full flex-col gap-5 dark:text-slate-200 xl:w-3/4">
        <div className="flex flex-col gap-2">
          <img
            className="rounded-2xl object-cover"
            src={`/images/spaces/${space.image}`}
            alt={space.name}
          />
        </div>

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedItem={selectedItem.name}
          onClick={(e) => handleDelete(e, selectedItem.id)}
        />

        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-3 py-2">
            {admin ? (
              <AdminTools
                handleDelete={() => setIsOpen(true)}
                handleEdit={() => navigate(`/spaces/${id}/edit`)}
              />
            ) : null}

            <div className="flex flex-col">
              <Typography as="h3" size="xxl">
                {space.name}
              </Typography>

              <Typography weight="bold">{space.type_name}</Typography>

              <Typography size="sm" className="truncate italic text-slate-500">
                {space.description}
              </Typography>

              <Typography as="h4" className="mb-2" size="lg">
                {space.price}€ / día
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <span title="Localización">
                <MapIcon />
              </span>

              <Typography>{space.address}</Typography>
            </div>

            <div className="flex items-center gap-2">
              <span title="Capacidad">
                <UserGroupIcon />
              </span>

              <Typography>{space.capacity}</Typography>
            </div>

            <div className="flex gap-2">
              <Typography>Estado de limpieza:</Typography>

              {space.is_clean === 1 ? (
                <CheckIcon color="green">
                  <Typography weight="bold">Limpio</Typography>
                </CheckIcon>
              ) : (
                <ErrorIcon color="orange">
                  <Typography weight="bold">Pendiente de limpieza</Typography>
                </ErrorIcon>
              )}
            </div>

            <div className="flex flex-col">
              <Typography as="h4" className="mb-2" size="lg">
                Servicios
              </Typography>

              <div className="flex flex-row flex-wrap gap-2">
                {space.service_names.map((service) => (
                  <Chip key={service}>{service}</Chip>
                ))}
              </div>
            </div>
          </div>

          {token && (
            <aside className="flex h-full flex-col gap-3">
              <div className="flex flex-col rounded-2xl py-5 shadow dark:bg-gray-500">
                <Typography
                  as="h4"
                  className="px-5 pb-5"
                  align="left"
                  size="xl"
                >
                  Fecha de reserva
                </Typography>

                <BookingForm spaceId={id} price={space.price} />
              </div>

              <div className="flex flex-col items-center rounded-2xl py-5 text-slate-800 shadow dark:bg-gray-500">
                <Typography as="h4" className="pb-5" size="xl">
                  Reporte de incidencias
                </Typography>

                <ReportForm spaceId={id} />
              </div>
            </aside>
          )}
        </div>

        {errorMessage && (
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        )}
      </article>
    </section>
  );
}
