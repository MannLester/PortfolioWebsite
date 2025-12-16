import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'active' or 'all'
    
    let about;
    
    switch (type) {
      case 'all':
        about = await convex.query(api.about.getAllAbout);
        break;
      default:
        about = await convex.query(api.about.getActiveAbout);
    }
    
    return NextResponse.json({
      success: true,
      data: about,
    });
  } catch (error) {
    console.error('Error fetching about information:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch about information',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}