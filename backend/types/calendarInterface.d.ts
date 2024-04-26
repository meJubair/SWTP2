interface CalendarData {
  calendarId: string;
  title: string;
  authorName: string;
  startDate: string;
  endDate: string;
  published: boolean;
  tags: string[];
  backgroundUrl: string;
  backgroundColour: string;
  calendarDoors: DoorData[];
}

interface DoorData {
  doorNumber: number;
  textContent: string;
  youtubeVideoId: string;
  imageFileUrl: string;
  videFileUrl: string;
}

export { CalendarData, DoorData };
