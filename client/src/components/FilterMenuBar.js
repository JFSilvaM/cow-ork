import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import fetchEndpoint from "../helpers/fetchEndpoint";
import Button from "./Button";
import SelectorIcon from "./icons/SelectorIcon";
import Input from "./Input";
import SearchBox from "./SearchBox";
import Typography from "./Typography";

export default function FilterMenuBar({ setFilteredResults }) {
  const [search, setSearch] = useState("");
  const [address, setAddress] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [spaceTypes, setSpaceTypes] = useState([]);
  const [spaceTypeId, setSpaceTypeId] = useState(0);
  const [services, setServices] = useState([]);
  const [serviceIds, setServiceIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const spaceTypesData = await fetchEndpoint("/space_types");
      const servicesData = await fetchEndpoint("/services");

      setSpaceTypes(spaceTypesData);
      setServices(servicesData);
    };

    fetchData();
  }, []);

  const handleServiceChange = (e) => {
    const { checked, value } = e.target;

    setServiceIds((sIds) =>
      checked ? [...sIds, +value] : sIds.filter((id) => id !== +value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchEndpoint(
        `/spaces?name=${search}&address=${address}&minPrice=${minPrice}&maxPrice=${maxPrice}&type=${
          spaceTypes[spaceTypeId - 1]?.name || ""
        }&services=${serviceIds}`
      );

      if (data.status === "error") {
        throw new Error(data.message);
      }

      setFilteredResults(data);
    } catch (error) {
      console.error(error);
      setFilteredResults([]);
    }
  };

  return (
    <aside>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <section className="w-full sm:w-5/6">
          <Typography as="h3" color="muted" size="lg">
            Nombre del espacio
          </Typography>

          <SearchBox search={search} setSearch={setSearch} />
        </section>

        <section className="w-full sm:w-5/6">
          <Typography as="h3" color="muted" size="lg">
            Localidad
          </Typography>

          <SearchBox search={address} setSearch={setAddress} />
        </section>

        <section className="w-full sm:w-5/6">
          <Typography as="h3" color="muted" size="lg">
            Tipo de espacio
          </Typography>

          <Listbox as="div" value={spaceTypeId} onChange={setSpaceTypeId}>
            <Listbox.Button className="flex w-full cursor-pointer justify-between rounded-lg border py-2 px-3 shadow focus:outline-none">
              <Typography as="span" className="truncate">
                {spaceTypeId
                  ? spaceTypes.find((spaceType) => spaceType.id === spaceTypeId)
                      .name
                  : "Todos"}
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
                <Listbox.Option
                  className={({ active }) =>
                    `cursor-pointer py-2 px-3 pr-4 ${
                      active && "bg-gray-200 dark:bg-gray-500"
                    }`
                  }
                  value=""
                >
                  <Typography>Todos</Typography>
                </Listbox.Option>
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
        </section>

        <section className="w-full sm:w-5/6">
          <Typography as="h3" color="muted" size="lg">
            Equipamiento
          </Typography>

          <div className="flex flex-wrap gap-3">
            {services &&
              services.map((service) => (
                <label key={service.id} className="flex gap-2">
                  <input
                    type="checkbox"
                    name="services"
                    value={service.id}
                    onChange={handleServiceChange}
                  />

                  <Typography as="span">{service.name}</Typography>
                </label>
              ))}
          </div>
        </section>

        <section className="w-full sm:w-5/6">
          <Typography as="h3" color="muted" size="lg">
            Precio
          </Typography>

          <article className="flex justify-between">
            <div className="w-2/5">
              <Input
                type="number"
                className="w-full"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="w-2/5">
              <Input
                type="number"
                className="w-full"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </article>
        </section>

        <section className="w-full sm:w-5/6">
          <Button shape="rounded" size="sm">
            Filtrar
          </Button>
        </section>
      </form>
    </aside>
  );
}
