import { Fragment, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Switch from "../components/Switch";
import Typography from "../components/Typography";
import { Listbox, Transition } from "@headlessui/react";
import SelectorIcon from "../components/icons/SelectorIcon";

export default function SpaceEditPage() {
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
  const [isClean, setIsClean] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEndpoint(`/spaces/${id}`, token);

        if (data.status === "error") {
          throw new Error(data.message);
        }

        setName(data.name);
        setDescription(data.description);
        setAddress(data.address);
        setPrice(data.price);
        setCapacity(data.capacity);
        setSpaceTypeId(data.type_id);
        setServiceIds(data.service_ids);
        setIsClean(Boolean(data.is_clean));
        setImage(data.image);
      } catch (error) {
        setErrorMessage(error);
      }
    };

    fetchData();
  }, [id, token, services]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        name,
        description,
        address,
        price,
        capacity,
        image: image || "default.png",
        type_id: spaceTypeId,
        services: serviceIds,
        is_clean: isClean ? 1 : 0,
      };

      const data = await fetchEndpoint(`/spaces/${id}`, token, "PUT", body);

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const handleServiceChange = (e) => {
    const { checked, value } = e.target;

    setServiceIds((sIds) =>
      checked ? [...sIds, +value] : sIds.filter((id) => id !== +value)
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
    <article className="flex w-full justify-center dark:text-slate-800">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-5 lg:w-3/4"
      >
        <Typography as="h4" size="xxxl" weight="bold" align="center">
          Editar espacio
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
            />
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

          <div className="w-full self-center md:w-3/4">
            <img src={`/images/spaces/${image}`} alt="Espacio" />
          </div>

          <div className="flex flex-col gap-2">
            <Typography as="span" size="xl">
              Imagen:
            </Typography>

            <Input
              id="image"
              name="image"
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
                      checked={serviceIds.includes(service.id)}
                    />

                    <Typography as="span">{service.name}</Typography>
                  </label>
                ))}
            </div>
          </div>

          <Listbox as="div" value={spaceTypeId} onChange={setSpaceTypeId}>
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
        </div>

        <Button size="sm" shape="rounded">
          Editar espacio
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
