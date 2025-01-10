export interface Event {
  id: string;
  name: string;
  description?: string;
  date: string;
  startTime: string;
  endTime: string;
}
export interface CalendarProps {
  onSelectDay: (date: string) => void;
  events: { [date: string]: boolean };
}
export interface EventModalProps {
  isOpen: boolean;
  date: string;
  events: Event[];
  onClose: () => void;
  onSave: (event: Event) => void;
  onDelete: (id: string) => void;
}
