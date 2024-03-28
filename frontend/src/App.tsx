import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarContent from './components/CalendarContent';
import PublishedContent from './components/PublishedContent';
import Breadcrumb from './components/Breadcrumb';
import EditorForm from './components/EditorForm';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Render Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Editor Form', path: '/' },
            { label: 'Calendar Content', path: '/calendar' },
            { label: 'Published Content', path: '/published' },
          ]}
        />
        {/* Route definitions */}
        <Routes>
          <Route path="/" element={<EditorForm />} />
          <Route path="/calendar" element={<CalendarContent startDate={null} endDate={null} calendarData={[]}/>} />
          <Route path="/published" element={<PublishedContent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
