import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all', 'featured', or specific seminar type
    const seminarType = searchParams.get('seminarType'); // specific seminar type filter
    
    let seminars;
    
    if (seminarType) {
      seminars = await convex.query(api.seminars.getSeminarsByType, { type: seminarType });
    } else {
      switch (type) {
        case 'featured':
          seminars = await convex.query(api.seminars.getFeaturedSeminars);
          break;
        default:
          seminars = await convex.query(api.seminars.getAllSeminars);
      }
    }
    
    return NextResponse.json({
      success: true,
      data: seminars,
      count: seminars.length
    });
  } catch (error) {
    console.error('Error fetching seminars:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch seminars',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}