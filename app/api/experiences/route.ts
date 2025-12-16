import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all', 'current'
    
    let experiences;
    
    switch (type) {
      case 'current':
        experiences = await convex.query(api.experiences.getCurrentExperiences);
        break;
      default:
        experiences = await convex.query(api.experiences.getAllExperiences);
    }
    
    return NextResponse.json({
      success: true,
      data: experiences,
      count: experiences.length
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch experiences',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}