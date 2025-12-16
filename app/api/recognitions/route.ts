import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all', 'featured', 'categories'
    const category = searchParams.get('category');
    const year = searchParams.get('year');
    
    let result;
    
    if (type === 'categories') {
      result = await convex.query(api.recognitions.getRecognitionCategories);
      return NextResponse.json({
        success: true,
        data: result
      });
    } else if (type === 'featured') {
      result = await convex.query(api.recognitions.getFeaturedRecognitions);
    } else if (category) {
      result = await convex.query(api.recognitions.getRecognitionsByCategory, { category });
    } else if (year) {
      result = await convex.query(api.recognitions.getRecognitionsByYear, { year: parseInt(year) });
    } else {
      result = await convex.query(api.recognitions.getAllRecognitions);
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      count: result.length
    });
  } catch (error) {
    console.error('Error fetching recognitions:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch recognitions',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}