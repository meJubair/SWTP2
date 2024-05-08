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

interface DoorData {
  doorNumber: number;
  title: DoorDataTextConfig;
  subtitle: DoorDataTextConfig;
  description: DoorDataTextConfig;
  doorBackgroundColour: string;
  doorBackgroundGradient: string;
  youtubeVideoId: string;
  backgroundImageFileDownloadUrl: string;
  videoFileDownloadUrl: string;
}

interface DoorDataTextConfig {
  textContent: string;
  fontSize: number;
  colour: string;
  backgroundColor: string;
  fontWeight: string;
  fontFamily: string;
}

export { CalendarData, DoorData };
