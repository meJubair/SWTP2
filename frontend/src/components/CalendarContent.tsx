import React, { useState } from 'react';
import { Paper, Typography, Grid, IconButton, Modal, Box, Button, TextField } from '@mui/material';
import { InsertDriveFile as TextIcon, Image as ImageIcon, VideoLibrary as VideoIcon } from '@mui/icons-material';

interface CalendarContentProps {
  startDate: Date | null;
  endDate: Date | null;
  calendarData: Date[];
}

interface DoorContent {
  date: Date | null;
  textContent: string;
  imageContent: string;
  videoContent: string;
  [key: string]: string | Date | null;
}

const CalendarContent: React.FC<CalendarContentProps> = ({ startDate, endDate }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeModal, setActiveModal] = useState<'text' | 'image' | 'video' | null>(null);
  const [modalContent, setModalContent] = useState<string>('');
  const [doorContent, setDoorContent] = useState<DoorContent[]>([]);

  const openModal = (modalType: 'text' | 'image' | 'video', date: Date) => {
    setSelectedDate(date);
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalContent('');
  };

  const handleContentChange = (content: string) => {
    setModalContent(content);
  };

  const handleSubmit = () => {
    if (!selectedDate) return;

    // Update day content for the selected date
    const updatedDoorContent = [...doorContent];
    const index = updatedDoorContent.findIndex(door => door.date?.getTime() === selectedDate.getTime());

    if (index !== -1) {
      // If content exists for the selected date, update it
      updatedDoorContent[index] = {
        ...updatedDoorContent[index],
        [activeModal + 'Content']: modalContent
      };
    } else {
      // If no content exists for the selected date, create a new entry
      updatedDoorContent.push({
        date: selectedDate,
        textContent: '',
        imageContent: '',
        videoContent: ''
      });
      updatedDoorContent[updatedDoorContent.length - 1][activeModal + 'Content'] = modalContent;
    }

    setDoorContent(updatedDoorContent);
    closeModal();
  };

  const handleSubmitAll = () => {
    console.log('All calendar data:', doorContent);
  };

  const renderModal = () => {
    const modalTitle = `Upload ${activeModal === 'text' ? 'Text' : activeModal === 'image' ? 'Image' : 'Video'} Content for ${selectedDate?.toLocaleDateString()}`;

    return (
      <Modal open={activeModal !== null} onClose={closeModal}>
        <Box onMouseDown={(e) => e.stopPropagation()} sx={{ width: '300px', height: '300px', backgroundColor: 'white', padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <Typography variant="h5" gutterBottom>
            {modalTitle}
          </Typography>
          {activeModal === 'text' && (
            <TextField label="Text Content" fullWidth value={modalContent} onChange={(e) => handleContentChange(e.target.value)} />
          )}
          {activeModal === 'image' && (
            <>
              <Button variant="contained" component="label">
                Upload Image
                <input type="file" style={{ display: 'none' }} onChange={(e) => handleContentChange(e.target.files?.[0]?.name || '')} />
              </Button>
              <TextField label="or Paste Image URL" fullWidth value={modalContent} onChange={(e) => handleContentChange(e.target.value)} />
            </>
          )}
          {activeModal === 'video' && (
            <>
              <Button variant="contained" component="label">
                Upload Video
                <input type="file" style={{ display: 'none' }} onChange={(e) => handleContentChange(e.target.files?.[0]?.name || '')} />
              </Button>
              <TextField label="or Paste Video URL" fullWidth value={modalContent} onChange={(e) => handleContentChange(e.target.value)} />
            </>
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    );
  };

  const renderCalendarGrid = () => {
    if (!startDate || !endDate) return null;

    const numDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    return Array.from({ length: numDays }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);

      return (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper elevation={3} style={{ padding: '38px', position: 'relative' }}>
            <Typography variant="h6" gutterBottom>
              {currentDate.toLocaleDateString()}
            </Typography>
            <IconButton onClick={() => openModal('text', currentDate)} style={{ position: 'absolute', top: '8px', right: '8px' }}>
              <TextIcon />
            </IconButton>
            <IconButton onClick={() => openModal('image', currentDate)} style={{ position: 'absolute', top: '40px', right: '8px' }}>
              <ImageIcon />
            </IconButton>
            <IconButton onClick={() => openModal('video', currentDate)} style={{ position: 'absolute', top: '72px', right: '8px' }}>
              <VideoIcon />
            </IconButton>
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Calendar Content
      </Typography>
      <Grid container spacing={3}>
        {renderCalendarGrid()}
      </Grid>
      {renderModal()}
      <Button variant="contained" color="primary" onClick={handleSubmitAll}>
        Submit All Calendar Data
      </Button>
    </div>
  );
};

export default CalendarContent;
 
