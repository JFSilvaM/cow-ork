import { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import DateCalendar from "./DateCalendar";

export default function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [spanishDate, setSpanishDate] = useState(format(date, "dd-MM-yyyy"));
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef(null);

  useEffect(() => {
    setSpanishDate(format(date, "dd/MM/yyyy"));

    const handleOutsideClick = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [date, calendarRef]);

  return (
    <div className="relative" ref={calendarRef}>
      <input
        className="cursor-pointer appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 text-center text-gray-600 focus:border-gray-400 focus:bg-white focus:outline-none"
        type="text"
        value={spanishDate}
        onClick={() => setIsCalendarOpen(true)}
        readOnly
      />

      {isCalendarOpen && (
        <DateCalendar
          selectedDate={date}
          setSelectedDate={setDate}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      )}
    </div>
  );
}
