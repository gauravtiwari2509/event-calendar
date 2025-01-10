import React, { useState } from "react";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import { useEvents } from "./hooks/useEvents";

const App: React.FC = () => {
  const { events, addEvent, deleteEvent } = useEvents();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const eventsByDate = events.reduce((acc, event) => {
    acc[event.date] = true;
    return acc;
  }, {} as { [date: string]: boolean });

  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Event Calendar</h1>
      <Calendar
        onSelectDay={(date) => setSelectedDate(date)}
        events={eventsByDate}
      />
      {selectedDate && (
        <EventModal
          isOpen={!!selectedDate}
          date={selectedDate}
          events={eventsForSelectedDate}
          onClose={() => setSelectedDate(null)}
          onSave={addEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
};

export default App;