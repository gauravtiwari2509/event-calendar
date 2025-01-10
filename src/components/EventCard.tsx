import React from "react";
import { Event } from "@/types";

const EventCard: React.FC<{
  event: Event;
  onDelete: (id: string) => void;
}> = ({ event, onDelete }) => {
  return (
    <li
      key={event.id}
      className="flex justify-between items-center bg-gray-200 p-2 rounded-md"
    >
      <div>
        <p className="font-semibold">{event.name}</p>
        <p className="text-sm text-gray-600">
          {event.startTime} - {event.endTime}
        </p>
        {event.description && (
          <p className="text-sm text-gray-500">{event.description}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(event.id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </li>
  );
};

export default EventCard;
