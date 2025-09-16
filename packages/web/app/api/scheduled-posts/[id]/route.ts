import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://jinoshare-api-59028d83893a.herokuapp.com';

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/scheduled-posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(session.user as any).id}`
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error || 'Failed to update post' }, { status: response.status });
    }

    const post = await response.json();
    return NextResponse.json(post);
    
  } catch (error) {
    console.error('Error updating scheduled post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext,
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;

    const response = await fetch(`${BACKEND_URL}/api/scheduled-posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(session.user as any).id}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.error || 'Failed to delete post' }, { status: response.status });
    }

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting scheduled post:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
