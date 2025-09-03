import React, { useState, useEffect, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ISharedPost } from '@jino/common';
import { Editor } from './editor';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: ISharedPost;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export function Calendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Partial<ISharedPost> | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const start = moment().startOf('month').toISOString();
      const end = moment().endOf('month').toISOString();
      const query = new URLSearchParams({ startDate: start, endDate: end });
      const response = await fetch(`${API_URL}/api/scheduled-posts?${query}`);
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const posts: ISharedPost[] = await response.json();
      
      const calendarEvents = posts
        .filter(p => p.scheduled_at)
        .map(post => ({
          id: post._id,
          title: post.content.substring(0, 40) + '...',
          start: new Date(post.scheduled_at!),
          end: moment(post.scheduled_at!).add(30, 'minutes').toDate(),
          resource: post,
        }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSelectSlot = useCallback((slotInfo: { start: Date }) => {
    setSelectedPost({ content: '', status: 'draft', scheduled_at: slotInfo.start.toISOString() });
    setModalOpen(true);
  }, []);

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setSelectedPost(event.resource);
    setModalOpen(true);
  }, []);

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost(null);
  };

  const handleSave = async () => {
    if (!selectedPost) return;

    const method = selectedPost._id ? 'PUT' : 'POST';
    const url = selectedPost._id ? `${API_URL}/api/scheduled-posts/${selectedPost._id}` : `${API_URL}/api/scheduled-posts`;

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPost),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Failed to save post');
      }

      closeModal();
      fetchEvents();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  return (
    <div className="relative">
      <div className="h-[700px] bg-white p-4 rounded-lg shadow">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
        />
      </div>

      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold mb-4">{selectedPost._id ? 'Edit Post' : 'Schedule New Post'}</h2>
            <Editor value={selectedPost} onChange={(p) => setSelectedPost(p)} />
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={closeModal} className="btn-secondary">Cancel</button>
              <button onClick={handleSave} className="btn-primary">{selectedPost._id ? 'Update Schedule' : 'Schedule Post'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}