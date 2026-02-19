import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // Fetch the Architect Twin + all relations
    const { data, error } = await supabase
      .from('twins')
      .select(`
        *,
        ontology_identity (*),
        ontology_trajectory (*),
        swarm_agents (*),
        blockers (*)
      `)
      .eq('twin_id', 'architect_godly')
      .single();

    if (error) throw error;

    // Fetch metrics separately
    const { data: metricsData } = await supabase
      .from('metrics')
      .select('*')
      .eq('twin_id', data.id);

    // Transform metrics into a flat object
    const metricsObj = metricsData?.reduce((acc, item) => {
      acc[item.key] = item.value; 
      return acc;
    }, {} as Record<string, any>);

    // Return the data structure exactly how the UI expects it
    return NextResponse.json({
      id: data.twin_id,
      name: data.name,
      type: data.type,
      status: data.status,
      identity: data.ontology_identity,
      trajectory: data.ontology_trajectory || [],
      swarm: data.swarm_agents || [],
      blockers: data.blockers || [],
      metrics: metricsObj || {}
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Connection Failed' }, { status: 500 });
  }
}