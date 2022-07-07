import StarRating from "./StarRating";
import Typography from "../components/Typography";
import Chip from "../components/Chip";

export default function Card({ space }) {
  return (
    <article className="h-full rounded shadow transition-all duration-500 ease-in-out hover:bg-slate-100 hover:shadow-none dark:bg-gray-700 dark:text-slate-200 dark:hover:bg-slate-700">
      <div className="overflow-hidden rounded">
        <img
          className="h-72 w-full object-cover sm:h-56"
          src={`/images/spaces/${space.image}`}
          alt={space.name}
        />
      </div>

      <div className="flex flex-col gap-3 p-3">
        <div className="flex flex-row">
          <div className="flex w-full items-center justify-between text-slate-800">
            <Typography as="h4" size="xxl">
              {space.name}
            </Typography>

            <Typography size="xxl">{space.price}€</Typography>
          </div>
        </div>

        <Typography size="sm" className="truncate italic text-slate-500">
          {space.description}
        </Typography>

        <div className="flex">
          <StarRating rating={space.rating} />
        </div>

        <div className="flex flex-row flex-wrap gap-2">
          {space.service_names.map((service) => (
            <Chip key={service}>{service}</Chip>
          ))}
        </div>
      </div>
    </article>
  );
}
