import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router-dom";
import Switch from "../components/Switch";

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
        image,
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
    <article>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
        />

        <Input
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Input
          id="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
        />

        <Input
          id="capacity"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          type="number"
        />

        <div className="flex space-x-2">
          {services &&
            services.map((service) => (
              <label key={service.id} className="flex flex-wrap">
                <Input
                  type="checkbox"
                  name="services"
                  value={service.id}
                  onChange={handleServiceChange}
                  checked={serviceIds.includes(service.id)}
                />
                <span className="ml-2">{service.name}</span>
              </label>
            ))}
        </div>

        <select
          onChange={(e) => setSpaceTypeId(e.target.value)}
          value={spaceTypeId}
        >
          <option value="">Selecciona el tipo de espacio</option>
          {spaceTypes.map((spaceType) => (
            <option key={spaceType.id} value={spaceType.id}>
              {spaceType.name}
            </option>
          ))}
        </select>

        <Switch
          id="is_clean"
          name="is_clean"
          checked={isClean}
          onChange={(e) => setIsClean(e.target.checked)}
        />

        <Input
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="file"
        />

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
