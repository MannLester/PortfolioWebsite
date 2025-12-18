import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET() {
	try {
		const goals = await convex.query(api.goals.getAllGoals);
		return NextResponse.json({ success: true, data: goals, count: goals.length });
	} catch (error) {
		console.error("Error fetching goals:", error);
		return NextResponse.json(
			{
				success: false,
				error: "Failed to fetch goals",
				message: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
