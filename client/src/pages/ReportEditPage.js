import { Fragment, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Alert from "../components/Alert";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Typography from "../components/Typography";
import { Listbox, Transition } from "@headlessui/react";
import SelectorIcon from "../components/icons/SelectorIcon";
import decodeToken from "../helpers/decodeToken";

export default function ReportEditPage() {
  const { id } = useParams();
  const { token } = useAuth();
  const { data: report, loading, error } = useFetch(`/reports/${id}`, token);
  const { data: categories } = useFetch(`/report_categories`, token);
  const [spaceId, setSpaceId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const admin = token && decodeToken(token).is_admin;

  const statuses = {
    OPEN: "Abierto",
    CLOSED: "Cerrado",
    PENDING: "Pendiente",
  };

  useEffect(() => {
    if (report) {
      setDescription(report.description);
      setStatus(report.status);
      setSpaceId(report.space_id);
      setCategoryId(report.category_id);
    }
  }, [report]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
        description,
        status,
        space_id: spaceId,
        category_id: categoryId,
      };

      const data = await fetchEndpoint(`/reports/${id}`, token, "PUT", body);

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      navigate("/reports");
    } catch (error) {
      setErrorMessage(error);
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
    <article className="flex w-full justify-center dark:text-slate-800">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-5 lg:w-3/4"
      >
        <Typography as="h4" size="xxxl" weight="bold" align="center">
          Editar reporte
        </Typography>

        <div className="flex w-full flex-col gap-5">
          <div className="flex flex-col">
            <Typography as="span" size="xl">
              Descripción:
            </Typography>

            <Input
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              multiline
              className="border dark:bg-gray-200"
            />
          </div>

          <Listbox as="div" value={categoryId} onChange={setCategoryId}>
            <Typography as="span" size="xl">
              Categoría del reporte:
            </Typography>

            <Listbox.Button className="flex w-full cursor-pointer justify-between rounded-lg border py-2 px-3 shadow focus:outline-none">
              <Typography as="span" className="truncate">
                {categoryId &&
                  categories &&
                  categories.find((category) => category.id === categoryId)
                    .name}
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

          {admin ? (
            <Listbox as="div" value={status} onChange={setStatus}>
              <Typography as="span" size="xl">
                Estado del reporte:
              </Typography>

              <Listbox.Button className="flex w-full cursor-pointer justify-between rounded-lg border py-2 px-3 shadow focus:outline-none">
                <Typography as="span" className="truncate">
                  {statuses[status]}
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
                    value="OPEN"
                  >
                    <Typography>Abierto</Typography>
                  </Listbox.Option>

                  <Listbox.Option
                    className={({ active }) =>
                      `cursor-pointer py-2 px-3 pr-4 ${
                        active && "bg-gray-200 dark:bg-gray-500"
                      }`
                    }
                    value="CLOSED"
                  >
                    <Typography>Cerrado</Typography>
                  </Listbox.Option>

                  <Listbox.Option
                    className={({ active }) =>
                      `cursor-pointer py-2 px-3 pr-4 ${
                        active && "bg-gray-200 dark:bg-gray-500"
                      }`
                    }
                    value="PENDING"
                  >
                    <Typography>Pendiente</Typography>
                  </Listbox.Option>
                </Listbox.Options>
              </Transition>
            </Listbox>
          ) : null}

          <input type="hidden" name="space_id" value={spaceId} />
        </div>

        <Button size="sm" shape="rounded" className="self-start">
          Editar reporte
        </Button>

        {errorMessage && (
          <div className="flex">
            <Alert color="error" icon="error">
              {errorMessage.message}
            </Alert>
          </div>
        )}
      </form>
    </article>
  );
}
