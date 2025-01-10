import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { EventModalProps } from "../types";
import EventCard from "./EventCard";
const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  date,
  events,
  onClose,
  onSave,
  onDelete,
}) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${startTime}`);

    if (selectedDateTime < now && date === now.toISOString().split("T")[0]) {
      alert("You cannot add events in the past!");
      return;
    }
    if (startTime > endTime) {
      alert("start time is greater than end time!");
      return;
    }

    if (!name || !startTime || !endTime) {
      alert("Please fill all required fields!");
      return;
    }

    onSave({
      id: Date.now().toString(),
      name,
      startTime,
      endTime,
      description,
      date,
    });
    setName("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Events for {date}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* past event which are present */}
          {events.length > 0 ? (
            <div>
              <span className="text-lg font-medium">Scheduled Events:</span>
              <ul className="space-y-2">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} onDelete={onDelete} />
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500">No events for this day.</p>
          )}

          {/*form to add new event*/}
          <span className="text-lg font-medium">Add a New Event:</span>
          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="input"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
          />
        </div>
        <DialogFooter>
          <button onClick={handleSave} className="btn btn-primary">
            Save Event
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;
