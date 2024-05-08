// Calendar object
interface CalendarData {
  calendarId: string;
  title: string;
  titleColour: string;
  authorName: string;
  authorNameColour: string;
  startDate: string;
  endDate: string;
  published: boolean;
  tags: string[];
  backgroundUrl: string;
  backgroundColour: string;
  calendarDoors: DoorData[];
}

// Calendar door data
interface DoorData {
  doorNumber: number;
  title: DoorDataTextStyles;
  subtitle: DoorDataTextStyles;
  description: DoorDataTextStyles;
  doorBackgroundColour: string;
  doorBackgroundGradient: string;
  youtubeVideoId: string;
  backgroundImageFileDownloadUrl: string;
  videoFileDownloadUrl: string;
}

// Text styles config
interface DoorDataTextStyles {
  textContent: string;
  fontSize: number;
  colour: string;
  backgroundColor: string;
  fontWeight: string;
  fontFamily: string;
}

export { CalendarData, DoorData };
