import React, { useState } from "react";
import { getDaysInMonth, isToday } from "../utils/dateUtils";
import { week } from "@/Constant";
import { CalendarProps } from "@/types";

const Calendar: React.FC<CalendarProps> = ({ onSelectDay, events }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);


  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  
  const days = getDaysInMonth(currentYear, currentMonth);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Function to navigate to the previous month
  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(currentMonth - 1);
    setCurrentDate(prevMonth);
  };

  // Function to navigate to the next month
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(currentMonth + 1);
    setCurrentDate(nextMonth);
  };

  return (
    <div className="calendar">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePreviousMonth}
          className="p-2 bg-gray-200 rounded-lg"
        >
          Previous
        </button>
        <span className="text-xl font-bold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-2 bg-gray-200 rounded-lg"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 border p-4 rounded-lg bg-white">
        {week.map((day) => (
          <div key={day} className="text-center font-bold text-gray-700">
            {day}
          </div>
        ))}
        {days.map((date) => {
          const isCurrentDate = isToday(date);
          const hasEvent = events[formatDate(date)];

          return (
            <div
              key={date.toISOString()}
              className={`p-4 text-center rounded-md cursor-pointer ${
                isCurrentDate
                  ? "bg-green-500 text-white"
                  : hasEvent
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              } hover:ring-2 hover:ring-gray-400`}
              onClick={() => {
                console.log("d-review ", date);
                console.log("t-review ", today);
                // if i am compairing date only it's not allowed me to add event because today is smaller than date because date's time is set to 00:00 so we also set time for today to 00:00
                const normalizedDate = new Date(date.setHours(0, 0, 0, 0));
                const normalizedToday = new Date(today.setHours(0, 0, 0, 0));
                // console.log("nd-review ", normalizedDate);
                // console.log("nt-review ", normalizedToday);
                // Compare dates only, ignoring time
                if (normalizedDate < normalizedToday) {
                  alert("You cannot add events in the past");
                  return;
                }
                onSelectDay(formatDate(date));
              }}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
