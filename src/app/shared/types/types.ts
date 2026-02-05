export interface DayInfo {
  id: number;
  dayName: string;
  date: number;
  isSelected: boolean;
}

export interface TimeSlot {
  id: number;
  time: string;
  isAvailable: boolean;
}
