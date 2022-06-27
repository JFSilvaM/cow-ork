export default function LoginPage() {
  return (
    <section className="flex justify-center">
      <form className="flex flex-col items-center gap-3 rounded-lg border-2 p-5">
        <label>
          E-mail:
          <input
            type="text"
            name="email"
            className="mx-3 rounded px-1 ring-2"
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            className="mx-3 rounded px-1 ring-2"
          />
        </label>

        <input
          type="submit"
          value="Submit"
          className="w-fit cursor-pointer rounded border-2 border-indigo-400 px-3"
        />
      </form>
    </section>
  );
}
