import StarRating from "./StarRating";
import Typography from "../components/Typography";
import Chip from "../components/Chip";

export default function Card({ space }) {
  return (
    <article className="h-full rounded-3xl p-2 shadow-xl transition-all duration-500 ease-in-out hover:bg-gray-800 hover:text-white hover:shadow-none dark:bg-gray-700 dark:text-white dark:hover:bg-white dark:hover:text-black">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <img
            className="h-72 w-full object-cover sm:h-56"
            src={`/images/spaces/${space.image}`}
            alt={space.name}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 flex flex-row">
          <div className="flex h-10 w-full items-center justify-between rounded-t-2xl bg-gray-500 bg-opacity-20 px-2 text-black shadow">
            <Typography>{space.name}</Typography>

            <Typography size="sm" weight="bold">
              {space.price}€
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 py-3">
        <Typography size="sm" className="truncate">
          {space.description}
        </Typography>

        <div className="flex justify-center">
          <StarRating rating={space.rating} />
        </div>

        <div className="flex flex-row flex-wrap justify-center gap-1">
          {space.service_names.map((service) => (
            <Chip color="indigoEmerald" key={service}>
              {service}
            </Chip>
          ))}
        </div>
      </div>
    </article>
  );
}
