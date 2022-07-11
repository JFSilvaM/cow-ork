import { Fragment, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import Alert from "./Alert";
import Button from "./Button";
import StarIcon from "./icons/StarIcon";

export default function StarRating({ spaceId, withHover }) {
  const [rating, setRating] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    try {
      const body = {
        space_id: id,
        rating,
      };

      const data = await fetchEndpoint(
        `/space_ratings/${id}`,
        token,
        "PUT",
        body
      );

      if (data?.status === "error") {
        throw new Error(data.message);
      }

      if (data?.status === "ok") {
        setSuccessMessage(data);
      }
    } catch (error) {
      setSuccessMessage("");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, spaceId)}
      className="flex flex-col items-center gap-2 rounded p-3"
    >
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Fragment key={i}>
            <label htmlFor={`rating-${spaceId}-${i}`}>
              {withHover ? (
                <StarIcon
                  className={`${
                    i < rating ? "fill-yellow-400" : "fill-yellow-100"
                  } h-7 w-7 cursor-pointer stroke-black hover:scale-110`}
                />
              ) : (
                <StarIcon
                  className={`${
                    i < rating ? "fill-yellow-400" : "fill-yellow-100"
                  } h-7 w-7 cursor-pointer stroke-black`}
                />
              )}
            </label>
            <input
              id={`rating-${spaceId}-${i}`}
              type="radio"
              name="rating"
              className="hidden"
              value={i + 1}
              onClick={(e) => setRating(e.target.value)}
            />
          </Fragment>
        ))}
      </div>

      {successMessage && (
        <div className="mt-2 flex justify-center">
          <Alert color="success" icon="success">
            {successMessage.message}
          </Alert>
        </div>
      )}

      <div>
        <Button shape="rounded" size="sm">
          Valorar
        </Button>
      </div>
    </form>
  );
}
