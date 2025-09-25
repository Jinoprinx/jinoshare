import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://jinoshare-api-59028d83893a.herokuapp.com';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const userId = (session.user as any).id || (session.user as any).sub;
    if (!userId) {
      return NextResponse.json({ error: 'No user ID available' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const query = new URLSearchParams();
    if (startDate) query.append('startDate', startDate);
    if (endDate) query.append('endDate', endDate);

    const response = await fetch(`${BACKEND_URL}/api/scheduled-posts?${query}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('Authorization') || `Bearer ${userId}`
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
        'Authorization': request.headers.get('Authorization') || `Bearer ${(session.user as any).id}`
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