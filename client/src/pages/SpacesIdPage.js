import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTools from "../components/AdminTools";
import Alert from "../components/Alert";
import BookingForm from "../components/BookingForm";
import Chip from "../components/Chip";
import CheckIcon from "../components/icons/CheckIcon";
import ErrorIcon from "../components/icons/ErrorIcon";
import MapIcon from "../components/icons/MapIcon";
import MoneyIcon from "../components/icons/MoneyIcon";
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
        <img
          className="rounded object-cover"
          src={`/images/spaces/${space.image}`}
          alt={space.name}
        />

        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onClick={(e) => handleDelete(e, selectedItem.id)}
        >
          ¿Realmente deseas borrar el espacio{" "}
          <span className="font-semibold italic">{selectedItem.name}</span>?
        </Modal>

        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex w-full flex-col gap-3 p-2 md:w-1/2">
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <div>
                  <Typography as="h3" size="xxxl">
                    {space.name}
                  </Typography>

                  <div className="flex items-center gap-2">
                    <span title="Localización">
                      <MapIcon />
                    </span>

                    <Typography className="italic">{space.address}</Typography>
                  </div>

                  <div className="flex items-center gap-2">
                    <span title="Capacidad">
                      <UserGroupIcon />
                    </span>

                    <Typography className="italic">{space.capacity}</Typography>
                  </div>

                  <div className="flex items-center gap-2">
                    <span title="Precio">
                      <MoneyIcon />
                    </span>

                    <Typography className="italic">
                      {space.price}€ / día
                    </Typography>
                  </div>
                </div>

                {admin ? (
                  <aside>
                    <AdminTools
                      handleDelete={() => setIsOpen(true)}
                      handleEdit={() => navigate(`/spaces/${id}/edit`)}
                    />
                  </aside>
                ) : null}
              </div>

              <div>
                <Typography weight="bold">{space.type_name}</Typography>
                <Typography size="sm">{space.description}</Typography>
              </div>
            </div>

            <div>
              <Typography as="h3" size="xxl" className="mb-2">
                Estado
              </Typography>

              {space.is_clean ? (
                <div className="flex gap-2">
                  <CheckIcon color="green" />
                  <Typography>Limpio</Typography>
                </div>
              ) : (
                <div className="flex gap-2">
                  <ErrorIcon color="orange" />
                  <Typography>Pendiente de limpieza</Typography>
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <Typography as="h3" size="xxl" className="mb-2">
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
            <aside className="flex w-full flex-col gap-3 px-2 md:w-1/2">
              <div className="flex flex-col rounded-2xl py-5 shadow">
                <Typography
                  as="h4"
                  className="px-5 pb-5"
                  align="center"
                  size="xl"
                >
                  Fecha de reserva
                </Typography>

                <BookingForm spaceId={id} price={space.price} />
              </div>

              <div className="flex flex-col items-center rounded-2xl py-5 shadow">
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
