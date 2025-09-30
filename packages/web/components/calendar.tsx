import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ISharedPost } from '@jino/common';

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: ISharedPost;
}

export function Calendar({ posts }: { posts: ISharedPost[] }) {
  const events: CalendarEvent[] = posts
    .filter(p => p.status === 'scheduled' && p.scheduledAt)
    .map(post => ({
      id: post._id,
      title: post.content.substring(0, 40) + '...',
      start: new Date(post.scheduledAt!),
      end: moment(post.scheduledAt!).add(30, 'minutes').toDate(),
      resource: post,
    }));

  return (
    <div className="relative">
      <div className="h-[700px] bg-black/20 p-4 rounded-lg border border-white/10">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
}
