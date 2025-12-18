import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET() {
	try {
		const skills = await convex.query(api.skills.getAllSkills);
		return NextResponse.json({ success: true, data: skills, count: skills.length });
	} catch (error) {
		console.error("Error fetching skills:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch skills",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}

