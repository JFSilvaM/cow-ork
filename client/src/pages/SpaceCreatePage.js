import { Fragment, useState } from "react";
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
import { Listbox, Transition } from "@headlessui/react";
import SelectorIcon from "../components/icons/SelectorIcon";

export default function SpaceCreatePage() {
  const { data: spaceTypes, loading, error } = useFetch("/space_types");
  const { data: services } = useFetch("/services");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [spaceTypeId, setSpaceTypeId] = useState("");
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
      <div className="flex">
        <Alert color="error" icon="error">
          Error: {error.message}
        </Alert>
      </div>
    );
  }

  return (
    <article className="flex w-full justify-center dark:text-slate-800">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-5 lg:w-3/4"
      >
        <Typography as="h4" size="xxxl" weight="bold" align="center">
          Crear espacio
        </Typography>

        <div className="flex w-full flex-col gap-5">
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

          <Listbox as="div" onChange={setSpaceTypeId}>
            <Typography as="span" size="xl">
              Tipo de espacio:
            </Typography>

            <Listbox.Button className="flex w-full cursor-pointer justify-between rounded-lg border py-2 px-3 shadow focus:outline-none">
              <Typography as="span" className="truncate">
                {spaceTypeId
                  ? spaceTypes.find((spaceType) => spaceType.id === spaceTypeId)
                      .name
                  : "Selecciona el tipo de espacio"}
              </Typography>

              <SelectorIcon />
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="mt-1 w-full rounded-lg border py-1 shadow focus:outline-none">
                {spaceTypes.map((spaceType) => (
                  <Listbox.Option
                    key={spaceType.id}
                    className={({ active }) =>
                      `cursor-pointer py-2 px-3 pr-4 ${
                        active && "bg-gray-200 dark:bg-gray-500"
                      }`
                    }
                    value={spaceType.id}
                  >
                    <Typography>{spaceType.name}</Typography>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>

          <div className="flex flex-col gap-2">
            <Typography as="span" size="xl">
              Imagen:
            </Typography>

            <Input
              id="image"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="file"
              className="dark:text-slate-200"
            />
          </div>

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Servicios:
            </Typography>

            <div className="flex flex-wrap gap-4">
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

          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Estado de limpieza:
            </Typography>

            <Switch
              id="is_clean"
              name="is_clean"
              checked={isClean}
              onChange={(e) => setIsClean(e.target.checked)}
            />
          </div>
        </div>

        {errorMessage && (
          <div className="flex">
            <Alert color="error" icon="error">
              {errorMessage.message}
            </Alert>
          </div>
        )}

        <Button size="sm" shape="rounded" className="self-start">
          Añadir espacio
        </Button>
      </form>
    </article>
  );
}
