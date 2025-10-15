import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './events.css';
import banner from './events.png'

function EventWebApp() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [petsAllowedFilter, setPetsAllowedFilter] = useState('all'); // "all" | "yes" | "no"
  const [currentPage, setCurrentPage] = useState(1);

  const eventsPerPage = 5; // how many to show per page

  // Fetch events once
  useEffect(() => {
    axios
      .get('https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events')
      .then(res => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Filter + Search Logic
  useEffect(() => {
    let updated = [...events];

    // Search by title or description
    if (searchTerm.trim() !== '') {
      updated = updated.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by pets allowed
    if (petsAllowedFilter === 'yes') {
      updated = updated.filter(event => event.petsAllowed === true);
    } else if (petsAllowedFilter === 'no') {
      updated = updated.filter(event => event.petsAllowed === false);
    }

    setFilteredEvents(updated);
    setCurrentPage(1); // reset to first page whenever filters change
  }, [searchTerm, petsAllowedFilter, events]);

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="event-container">
      <img src={banner} alt='eventsbanner' className='eventsbanner'/>
      <h2>Current Events</h2>

      {/* 🔍 Search Input */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* 🐾 Pets Allowed Filter */}
        <select value={petsAllowedFilter} onChange={e => setPetsAllowedFilter(e.target.value)}>
          <option value="all">All Events</option>
          <option value="yes">Pets Allowed</option>
          <option value="no">No Pets</option>
        </select>
      </div>

      {/* 🗂 Event List */}
      <div className="events">
        {currentEvents.length > 0 ? (
          currentEvents.map(event => (
            <div key={event.id} className="mainEvents">
              <div><strong>Category:</strong> {event.category}</div>
              <div><strong>Title:</strong> {event.title}</div>
              <div><strong>Description:</strong> {event.description}</div>
              <div><strong>Location:</strong> {event.location}</div>
              <div><strong>Date:</strong> {event.date}</div>
              <div><strong>Time:</strong> {event.time}</div>
              <div><strong>Pets Allowed:</strong> {event.petsAllowed ? 'Yes' : 'No'}</div>
              <div><strong>Organizer:</strong> {event.organizer}</div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>

      {/* Pagination */}
      {filteredEvents.length > eventsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default EventWebApp;
