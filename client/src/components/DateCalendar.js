import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getYear,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";

import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

export default function DateCalendar({
  selectedDate,
  setSelectedDate,
  setIsCalendarOpen,
}) {
  const [date, setDate] = useState(selectedDate);

  const dayNames = ["L", "M", "X", "J", "V", "S", "D"];

  const handleDayChange = (date) => {
    setSelectedDate(new Date(date));
    setIsCalendarOpen(false);
  };

  const handleMonthChange = (date) => {
    setDate(date);
  };

  return (
    <div className="absolute z-10 mt-2 w-full">
      <div className="flex flex-col items-center justify-center rounded-t bg-indigo-600 py-2 dark:bg-emerald-600">
        <div className="mb-2 flex w-full items-center justify-between border-b border-indigo-200 px-2 pb-2 text-gray-200 dark:border-emerald-200">
          <span
            className="rounded-full p-1"
            onClick={() => handleMonthChange(subMonths(date, 1))}
            role="button"
          >
            <ChevronLeftIcon />
          </span>

          <div>
            <p className="text-center font-bold">
              {`${format(date, "MMMM", {
                locale: es,
              }).toUpperCase()} ${getYear(date)}`}
            </p>
          </div>

          <span
            className="rounded-full p-1"
            onClick={() => handleMonthChange(addMonths(date, 1))}
            role="button"
          >
            <ChevronRightIcon />
          </span>
        </div>

        <div className="grid grid-cols-7 items-center justify-center gap-3 px-2">
          {dayNames.map((day) => (
            <div
              key={day}
              className="h-6 w-6 text-center font-bold text-gray-200"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-b bg-white p-2 shadow">
        {eachWeekOfInterval(
          {
            start: startOfMonth(date),
            end: endOfMonth(date),
          },
          { locale: es }
        ).map((week, i) => (
          <div
            key={i}
            className="grid grid-cols-7 items-center justify-center gap-3 text-sm"
          >
            {eachDayOfInterval({
              start: startOfWeek(week, { locale: es }),
              end: endOfWeek(week, { locale: es }),
            }).map((day, j) => (
              <div
                key={j}
                className={`flex h-6 w-6 cursor-pointer items-center justify-center text-center ${
                  day.getMonth() === selectedDate.getMonth() &&
                  day.getDate() === selectedDate.getDate()
                    ? "rounded-full bg-indigo-600 font-bold text-white dark:bg-emerald-600"
                    : day.getMonth() === date.getMonth()
                    ? "text-black"
                    : "text-gray-400"
                }`}
                aria-label={day}
                onClick={() => handleDayChange(day)}
              >
                {day.getDate()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
