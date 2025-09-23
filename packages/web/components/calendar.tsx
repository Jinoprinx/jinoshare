import React, { useState, useEffect, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ISharedPost } from '@jino/common';
import { Editor } from './editor';
import { useSession } from 'next-auth/react';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: ISharedPost;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export function Calendar() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Partial<ISharedPost> | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!session) {
      console.log('No session in calendar, skipping fetch');
      return;
    }
    console.log('Calendar session:', session);
    setLoading(true);
    try {
      const start = moment().startOf('month').toISOString();
      const end = moment().endOf('month').toISOString();
      const query = new URLSearchParams({ startDate: start, endDate: end });
      console.log('Fetching with user ID:', (session.user as any).id);
      const response = await fetch(`/api/scheduled-posts?${query}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to fetch posts (${response.status})`);
      }
      
      const posts: ISharedPost[] = await response.json();
      
      const calendarEvents = posts
        .filter(p => p.scheduledAt)
        .map(post => ({
          id: post._id,
          title: post.content.substring(0, 40) + '...',
          start: new Date(post.scheduledAt!),
          end: moment(post.scheduledAt!).add(30, 'minutes').toDate(),
          resource: post,
        }));

      setEvents(calendarEvents);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleSelectSlot = useCallback((slotInfo: { start: Date }) => {
    setSelectedPost({ content: '', status: 'draft', scheduledAt: slotInfo.start.toISOString() });
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
    if (!selectedPost || !session) return;

    const method = selectedPost._id ? 'PUT' : 'POST';
    const url = selectedPost._id ? `/api/scheduled-posts/${selectedPost._id}` : `/api/scheduled-posts`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${(session.user as any).id}`
        },
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
      <div className="h-[700px] bg-black/20 p-4 rounded-lg border border-white/10">
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
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-black/50 border border-white/10 rounded-lg shadow-xl w-full max-w-2xl p-6">
            <h2 className="text-xl font-bold mb-4">{selectedPost._id ? 'Edit Post' : 'Schedule New Post'}</h2>
            <Editor value={selectedPost} onChange={(p) => setSelectedPost(p)} />
            <div className="flex justify-end gap-4 mt-6">
              <button onClick={closeModal} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">Cancel</button>
              <button onClick={handleSave} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">{selectedPost._id ? 'Update Schedule' : 'Schedule Post'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}