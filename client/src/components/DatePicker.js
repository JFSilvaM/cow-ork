import { useState, useEffect, useRef } from "react";
import format from "date-fns/format";
import DateCalendar from "./DateCalendar";

export default function DatePicker({
  selectedDate,
  setSelectedDate,
  ...props
}) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedDateRef, setSelectedDateRef] = useState(selectedDate);
  const calendarRef = useRef(null);

  useEffect(() => {
    setSelectedDate(format(date, "dd-MM-yyyy"));

    if (selectedDateRef !== date) {
      setSelectedDateRef(date);
    }

    const handleOutsideClick = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [date, setSelectedDate, selectedDateRef]);

  return (
    <div className="relative w-fit" ref={calendarRef}>
      <input
        className="cursor-pointer appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 text-center text-slate-800 focus:border-gray-400 focus:bg-white focus:outline-none"
        type="text"
        value={selectedDate}
        onClick={() => setIsCalendarOpen(true)}
        readOnly
        {...props}
      />

      {isCalendarOpen && (
        <DateCalendar
          selectedDateRef={selectedDateRef}
          setSelectedDate={setDate}
          setIsCalendarOpen={setIsCalendarOpen}
        />
      )}
    </div>
  );
}
