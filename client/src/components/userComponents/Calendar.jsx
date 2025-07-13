import React from 'react';

const Calendar = () => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Calendar</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Upcoming Events</h3>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h4 className="font-semibold mb-2">Team Meeting</h4>
          <p className="text-sm mb-3">Mon, 10:00 AM</p>
          <p className="text-xs text-gray-500">Conference Room</p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Add Event</h3>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full w-full">
          Create New Event
        </button>
      </div>
    </div>
  );
};

export default Calendar;