import Input from "./Input";

export default function SearchBox({ search, setSearch }) {
  return (
    <section className="flex w-full flex-col">
      <Input
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </section>
  );
}
