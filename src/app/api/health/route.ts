import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple health check
    return NextResponse.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      app: 'CodeSnippets'
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy', 
      error: 'Health check failed' 
    }, { status: 500 });
  }
}
