import StarRating from "./StarRating";
import Typography from "./Typography";

export default function Card({ space }) {
  return (
    <article className="flex flex-col rounded-lg shadow">
      <header className="h-96">
        <img
          src={space.image}
          alt={space.name}
          className="h-96 w-full rounded-t-lg bg-cover bg-center bg-no-repeat object-cover"
        />
      </header>

      <div className="flex flex-col rounded-b-lg bg-white py-2 px-4 dark:bg-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Typography as="h4" size="xxl">
              {space.name}
            </Typography>
            <Typography className="text-slate-400">{space.address}</Typography>
          </div>

          <Typography size="xl">{space.price}€</Typography>
        </div>

        <footer>
          <StarRating rating={space.rating} />
        </footer>
      </div>
    </article>
  );
}
