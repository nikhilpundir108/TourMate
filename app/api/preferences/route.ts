import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const userFromClerk = await currentUser();
    if (!userFromClerk) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { destination, travelType, budget, duration } = await req.json();

    const userEmail = userFromClerk.emailAddresses.find(
      (e) => e.id === userFromClerk.primaryEmailAddressId
    )?.emailAddress;

    // Use findOneAndUpdate with upsert to create or update the user document
    const user = await User.findOneAndUpdate(
      { clerkId: userFromClerk.id },
      {
        // $set: Always update these fields
        $set: {
          preferences: { destination, travelType, budget, duration },
        },
        // $setOnInsert: Only set these fields when the document is first created
        $setOnInsert: {
          clerkId: userFromClerk.id,
          email: userEmail,
          username: userFromClerk.username,
          imageUrl: userFromClerk.imageUrl,
        },
      },
      { upsert: true, new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ /api/preferences error:", err);
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}