import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    console.log('[SCHEDULED-POSTS] Session:', JSON.stringify(session, null, 2));
    console.log('[SCHEDULED-POSTS] User ID:', session?.user ? (session.user as any).id : 'No user');

    if (!session || !session.user) {
      console.log('[SCHEDULED-POSTS] No session or user found, returning 401');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = (session.user as any).id || (session.user as any).sub;
    if (!userId) {
      console.log('[SCHEDULED-POSTS] No user ID found, returning 401');
      return NextResponse.json({ error: 'No user ID available' }, { status: 401 });
    }

    console.log('[SCHEDULED-POSTS] Proceeding with user ID:', userId);

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const query = new URLSearchParams();
    if (startDate) query.append('startDate', startDate);
    if (endDate) query.append('endDate', endDate);

    console.log('[SCHEDULED-POSTS] Making request to backend:', `${BACKEND_URL}/api/scheduled-posts?${query}`);
    const response = await fetch(`${BACKEND_URL}/api/scheduled-posts?${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userId}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error || 'Failed to fetch posts' }, { status: response.status });
    }

    const posts = await response.json();
    return NextResponse.json(posts);
    
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/scheduled-posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(session.user as any).id}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error || 'Failed to create post' }, { status: response.status });
    }

    const post = await response.json();
    return NextResponse.json(post);
    
  } catch (error) {
    console.error('Error creating scheduled post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}