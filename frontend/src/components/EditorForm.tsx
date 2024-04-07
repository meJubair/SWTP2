import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Container, Box } from '@mui/material';
import DatePicker from 'react-datepicker'; 
import CalendarContent from './CalendarContent';

interface FormData {
  author: string;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
}

const EditorForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    author: '',
    title: '',
    startDate: null,
    endDate: null
  });
  const [calendarData, setCalendarData] = useState<Date[]>([]);
  const [error, setError] = useState<string>('');
 
  const handleChange = (name: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [name]: e.target.value
    });
  };

  const handleDateChange = (date: Date | null, name: keyof FormData) => {
    setFormData({
      ...formData,
      [name]: date
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if start date and end date are valid
    if (!formData.startDate || !formData.endDate || formData.startDate > formData.endDate) {
      setError('Invalid date range');
      return;
    }

    // Calculate the range of dates between the start and end dates
    const dateRange: Date[] = [];
    const currentDate = new Date(formData.startDate);
    while (currentDate <= formData.endDate) {
      dateRange.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Set state to trigger rendering of CalendarContent component
    setCalendarData(dateRange);
    setError('');
  };

  const handleReset = () => {
    setFormData({
      author: '',
      title: '',
      startDate: null,
      endDate: null
    });
    setCalendarData([]);
    setError('');
  };

  return (
    <Container component={Paper} maxWidth="md" sx={{ p: 4, mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Editor Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="author"
              label="Author"
              value={formData.author}
              onChange={handleChange('author')}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="title"
              label="Calendar Title"
              value={formData.title}
              onChange={handleChange('title')}
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              placeholderText="Start Date"
              selected={formData.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              dateFormat="MM/dd/yyyy"
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              placeholderText="End Date" 
              selected={formData.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              dateFormat="MM/dd/yyyy"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button type="button" variant="contained" onClick={handleReset} sx={{ ml: 2 }}>
                Reset
              </Button>
            </Box>
            {error && (
              <Typography color="error" variant="body2" align="center" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </Grid>
        </Grid>
      </form>
      {calendarData.length > 0 && 
      <CalendarContent author={formData.author} title={formData.title} startDate={formData.startDate} endDate={formData.endDate} calendarData={calendarData} />}
    </Container>
  );
};

export default EditorForm;
