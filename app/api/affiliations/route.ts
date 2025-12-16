import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all', 'featured'
    const status = searchParams.get('status'); // 'active', 'alumni', etc.
    const affiliationType = searchParams.get('affiliationType'); // specific affiliation type
    
    let affiliations;
    
    if (status) {
      affiliations = await convex.query(api.affiliations.getAffiliationsByStatus, { status });
    } else if (affiliationType) {
      affiliations = await convex.query(api.affiliations.getAffiliationsByType, { type: affiliationType });
    } else {
      switch (type) {
        case 'featured':
          affiliations = await convex.query(api.affiliations.getFeaturedAffiliations);
          break;
        default:
          affiliations = await convex.query(api.affiliations.getAllAffiliations);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: affiliations,
      count: affiliations.length
    });
  } catch (error) {
    console.error('Error fetching affiliations:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch affiliations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}