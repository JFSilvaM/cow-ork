import { Fragment } from "react";
import StarIcon from "./icons/StarIcon";

export default function StarRating({ rating, setRating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Fragment key={i}>
          <label htmlFor={`rating-${i}`}>
            <StarIcon
              className={`${
                i < rating ? "fill-yellow-400" : "fill-yellow-100"
              } h-7 w-7 cursor-pointer stroke-black`}
            />
          </label>
          <input
            id={`rating-${i}`}
            type="radio"
            name="rating"
            className="hidden"
            value={i + 1}
            onClick={(e) => setRating(e.target.value)}
          />
        </Fragment>
      ))}
    </div>
  );
}
