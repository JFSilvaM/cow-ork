import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";
import Typography from "../components/Typography";
import Switch from "../components/Switch";
import { useNavigate } from "react-router-dom";

export default function SpaceCreatePage() {
  const { data: spaceTypes, loading, error } = useFetch("/space_types");
  const { data: services } = useFetch("/services");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [spaceTypeId, setSpaceTypeId] = useState(0);
  const [serviceIds, setServiceIds] = useState([]);
  const [image, setImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClean, setIsClean] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name,
        description,
        address,
        price,
        capacity,
        image,
        type_id: spaceTypeId,
        services: serviceIds,
        is_clean: isClean ? 1 : 0,
      };

      const data = await fetchEndpoint("/spaces", token, "POST", body);

      if (data.status === "error") {
        throw new Error(data.message);
      }

      navigate("/");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleServiceChange = (e) => {
    const { checked, value } = e.target;

    setServiceIds((sIds) =>
      checked ? [...sIds, value] : sIds.filter((id) => id !== value)
    );
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
    <article className="flex w-full justify-center px-3 text-slate-800 dark:text-slate-200">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-5 lg:w-3/4"
      >
        <Typography
          as="h4"
          size="xxxl"
          weight="bold"
          className="rounded bg-indigo-500 p-3 text-center text-white dark:bg-emerald-500"
        >
          Crear espacio
        </Typography>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Nombre:
            </Typography>

            <Input
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md bg-gray-200 p-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Descripción:
            </Typography>

            <Input
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              className="rounded-md bg-gray-200 p-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Dirección:
            </Typography>

            <Input
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded-md bg-gray-200 p-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Precio:
            </Typography>

            <Input
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="rounded-md bg-gray-200 p-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
            />
          </div>

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Capacidad:
            </Typography>

            <Input
              id="capacity"
              name="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              type="number"
              className="rounded-md bg-gray-200 p-2 px-3 shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 dark:ring-emerald-500 focus:dark:ring-emerald-500 sm:text-sm"
            />
          </div>

          <Switch
            id="is_clean"
            name="is_clean"
            checked={isClean}
            onChange={(e) => setIsClean(e.target.checked)}
          />

          <div className="flex gap-2">
            <Typography as="span" size="xl">
              Imagen:
            </Typography>

            <Input
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="file"
            />
          </div>

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Servicios:
            </Typography>

            <div className="flex flex-col flex-wrap">
              {services &&
                services.map((service) => (
                  <label key={service.id} className="flex gap-2">
                    <Input
                      type="checkbox"
                      name="services"
                      value={service.id}
                      onChange={handleServiceChange}
                    />

                    <Typography as="span">{service.name}</Typography>
                  </label>
                ))}
            </div>
          </div>

          {/* Hacer lo siguiente, y después más. ¡¡ÁNIMO BRO!! */}

          <select onChange={(e) => setSpaceTypeId(e.target.value)}>
            <option value="">Selecciona el tipo de espacio</option>
            {spaceTypes.map((spaceType) => (
              <option key={spaceType.id} value={spaceType.id}>
                {spaceType.name}
              </option>
            ))}
          </select>
        </div>

        <Button size="sm" shape="rounded">
          Añadir espacio
        </Button>

        {errorMessage && (
          <Alert color="error" icon="error">
            {errorMessage.message}
          </Alert>
        )}
      </form>
    </article>
  );
}
