import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

async function getUserId() {
  if (process.env.TEST_BYPASS_AUTH) {
    return process.env.TEST_BYPASS_AUTH;
  }
  const { userId } = await auth();
  return userId;
}

export async function GET() {
  try {
    const clerkId = await getUserId();
    if (!clerkId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ clerkId }).lean() as { preferences?: { destination: string; travelType: string; budget: string; duration: string } } | null;
    if (!user || !user.preferences) {
      return NextResponse.json({ error: "User preferences not found. Please set them first." }, { status: 404 });
    }

    const { destination, travelType, budget, duration } = user.preferences;

    const prompt = `
      You are an expert travel planner located in Agra, India.
      The current date is September 17, 2025.
      A user wants a detailed travel plan with the following requirements:
      - Destination: ${destination}
      - Trip Duration: ${duration}
      - Travel Style: ${travelType}
      - Budget: ${budget}
      Generate a friendly, engaging, and detailed, day-by-day travel itinerary in Markdown format.
    `;
    
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error("Google API key is not configured in your .env.local file");
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    ];

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", safetySettings });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const itineraryText = response.text();

    return NextResponse.json({ success: true, itinerary: itineraryText });

  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ /api/itinerary GET error:", err);
    if (err.message && err.message.includes('SAFETY')) {
      return NextResponse.json({ error: "The response was blocked due to safety settings. Try a different query." }, { status: 400 });
    }
    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}