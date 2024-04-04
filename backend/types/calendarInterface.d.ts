interface Calendar {
  title: string;
  authorName: string;
  userId: string;
  calendarDoors: CalendarDoors[];
}

interface CalendarDoors {
  doorNumber: number;
  textContent: string;
  youtubeVideoId?: string;
  imageFileUrl?: string;
  videoFileUrl?: string;
}

export { Calendar, CalendarDoors };
