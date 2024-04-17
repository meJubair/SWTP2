interface CalendarData {
  title: string;
  authorName: string;
  userId: string;
  startDate: string;
  endDate: string;
  published: boolean;
  tags: string[];
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
