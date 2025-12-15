import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'all', 'featured', 'deployed'
    
    let projects;
    
    switch (type) {
      case 'featured':
        projects = await convex.query(api.projects.getFeaturedProjects);
        break;
      case 'deployed':
        projects = await convex.query(api.projects.getDeployedProjects);
        break;
      default:
        projects = await convex.query(api.projects.getAllProjects);
    }
    
    return NextResponse.json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}