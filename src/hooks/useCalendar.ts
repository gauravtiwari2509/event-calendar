import { useState } from "react";
import dayjs from "dayjs";

export const useCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

  const goToPreviousMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));
  const goToNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const daysInMonth = () => {
    const startOfMonth = currentMonth.startOf("month");
    const days = [];
    for (let i = 0; i < currentMonth.daysInMonth(); i++) {
      days.push(startOfMonth.add(i, "day"));
    }
    return days;
  };

  return { currentMonth, daysInMonth, goToPreviousMonth, goToNextMonth };
};
