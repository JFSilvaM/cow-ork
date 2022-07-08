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
import ReportForm from "../components/ReportForm";
import Spinner from "../components/Spinner";
import StarRating from "../components/StarRating";
import Typography from "../components/Typography";
import { useAuth } from "../contexts/AuthContext";
import decodeToken from "../helpers/decodeToken";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";

export default function SpacesIdPage() {
  const { id } = useParams("id");
  const { data: space, loading, error } = useFetch(`/spaces/${id}`);
  const { token } = useAuth();
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const admin = decodeToken(token).is_admin;
  const navigate = useNavigate();

  useEffect(() => {
    if (space) {
      setRating(space.rating);
    }
  }, [space]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        return;
      }

      const body = {
        space_id: id,
        rating,
      };

      const data = await fetchEndpoint(
        `/space_ratings/${id}`,
        token,
        "PUT",
        body
      );

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      const spaceRating = await fetchEndpoint(`/space_ratings/${id}`, token);

      if (spaceRating?.status === "error") {
        throw new Error(spaceRating.message);
      }

      setRating(spaceRating.rating);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // TODO: Add a confirmation message before delete

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
          <Typography as="h4" size="xxl">
            {space.name}
          </Typography>

          <img
            className="rounded-2xl object-cover"
            src={`/images/spaces/${space.image}`}
            alt={space.name}
          />
        </div>

        <div className="flex flex-col justify-between gap-5 lg:flex-row">
          <div className="flex w-full flex-col gap-3 py-2">
            {admin ? (
              <AdminTools
                handleDelete={handleDelete}
                handleEdit={() => navigate(`/spaces/${id}/edit`)}
              />
            ) : (
              ""
            )}

            <div>
              <Typography weight="bold">{space.type_name}</Typography>

              <Typography size="sm" className="truncate italic text-slate-500">
                {space.description}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <MapIcon />

              <Typography>{space.address}</Typography>
            </div>

            <div className="flex items-center gap-2">
              <UserGroupIcon />

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

            <div className="flex flex-col gap-2">
              <Typography className="border-b">
                Servicios que se ofrecen
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
              <div className="flex flex-col items-center rounded-2xl py-5 shadow dark:bg-gray-500">
                <Typography className="pb-5" size="xl">
                  Reservar
                </Typography>

                <BookingForm spaceId={id} price={space.price} />
              </div>

              <div className="flex flex-col items-center rounded-2xl py-5 text-slate-800 shadow dark:bg-gray-500">
                <Typography className="pb-5" size="xl">
                  Reportar
                </Typography>

                <ReportForm spaceId={id} />
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center rounded-2xl py-5 px-3 shadow dark:bg-gray-500"
              >
                <Typography className="pb-5" size="xl">
                  Tu opinión nos importa
                </Typography>

                <div className="flex flex-col justify-center gap-3">
                  <StarRating rating={rating} setRating={setRating} />

                  {token && <button className="border">Valorar</button>}

                  {errorMessage && (
                    <Alert color="error" icon="error">
                      {errorMessage.message}
                    </Alert>
                  )}
                </div>
              </form>
            </aside>
          )}
        </div>
      </article>
    </section>
  );
}
