import { useState } from "react";

export default function LoginPage() {
  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(fields);
  };

  return (
    <section className="flex justify-center">
      <form
        className="flex flex-col items-center gap-3 rounded-lg border-2 p-5"
        onSubmit={handleSubmit}
      >
        <label>
          E-mail:
          <input
            type="text"
            name="email"
            value={fields.email}
            onChange={handleChange}
            className="mx-3 rounded px-1 ring-2"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={fields.password}
            onChange={handleChange}
            className="mx-3 rounded px-1 ring-2"
          />
        </label>

        <button
          type="submit"
          className="w-fit cursor-pointer rounded border-2 border-indigo-400 px-3"
        >
          Ingresar
        </button>
      </form>
    </section>
  );
}
