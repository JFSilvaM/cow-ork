import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import useFetch from "../hooks/useFetch";
import SelectorIcon from "./icons/SelectorIcon";
import Input from "./Input";
import Spinner from "./Spinner";
import Typography from "./Typography";

export default function ReportForm({ spaceId }) {
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { data: categories, loading, error } = useFetch("/report_categories");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        space_id: spaceId,
        description,
        category_id: categoryId,
      };
      const data = await fetchEndpoint("/reports", token, "POST", body);

      if (data.error) {
        throw new Error(data.error);
      }

      setSuccessMessage(data);
      setErrorMessage("");
      setDescription("");
      setCategoryId("");
    } catch (error) {
      setErrorMessage(error.message);
    }
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
    <article className="w-full">
      <form
        className="flex w-full flex-col items-center gap-5 px-5"
        onSubmit={handleSubmit}
      >
        <Input
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          placeholder="Información del reporte"
          className="h-20 w-full rounded-md border p-2"
        />

        <Listbox as="div" className="w-full" onChange={setCategoryId}>
          <Listbox.Button className="flex w-full cursor-pointer justify-between rounded-lg border py-2 px-3 shadow focus:outline-none">
            <Typography as="span" className="truncate">
              {categoryId
                ? categories.find((category) => category.id === categoryId).name
                : "Selecciona la categoría"}
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
              {categories &&
                categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    className={({ active }) =>
                      `cursor-pointer py-2 px-3 pr-4 ${
                        active && "bg-gray-200 dark:bg-gray-500"
                      }`
                    }
                    value={category.id}
                  >
                    <Typography>{category.name}</Typography>
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </Listbox>

        {successMessage && (
          <div className="mt-2 flex justify-center">
            <Alert color="success" icon="success">
              {successMessage.message}
            </Alert>
          </div>
        )}

        {errorMessage && (
          <div className="mt-2 flex justify-center">
            <Alert color="error" icon="error">
              {errorMessage}
            </Alert>
          </div>
        )}

        <Button size="sm" shape="rounded" className="self-start">
          Reportar
        </Button>
      </form>
    </article>
  );
}
