import StarIcon from "./icons/StarIcon";

export default function StarRating({ rating, setRating }) {
  return (
    <div className="space-x-2">
      {[...Array(5)].map((_, i) => (
        <button key={i} onClick={() => setRating(i + 1)}>
          <StarIcon
            className={`${
              i < rating ? "fill-yellow-400" : "fill-yellow-100"
            } h-8 w-8 stroke-black`}
          />
        </button>
      ))}
    </div>
  );
}
