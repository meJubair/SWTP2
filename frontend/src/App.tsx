import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarContent from './components/CalendarContent';
import EditorForm from './components/EditorForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<EditorForm />} />
          <Route path="/calendar" element={<CalendarContent startDate={null} endDate={null} calendarData={[]}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
