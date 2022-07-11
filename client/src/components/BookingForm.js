import { format, parse, differenceInDays } from "date-fns";
import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import { useAuth } from "../contexts/AuthContext";
import fetchEndpoint from "../helpers/fetchEndpoint";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Typography from "./Typography";
import Spinner from "./Spinner";

export default function BookingForm({ spaceId, price }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const { token } = useAuth();

  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    if (startDate && endDate) {
      const startDateParsed = parse(startDate, "dd-MM-yyyy", new Date());
      const endDateParsed = parse(endDate, "dd-MM-yyyy", new Date());
      const daysDifference = differenceInDays(endDateParsed, startDateParsed);

      setAmount(Math.round(daysDifference * price * 100));
    }
  }, [startDate, endDate, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    try {
      if (!stripe || !elements) {
        return;
      }

      const startDateParsed = parse(startDate, "dd-MM-yyyy", new Date());
      const endDateParsed = parse(endDate, "dd-MM-yyyy", new Date());

      const body = {
        space_id: spaceId,
        start_date: format(startDateParsed, "yyyy-MM-dd"),
        end_date: format(endDateParsed, "yyyy-MM-dd"),
        amount,
      };

      const paymentIntent = await fetch(
        `${process.env.REACT_APP_SERVER_API}/bookings/payment_intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      ).then((res) => res.json());

      if (paymentIntent?.status === "error") {
        throw new Error(paymentIntent.message);
      }

      const result = await stripe.confirmCardPayment(
        paymentIntent.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result?.error) {
        throw new Error(result.error.message);
      }

      const data = await fetchEndpoint("/bookings", token, "POST", body);

      if (data.status === "ok") {
        setErrorMessage("");
        setSuccessMessage(data);
      }
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <article className="flex w-full">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center gap-5"
      >
        <div className="flex flex-col gap-5 px-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-10">
            <DatePicker
              id="start_date"
              name="start_date"
              value={startDate}
              setSelectedDate={setStartDate}
            />

            <DatePicker
              id="end_date"
              name="end_date"
              value={endDate}
              setSelectedDate={setEndDate}
            />
          </div>

          <CardElement className="rounded bg-gray-200 p-2" />

          <Typography className="flex items-center gap-2 self-end">
            Total:{" "}
            <span className="font-bold">
              {amount > 0 ? (amount / 100).toFixed(2) : price}€
            </span>
          </Typography>
        </div>

        {successMessage && (
          <div className="mt-2 flex justify-center">
            <Alert color="success" icon="success">
              {successMessage.message}
            </Alert>
          </div>
        )}

        {errorMessage && (
          <div className="mt-2 flex justify-center">
            <Alert color="error" icon="error">
              {errorMessage.message}
            </Alert>
          </div>
        )}

        <div className="">
          <Button
            size="sm"
            shape="rounded"
            disabled={!stripe || !elements || processing}
          >
            {processing ? (
              <span className="flex items-center justify-center space-x-2">
                <Spinner size="xs" /> <p>Procesando...</p>
              </span>
            ) : (
              <p>Reservar</p>
            )}
          </Button>
        </div>
      </form>
    </article>
  );
}
