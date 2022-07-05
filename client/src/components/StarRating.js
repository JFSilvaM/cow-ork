import StarIcon from "./icons/StarIcon";

export default function StarRating({ rating }) {
  return (
    <div className="cursor-pointer space-x-2">
      {[...Array(5)].map((_, i) => (
        <button key={i} className="focus:outline-none">
          <StarIcon
            className={`${
              i < rating ? "fill-yellow-400" : "fill-yellow-100"
            } h-7 w-7 stroke-black`}
          />
        </button>
      ))}
    </div>
  );
}
