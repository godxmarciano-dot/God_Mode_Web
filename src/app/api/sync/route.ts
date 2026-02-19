import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase Client
// It tries to use the Service Role Key (God Mode) first, 
// but falls back to the Anon Key (Public) if not set.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    console.log('Initiating Handshake with Supabase...');

    // The Handshake: Select everything from the Twins table
    const { data, error } = await supabase
      .from('twins')
      .select('*');

    if (error) {
      console.error('Supabase Connection Error:', error);
      return NextResponse.json(
        { 
          error: 'Handshake Failed', 
          message: 'Check your Supabase URL and Keys in Vercel.',
          details: error.message 
        },
        { status: 500 }
      );
    }

    // Success: Return the raw data
    return NextResponse.json(
      { 
        status: 'CONNECTED',
        message: 'God Mode handshake successful.',
        timestamp: new Date().toISOString(),
        twins_found: data.length,
        data: data 
      },
      { status: 200 }
    );

  } catch (err) {
    return NextResponse.json(
      { error: 'Internal Server Error', details: err },
      { status: 500 }
    );
  }
}