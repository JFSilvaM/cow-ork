import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";

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
  const { token } = useAuth();

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
      };

      const data = await fetchEndpoint("/spaces", token, "POST", body);

      if (data.status === "error") {
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

        <Input
          id="image"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="file"
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
                />
                <span className="ml-2">{service.name}</span>
              </label>
            ))}
        </div>

        <select onChange={(e) => setSpaceTypeId(e.target.value)}>
          <option value="">Selecciona el tipo de espacio</option>
          {spaceTypes.map((spaceType) => (
            <option key={spaceType.id} value={spaceType.id}>
              {spaceType.name}
            </option>
          ))}
        </select>

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
