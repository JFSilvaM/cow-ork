import { Fragment } from "react";
import StarIcon from "./icons/StarIcon";

export default function ShowStarRating({ rating }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Fragment key={i}>
          <StarIcon
            className={`${
              i < rating ? "fill-yellow-400" : "fill-yellow-100"
            } h-7 w-7 stroke-black`}
          />
        </Fragment>
      ))}
    </div>
  );
}
